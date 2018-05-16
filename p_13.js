let Q = require('q');
let fs = require('fs');

function read(url) {
    let defer = Q.defer();
    fs.readFile(url, 'utf8', (err, data) => {
        if (err) defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

/* read('./a.txt', 'utf-8').then(data => {
    console.log(data);
}); */

/* Q.all([
    read('./a.txt', 'utf-8'),
    read('./b.txt', 'utf-8'),
]).then(data => {
    console.log(data);
}); */

/* Q.all([
    read('./a.txt', 'utf-8'),
    read('./b.txt', 'utf-8'),
]).spread((data, v) => {
    console.log(data, v);
}); */

// 可以自己结构
/* Q.all([
    read('./a.txt', 'utf-8'),
    read('./b.txt', 'utf-8'),
]).then(([data, v]) => {
    console.log(data, v);
}); */

Q.fcall(function() {
    return '123';
}).then(data => {
    console.log(data);
});