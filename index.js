let Promise = require('./p_02');

let p = new Promise(function(resolve, reject) {
    setTimeout(() => {
        reject(233);
    }, 1000);
});

p.then(function(data) {
    console.log(data);
}, function(reason) {
    console.log(reason, 233);
});