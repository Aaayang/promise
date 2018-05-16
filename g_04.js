let {promisify} = require('bluebird');
let fs = require('fs');

let read = promisify(fs.readFile);


function *gen() {
    let b = yield read('./a.txt');
    let c = yield read(b);

    return c;
}


let it = gen();

it.next().value.then(data => {
    it.next(data).value.then(data => {
        console.log(it.next(data).value.toString());
    });
});