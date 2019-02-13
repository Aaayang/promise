let Promise = require('./p_02');

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');    
    }, 1000);
});

// 直接走 then 了，status 既不是 resolved，也不是 rejected 所以不会执行
// 需要加一个 status 为 pending 状态的处理
p.then(data => {
    console.log(data);
}, err => {
    console.log(err);
});

p.then(data => {
    console.log(data);
}, err => {
    console.log(err);
});