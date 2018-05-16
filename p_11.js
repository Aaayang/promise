let bluebird = require('bluebird');

// promise化，帮我们把一个异步方法转化成Promise方法

let fs = require('fs');

// let read = bluebird.promisify(fs.readFile);


function promisify(fn) {
    // 返回的是一个函数，供read执行
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                // error first
                if(err) reject(err);
                resolve(data);
            });
        });
    }
}


let read = promisify(fs.readFile);

read('./a.txt', 'utf-8').then(data => {
    console.log(data);
});



