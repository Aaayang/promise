class Test {
    constructor(name) {
        this.name = name;
    }
    showName() {
        let h = new Test('hello world');
        
        
        console.log(this.name);
    }
}

let t = new Test('aaayang');

t.showName();
