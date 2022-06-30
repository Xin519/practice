function* fibs(a, b){
	while(true){
		yield a
		[a, b] = [b, a + b]
	}
}

let [first, second, third, fourth, fifth, sixth] = fibs(0, 1)

// fibs 是一个 Generator 函数 原生具有 Iterator 接口 解构赋值会依次从这个接口获取值


let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
[...myIterable] // [1, 2, 3]
