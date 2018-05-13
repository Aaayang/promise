let Promise = require('./p_03');

let p = new Promise((resolve, reject) => {
    resolve(111);
});


p.then(data => {
    return data;
}, reason => {
    
}).then(data => {
    return data;
}, reason => {
    
}).then(data => {
    console.log(data);
}, reason => {
    
});