class Promise {
    constructor(executor) {
        // 默认状态是等待
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;

        // new Promise 中没有异步代码时一上来就会执行这里
        // 这里用箭头函数是为了里面的 this 不乱套
        let resolve = (data) => {
            if (this.status === 'pending') { // 可以防止 resolve() 和 reject() 同时调用值被改变的问题
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
            // 这里一上来就执行，resolve 函数本身并没有执行，resolve 是客户去主动执行的
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
    // 然后再执行这里的then
    then(onFulFilled, onRejected) {
        if (this.status === 'resolved') {
            // onFulFilled是then中的第一个函数参数
            // 执行这个函数并把值传递过去
            onFulFilled(this.value);
        }

        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
    }
}

module.exports = Promise;