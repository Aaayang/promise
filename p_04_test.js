let Promise = require('./p_04');


// 测试链式调用返回 promise 的情况

let p = new Promise((resolve, reject) => {
    resolve('成功');    
});

let p2 = new Promise((resolve, reject) => {
    resolve('成功2');
});

// 直接走 then 了，status 既不是 resolved，也不是 rejected 所以不会执行
// 需要加一个 status 为 pending 状态的处理
p.then(data => {
    console.log(data);
    return p2;
}, err => {
    console.log(err);
    // 可以由失败变成成功
    // 所以返回的应该是一个新的 promise，因为一个 promise 一旦失败了就不能再成功了
}).then(data => {
    console.log(data);
});
