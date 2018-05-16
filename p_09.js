// 解析promise2和x之间的关系
function resolvePromise(promise2, x, resolve, reject) {
    // 怎么才能等于自己？
    // 我们的promise和别人的promise可以进行交互

    // 自己等自己既不会成功也不会失败
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 返回是promise是有可能又成功又失败的，例如resolve(1) reject(2)
        // 防止既调成功又调失败
        let called;
        /* {
            then: {}
        } */

        /* Object.defineProperty(x, 'then', {
            get() {
                throw new Error()
            }
        }) */
        try {
            // 防止通过Object.defineProperty取then时报错
            let then = x.then;

            if (typeof then === 'function') {
                // 可以认为是promise了
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    // resolve的结果依旧可能是个promise
                    // resolve(y);
                    // 如果y是promise就继续递归解析promise
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                // then是一个普通对象
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // 直接走成功
        resolve(x);
    }
}


class Promise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulFilledCallbacks = [];
        this.onRejectedCallbacks = [];

        // new Promise中没有异步代码时一上来就会执行这里
        let resolve = (data) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = data;

                this.onFulFilledCallbacks.forEach((item) => item());
            }
        }

        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
            }

            this.onRejectedCallbacks.forEach((item) => item());
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    // 然后再执行这里的then
    then(onFulFilled, onRejected) {

        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : y => y;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

        // 上面onRejected throw err时，异步代码不会被捕获#1

        let promise2;

        if (this.status === 'resolved') {
            // 调用then后会返回一个新的promise
            promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    // 里面的代码可能是异步的#1
                    try {
                        // x指的是then中函数的返回值
                        let x = onFulFilled(this.value);
                        // 看其执行完是普通纸还是promise，如果是promise取他的结果作为
                        // promise2成功的，如果返回一个普通值，直接作为promise2的成功的结果
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }    
                });
            });
            // then返回一个新的promise
        }

        if (this.status === 'rejected') {
            promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                        // x指的是then中函数的返回值
                    } catch (e) {
                        reject(e);
                    }    
                });
            });
            // then返回一个新的promise
        }

        if (this.status === 'pending') {
            promise2 = new Promise((resolve, reject) => {
                this.onFulFilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // 注意这里要统一用箭头函数，防止this出错
                            let x = onFulFilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }    
                    });
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }    
                    });
                });
            });
            // then返回一个新的promise
        }
        return promise2;
    }
    // catch接收的参数只有错误
    catch(onRejected) {
        // then的结果也是Promise
        return this.then(null, onRejected);
    }
}

Promise.deferred = Promise.defer = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise;