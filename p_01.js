class Promise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;

        // new Promise中没有异步代码时一上来就会执行这里
        let resolve = (data) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = data;
            }
        }

        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
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
            // onFulFilled是then中的第一个函数参数
            onFulFilled(this.value);
        }

        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
    }
}

module.exports = Promise;