const Promise = require('./p_08');
const fs = require('fs');

/* function read() {
    return new Promise((resolve, reject) => {
        fs.readFile('./a.txt', 'utf8', (err, data) => {
            if(err) reject(err);
            resolve(data);
        });
    });
} */


// 上面套了一层不爽，好处是不同嵌套了
function read() {
    let defer = Promise.defer();
    fs.readFile('./a.txt', 'utf8', (err, data) => {
        if (err) defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

read().then(data => {
    console.log(data);
}, err => {
    console.log(err);
});