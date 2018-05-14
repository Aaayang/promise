let Promise = require('./p_06');

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('error');    
    }, 1000);
});

// 失败中返回的若是正常值(没有报错)仍会走下一个成功，即失败了也可以再成功

/* p.then(data => {
    return new Promise((resolve, reject) => {
        // resolve(1);
        resolve(new Promise((resolve ,reject) => {
            resolve(111);
        }));
    });
}, reason => {

}).then(data => {
    return data;
}).then(data => {
    console.log(data);
}); */

/* p.then(data => {
    return new Promise((resolve, reject) => {
        // resolve(1);
        resolve(new Promise((resolve, reject) => {
            resolve(111);
        }));
    });
}, reason => {

}).then(data => {
    return data;
}).then(data => {
    console.log(data);
}); */

// then方法可以不传参，值的穿透
/* p.then().then().then(null).then(null, err => {
    console.log(err);
}); */

// 默认值
/* p.then(y => y).then(y => y).then(y => y).then(data => {
    console.log(data);
}, err => {
    console.log(err);
}); */

p.then().then().then(null).then(data => {
    console.log(data);
}, err => {
    console.log(err);
});