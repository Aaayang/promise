

// * 和 yield 一起用的
/* function *gen() {
    // yield 产出
    return 1000;
}

// 执行后返回的是迭代器，迭代器有next方法
let a = gen();
console.log(a.next()); // { value: 1000, done: true }
console.log(a.next()); // { value: undefined, done: true } */



/* function* gen() {
    // yield 产出
    yield 1000;
}

// 执行后返回的是迭代器，迭代器有next方法
let a = gen();
console.log(a.next()); // { value: 1000, done: false }
console.log(a.next()); // { value: undefined, done: true } */


// 可以暂停，调用next才会继续走
/* function* gen() {
    // yield 产出
    yield 1000;
    yield 2000;
}

// 执行后返回的是迭代器，迭代器有next方法
let a = gen();
console.log(a.next()); // { value: 1000, done: false }
console.log(a.next()); // { value: undefined, done: true } */


/* function* gen() {
    // yield 产出
    let a = yield '买菜';// 第二次next传的参数赋值给了a
    let b = yield a

    return b;
}

// 执行后返回的是迭代器，迭代器有next方法
let a = gen();
console.log(a.next()); // { value: 1000, done: false }
console.log(a.next('买好的菜')); // { value: undefined, done: true }
console.log(a.next('做菜')); // { value: undefined, done: true } */


function* gen(v) {
    // yield 产出
    let a = yield v;// 第二次next传的参数赋值给了a
    let b = yield a

    return b;
}

// 执行后返回的是迭代器，迭代器有next方法
let a = gen('买菜');
console.log(a.next()); // 第一次不能穿参数，传了也白传
console.log(a.next('买好的菜')); // { value: undefined, done: true }
console.log(a.next('做菜')); // { value: undefined, done: true }



