// 解析promise2和x之间的关系
function resolvePromise(promise2, x, resolve, reject) {
    // 怎么才能等于自己？
    // 我们的promise和别人的promise可以进行交互

    // 自己等自己既不会成功也不会失败
    if(promise2 === x) {
        return reject(new TypeError('循环引用'));
    }
    
    if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
        
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

            if(typeof then === 'function') {
                // 可以认为是promise了
                then.call(x, y => {
                    // resolve的结果依旧可能是个promise
                    // resolve(y);
                    // 如果y是promise就继续递归解析promise
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    reject(err);
                });
            } else {
                // then是一个普通对象
                resolve(x);
            }
        } catch(e) {
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
        } catch(e) {
            reject(e);
        }
    }
    // 然后再执行这里的then
    then(onFulFilled, onRejected) {
        let promise2;

        if (this.status === 'resolved') {
            // 调用then后会返回一个新的promise
            promise2 = new Promise((resolve, reject) => {
                // x指的是then中函数的返回值
                let x = onFulFilled(this.value);
                // 看其执行完是普通纸还是promise，如果是promise取他的结果作为
                // promise2成功的，如果返回一个普通值，直接作为promise2的成功的结果
                resolvePromise(promise2, x, resolve, reject);
            });
            // then返回一个新的promise
        }

        if (this.status === 'rejected') {
            promise2 = new Promise((resolve, reject) => {
                // x指的是then中函数的返回值
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            });
            // then返回一个新的promise
        }

        if(this.status === 'pending') {
            promise2 = new Promise((resolve, reject) => {
                this.onFulFilledCallbacks.push(() => {
                    // 注意这里要统一用箭头函数，防止this出错
                    let x = onFulFilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                });

                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                });
            });
            // then返回一个新的promise
        }
        return promise2;
    }
}

module.exports = Promise;