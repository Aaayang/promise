function resolvePromise(promise2, x, resolve, reject) {
    // 怎么才能等于自己？
    if(promise2 === x) {
        return reject(new TypeError('循环引用'));
    }

    if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
        
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
            
            // then的时候才会走这里

            // mark
            promise2 = new Promise((resolve, reject) => {
                // x指的是then中函数的返回值
                let x = onFulFilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
            });
            // then返回一个新的promise
            return promise2;
        }

        if (this.status === 'rejected') {
            onRejected(this.reason);
        }

        if(this.status === 'pending') {
            this.onFulFilledCallbacks.push(() => {
                // 注意这里要统一用箭头函数，防止this出错
                onFulFilled(this.value);
            });

            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            });
        }
    }
}

module.exports = Promise;