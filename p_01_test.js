let Promise = require('./p_01');

let p = new Promise((resolve, reject) => {
    resolve('成功');
});

p.then(data => {
    console.log(data);
}, err => {
    console.log(err);
});