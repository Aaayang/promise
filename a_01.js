let { promisify } = require('bluebird');
let fs = require('fs');
let read = promisify(fs.readFile);

// * 配 yield
// async 配 await

/* async function r() {
    // async返回的结果是一个promise
}
console.log(r()); */

// await后面只能跟promise
/* async function r() {
    let b = await read('./a.txt', 'utf-8');
    let c = await read(b, 'utf-8');
    return c;
}

r().then(data => {
    console.log(data);
}); */

// callback -> promise -> generator -> async

async function r() {
    let b = await Promise.all([// Promise.all返回的也是Promise
        read('./a.txt', 'utf-8'),
        read('./b.txt', 'utf-8')
    ])
    return b;
}

r().then(data => {
    console.log(data);
});