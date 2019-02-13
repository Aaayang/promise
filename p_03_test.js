let Promise = require('./p_03');


// 测试链式调用返回普通值的情况

let p = new Promise((resolve, reject) => {
    resolve('成功');    
});


// promise2 === x
var xx = p.then(data => {
    // 自己等待自己，永远也不会成功也不会成败
    // 注意上面用var定义xx这里才可以找到
    return xx;
}).then(data => {
    console.log(data);
}, err => {
    console.log(err);
});



// 直接走 then 了，status 既不是 resolved，也不是 rejected 所以不会执行
// 需要加一个 status 为 pending 状态的处理
// p.then(data => {
//     console.log(data);
//     return 123;
// }, err => {
//     console.log(err);
//     // 可以由失败变成成功
//     // 所以返回的应该是一个新的 promise，因为一个 promise 一旦失败了就不能再成功了
// }).then(data => {
//     console.log(data);
// });


