function read(arr) {
    let index = 0;
    return {
        next() {
            return {
                value: arr[index],
                done: index ++ >= arr.length
            };
        }
    }
}

let it = read(['vue', 'react', 'node']);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log( it.next() );