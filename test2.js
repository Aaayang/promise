let P = require('./p_10');

// let p = new Promise((resolve, reject) => {
//     reject('err');
// });
// p.then().then().catch(r=>{
//     // catch是then的第二个方法，默认return undefined
//     console.log(r);
// }).then(data=>{
//     console.log(data);
// });

// Promise.reject('hello').catch(err => {
//     console.log(err);
// });

let fs = require('fs');

function read(url) {
    let defer = P.defer();
    fs.readFile(url, 'utf8', (err, data) => {
        if(err) defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

// 全成功则成功，有失败则失败
/* P.all([
    read('./a.txt'),
    read('./b.txt')
]).then(arr => {
    console.log(arr);
}, err=>{
    console.log(err);
}); */

// 谁快用谁的，无论错误还是失败
/* P.race([
    read('./b.txt'),
    read('./a.txt')
]).then(arr => {
    console.log(arr);
}, err => {
    console.log(err);
}); */
