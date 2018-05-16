// generator是生成器，生成的是迭代器
// 类数组
/* let obj = {
    0: 1,
    1: 2,
    length: 2
};

// obj不可被迭代，没有迭代的标识
let arr = [...obj]; */

let obj = {
    0: 1,
    1: 2,
    length: 2,
    [Symbol.iterator]: function() {// 迭代器函数
        let index = 0;
        let that = this;
        return {// 会返回一个对象
            next() {// 必须返回一个next方法
                return {
                    value: that[index],
                    done: index ++ === that.length
                };
            }
        };
    }
};

// obj不可被迭代，没有迭代的标识
// ... 会自动调用next
let arr = [...obj];
console.log(arr);