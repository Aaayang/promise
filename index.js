let Promise = require('./p_07');

let p = new Promise((resolve, reject) => {
    resolve(1);
});

// promise中的then方法应该是异步调用的
p.then().then().then(null).then(data => {
    console.log(data);
}, err => {
    
});

console.log(2);