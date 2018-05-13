let Promise = require('./p_01');

let p = new Promise(function(resolve, reject) {
    throw new Error('err...');
});

p.then(function(data) {
    console.log(data);
}, function(reason) {
    console.log(reason, 233);
});