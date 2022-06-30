// 概念
// Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同
// 语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
// Generator 函数除了状态机，还是一个遍历器对象生成函数。
// 可暂停函数(惰性求值), yield可暂停，next方法可启动。每次返回的是yield后的表达式结果

// 特点
// function关键字与函数名之间有一个星号；
// 函数体内部使用yield表达式，定义不同的内部状态

function* generatorExample() {
	console.log("开始执行")
	yield 'hello';
	yield 'generator';
}
// generatorExample() 
// 这种调用方法Generator 函数并不会执行
let MG = generatorExample() // 返回指针对象
MG.next() //开始执行  {value: "hello", done: false}

// Generator 函数是分段执行的，调用next方法函数内部逻辑开始执行，遇到yield表达式停止，
// 返回{value: yield后的表达式结果/undefined, done: false/true},
// 再次调用next方法会从上一次停止时的yield处开始，直到最后。

function* helloWorldGenerator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}
var hw = helloWorldGenerator();
hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }

// 第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。

// 第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还没有结束。

// 第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。

// 第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

// next传递参数
// yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

function* generatorExample() {
	console.log('开始执行')
	let result = yield 'hello'
	console.log(result)
	yield 'generator'
}
let MG = generatorExample()
MG.next()
MG.next()
// 开始执行
// undefined
// {value: "generator", done: false}

// 没有传值时result默认是undefined，接下来我们向第二个next传递一个参数，看下输出结果是啥？

function* generatorExample() {
	console.log('开始执行')
	let result = yield 'hello'
	console.log(result)
	yield 'generator'
}
let MG = generatorExample()
MG.next()
MG.next(11)
// 开始执行
// 11
// {value: "generator", done: false}

// 与 Iterator 接口的关系
// 我们上文中提到对象没有iterator接口，用for...of遍历时便会报错。

let obj = {
	username: 'kobe',
	age: 39
}
for (let i of obj) {
	console.log(i) //  Uncaught TypeError: obj is not iterable
}

// 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

let obj = {
	username: 'kobe',
	age: 39
}
obj[Symbol.iterator] = function* myTest() {
	yield 1;
	yield 2;
	yield 3;
};
for (let i of obj) {
	console.log(i) // 1 2 3
}

// 上面代码中，Generator函数赋值给Symbol.iterator属性，从而使得obj对象具有了 Iterator 接口，可以被for of遍历了。

// Generator的异步的应用

// 业务需求：
// 发送ajax请求获取新闻内容
// 新闻内容获取成功后再次发送请求，获取对应的新闻评论内容
// 新闻内容获取失败则不需要再次发送请求。

// 如何实现(前端核心代码如下)：

function* sendXml() {
	// url为next传参进来的数据
	let url = yield getNews('http://localhost:3000/news?newsId=2'); //获取新闻内容
	yield getNews(url); //获取对应的新闻评论内容，只有先获取新闻的数据拼凑成url,才能向后台请求
}

function getNews(url) {
	$.get(url, function(data) {
		console.log(data);
		let commentsUrl = data.commentsUrl;
		let url = 'http://localhost:3000' + commentsUrl;
		// 当获取新闻内容成功，发送请求获取对应的评论内容
		// 调用next传参会作为上次暂停是yield的返回值
		sx.next(url);
	})
}
let sx = sendXml(); // 发送请求获取新闻内容
sx.next();
