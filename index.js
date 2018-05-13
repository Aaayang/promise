let Promise = require('./p_01');

let p = new Promise(function(resolve, reject) {
    reject(233);
});

p.then(function(data) {
    console.log(data);
}, function(reason) {
    console.log(reason);
});