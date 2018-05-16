/* function move(ele, position, cb) {
    let left = 0;
    let timer = setInterval(() => {
        left += 5;
        if(left >= position) {
            clearInterval(timer);
            ele.style.transform = `translate(${position}px)`;

            cb();
        } else {
            ele.style.transform = `translate(${left}px)`;
        }
    }, 15);
}

move(ball1, 500, function() {
    move(ball2, 500, function () {
        move(ball3, 500, function () {
            console.log('动完啦');
        });
    }); 
}); */

/* function move(ele, position) {
    return new Promise((resolve, reject) => {
        let left = 0;
        let timer = setInterval(() => {
            left += 5;
            if (left >= position) {
                clearInterval(timer);
                ele.style.transform = `translate(${position}px)`;

                resolve();
            } else {
                ele.style.transform = `translate(${left}px)`;
            }
        }, 15);
    });
    
}

move(ball1, 500).then(data => {
    return move(ball2, 200);
}).then(data => {
    return move(ball3, 300);
}).then(data=> {
    console.log('ok');
}); */


/* function move(ele, position) {
    return new Promise((resolve, reject) => {
        let left = 0;
        let timer = setInterval(() => {
            left += 5;
            if (left >= position) {
                clearInterval(timer);
                ele.style.transform = `translate(${position}px)`;

                resolve();
            } else {
                ele.style.transform = `translate(${left}px)`;
            }
        }, 15);
    });

}

function *m() {
    yield move(ball1, 200);
    yield move(ball2, 300);
    yield move(ball3, 400);
}

function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {done, value} = it.next();
            if(done) {
                return resolve(value);
            }
            value.then(data => {
                next(data);
            }, reject);
        }
        next();
    })
}

co(m()).then(data => {
    console.log('ok');
}); */


function move(ele, position) {
    return new Promise((resolve, reject) => {
        let left = 0;
        let timer = setInterval(() => {
            left += 5;
            if (left >= position) {
                clearInterval(timer);
                ele.style.transform = `translate(${position}px)`;

                resolve();
            } else {
                ele.style.transform = `translate(${left}px)`;
            }
        }, 15);
    });

}

async function m() {
    await move(ball1, 100);
    await move(ball2, 200);
    await move(ball3, 300);
}

m().then(data => {
    console.log('ok');
});