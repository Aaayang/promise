let Promise = require('./p_09');

let p = new Promise((resolve, reject) => {
    reject('err');
});

p.then().then().catch(r=>{
    // catch是then的第二个方法
    console.log(r);
}).then(data=>{
    console.log(data);
});