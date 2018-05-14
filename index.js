let Promise = require('./p_04');

let p = new Promise((resolve, reject) => {
    resolve();
});

// 失败中返回的若是正常值(没有报错)仍会走下一个成功，即失败了也可以再成功

p.then(data => {
    return new Promise((resolve, reject) => {
        // resolve(1);
        resolve(new Promise((resolve ,reject) => {
            resolve(111);
        }));
    });
}, reason => {

}).then(data => {
    return data;
}).then(data => {
    console.log(data);
});