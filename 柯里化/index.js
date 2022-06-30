// 实现柯里化其实就是把多个参数长度很分开来调用的意思，好处在于可以观测你参数调用的一个中间的过程，或者中间的变量。面试中常考的add(1, 2, 3)和add(1)(2)(3)就是这个问题

function curry(fn) {
	const finalLen = fn.length // 获取参数 length
	let args = [].slice.call(this, 1)
	return function currying() {
		args = args.concat(Array.from(arguments)) // 合并参数数组
		const len = args.length
		return len >= fn.length ? fn.apply(this, args) : currying // 参数收集完毕 执行fn方法
	}
}


// 支持多参数传递
function progressCurrying(fn, args) {

    var _this = this
    var len = fn.length;
    var args = args || [];

    return function() {
        var _args = [...Array.prototype.slice.call(arguments), ...args];

        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (_args.length < len) {
            return progressCurrying.call(_this, fn, _args);
        }

        // 参数收集完毕，则执行fn
        return fn.apply(this, _args);
    }
}


const curry = (fn, arr = []) => (...args) => (
  arg => arg.length === fn.length ? fn(...arg): curry(fn, arg)
)([...arr, ...args])

// 逐步接收参数，并缓存供后期使用
// 不立即执行，延后执行
// 符合计算的条件，将缓存的参数，同意传递给执行方法
// 延迟求值的特性需要用到JavaScript中的作用域来保存上一次传进来的参数。

// 缺点：如果调用链特别长， 会导致内存得不到释放
