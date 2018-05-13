function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        // 不能自己等待自己完成
        return reject(new TypeError('循环引用'))
    }

    // null
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            // 防止取then时出现异常，Object.defineProperty
            let then = x.then;

            if (typeof then === 'function') {
                // 认为是promise，执行
                then.call(x, y => {
                    // 如果y是promise就继续递归
                    resolvePromise(promise2, resolve, reject);
                }, err => {
                    reject(err);
                });
            } else {
                // 不是函数就是普通值，就直接成功
                resolve(x);
            }
        } catch (e) {
            reject(e);
        }
    } else {
        // return 123
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        // 默认状态
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;

        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (data) => {
            if (this.status === 'pending') {
                this.value = data;
                this.status = 'resolved';

                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = (reason) => {
            if (this.status === 'pending') {
                this.reason = reason;
                this.status = 'rejected';

                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulFilled, onRejected) {
        let promise2;

        if (this.status === 'resolved') {
            // new Promise，这里的Promise是上面的 class Promise {...}吗，
            // 这时候不是还没定义完吗，怎么就可以new了

            promise2 = new Promise((resolve, reject) => {

                let x = onFulFilled(this.value);
                // 老师，我的理解是代码先走右边的2，再走左边的1，
                // 此时走右边的时候promise2还没赋值呢，下面就开始传参了，
                // 此时不是undefined么？没太理解

                // 回调...
                resolvePromise(promise2, x, resolve, reject);
            });
            return promise2;
        }
        if (this.status === 'rejected') {
            promise2 = new Promise((resolve, reject) => {
                let x = onRejected(this.reason);
                // 这时候的promise2参数怎么已经有了呢？是undefined吧
                resolvePromise(promise2, x, resolve, reject);
            });
            return promise2;
        }

        if (this.status === 'pending') {
            promise2 = new Promise((resolve, reject) => {
                this.onResolvedCallbacks.push(() => {
                    // 这时候这里的this.value不还是undifined么??
                    // 还没执行呢
                    let x = onFulFilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                });

                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                });
            });
            return promise2;
        }
    }
}

module.exports = Promise;