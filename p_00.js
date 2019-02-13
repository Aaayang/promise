// 使用
let p = new Promise(function(resolve, reject) {
    reject('失败');
});

p.then(null).catch(err => {
    console.log(err)
    // return undefined;
}).then(res => {
    console.log(res);
    // return Promise.reject('走失败');
    throw new Error('走失败');
}).then(null, err => {
    console.log(err);
});