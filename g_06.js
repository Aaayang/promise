// generator相当于把一个函数拆分成若干个部分执行
// 执行第一次时，将指针指向下一段代码，知道结束为止

function *a() {
    yield '1';
    yield '2';
}

/* function* b() {
    yield '3';
    yield a();// 返回的是a的迭代器，并不是generater
    yield '4';
} */

// 如果在generator中调用另一个generator要加*
function* b() {
    yield '3';
    yield *a();// 返回的是a的迭代器，并不是generater
    yield '4';
}

let it = b();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

