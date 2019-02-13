class Promise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        // 搞个数组为了可以写多个 p.then p.then 都执行
        this.onFulFilledCallbacks = [];
        this.onRejectedCallbacks = [];

        // new Promise中没有异步代码时一上来就会执行这里
        let resolve = (data) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = data;

                // console.log(this.onFulFilledCallbacks.toString());
                /* function () {
                    onFulFilled(this.value);
                } */
                // 客户调用 resolve 的时候执行
                this.onFulFilledCallbacks.forEach((item) => item());
            }
        }

        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach((item) => item());
            }
        }
        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
    // 然后再执行这里的then
    then(onFulFilled, onRejected) {
        if (this.status === 'resolved') {
            // onFulFilled是then中的第一个函数参数，这里的参数对应then中第一个函数的形参
            onFulFilled(this.value);
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