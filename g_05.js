let {promisify} = require('bluebird');
let fs = require('fs');

let read = promisify(fs.readFile);


function *gen() {
    let b = yield read('./a.txt');
    let c = yield read(b);

    return c;
}


let it = gen();

/* it.next().value.then(data => {
    it.next(data).value.then(data => {
        console.log(it.next(data).value.toString());
    });
}); */

// let co = require('co');

function co(it) {
    // 异步递归怎么实现
    return new Promise((resolve, reject) => {
        // next是为了实现异步迭代
        function next(data) {
            let {value, done} = it.next(data);

            if(!done) {
                // 继续
                value.then(data => {
                    // data是b...
                    // 反正第一次next传啥都没意义
                    // 当地一个promise执行完再执行下一个
                    next(data);
                }, reject); // 有一个失败了就失败
            } else {
                // 迭代成功后将结果返回
                resolve(value);
            }
        }
        next();
    });
}

co(gen()).then(data => {
    console.log(data.toString());
});