let bluebird = require('bluebird');

// promise化，帮我们把一个异步方法转化成Promise方法

let fs = require('fs');

function promisify(fn) {
    // 返回的是一个函数，供read执行
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                // error first
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}

function promisifyAll(obj) {
    for(let key in obj) {
        if(typeof obj[key] === 'function') {
            obj[key + 'Async'] = promisify(obj[key]);
        }
    }
    return obj;
}


// let r = bluebird.promisifyAll(fs);
let r = promisifyAll(fs);

r.readFileAsync('./a.txt').then(data => {
    console.log(data.toString());
});
/* fs.readFileAsync('./a.txt').then(data => {
    console.log(data.toString());
}); */

console.log(1);

// 同步读取
/* let a = fs.readFileSync('./a.txt', 'utf-8');
console.log(1); */