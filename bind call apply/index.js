// Function.prototype.myBind = function (context) {
//     // 判断调用对象是否为函数
//     if (typeof this !== "function") {
//         throw new TypeError("Error");
//     }

//     // 获取参数
//     const args = [...arguments].slice(1),
//           fn = this;

//     return function Fn() {

//         // 根据调用方式，传入不同绑定值
//         return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments)); 
//     }
// }

// apply、call、bind三者的区别在于：

// 三者都可以改变函数的this对象指向
// 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window
// 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入
// bind是返回绑定this之后的函数，apply、call 则是立即执行

// call
Function.prototype.myCall = function(context, ...args) {
	const ctx = context || window
	ctx.fn = this
	const result = eval('ctx.fn(...args)')
	delete ctx.fn
	return result
}

// apply
Function.prototype.myApply = function(context, args) {
	const ctx = context || window
	ctx.fn = this
	const res = eval('context.fn(...args)')
	delete ctx.fn
	return res
}

// bind
Function.prototype.myBind = function(context, ...args) {
	if (typeof this !== 'function') throw new Error('this must be a function')
	let self = this
	let res = function() {
		// 这里如果执行可能还会有参数，需要和之前的参数合并 Array.prototype.slice.call(arguments)
		return self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(
			arguments)))
	}
	// 如果原型上有方法
	if (this.prototype) {
		res.prototype = Object.create(this.prototype)
	}
	return res
}
