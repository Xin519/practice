const obj = {
	type: 'GET',
	data: {},
	dataType: 'json',
	url: '',
	success: e => e,
	fail: e => e
}

function myAjax(opinos = obj) {
	const xhr = new XMLHttpRequest()
	if (!opinos.url) throw new Error('"url" is not defined');
	if (opinos.type === 'GET') {
		xhr.open('GET', opinos.url + '?' + opinos.data, true)
		xhr.send(null)
	} else {
		xhr.open('POST', opinos.url, true)
		xhr.send(opinos.data)
	}
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			const status = xhr.status
			if (200 <= status < 300) {
				opinos.success(xhr.responseText)
			} else {
				opinos.fail(xhr.responseText)
			}
		}
	}
}

// 遍历并返回新数组
Array.prototype.myMap = function(callback, then) {
	let len = this.length
	let arr = []
	if (len === 0) return arr
	for (let i = 0; i < len; i++) {
		arr[i] = callback.call(then, this[i], i, this)
	}

	return arr
}

Array.prototype.myForEach = function(callback) {
	let len = this.length
	for (let i = 0; i < len; i++) {
		callback(this[i], i, this)
	}
}

// 返回满足条件的array
Array.prototype.myFilter = function(callback) {
	let len = this.length
	let arr = []
	for (let i = 0; i < len; i++) {
		callback(this[i], i, this) && arr.push(this[i])
	}
	return arr
}

// 返回满足条件的第一个
Array.prototype.myFind = function(callback) {
	let len = this.length
	for (let i = 0; i < len; i++) {
		if (callback(this[i], i, this)) return this[i]
	}
	return ''
}

// 判断每一项是否满足条件 返回 true/false
Array.prototype.myEvery = function(callback) {
	let len = this.length
	for (let i = 0; i < len; i++) {
		if (!callback(this[i], i, this)) return false
	}
	return true
}

// 判断有一项是否满足条件 返回 true/false
Array.prototype.mySome = function(callback) {
	let len = this.length
	for (let i = 0; i < len; i++) {
		if (callback(this[i], i, this)) return true
	}
	return false
}

// 数组扁平化
Array.prototype.myFlat = function(num = 1) { // num : '' / number / Infinity
	const array = []
	let index = 0

	const fn = arr => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i]) {
				if (Array.isArray(arr[i]) && index !== num) {
					index++
					fn(arr[i])
				} else {
					array.push(arr[i])
				}
			}
		}
	}

	fn(this)

	return array
}

function myInstance(left, right) {
	if (typeof left !== 'object' || !left) return false
	let proto = Object.getPrototypeOf(left)
	while (true) {
		if (proto === null) return false
		if (proto === right.prototype) return true
		proto = Object.getPrototypeOf(proto)
	}
}

function myNew(fn, ...args) {
	const obj = {}
	obj.__proto__ = fn.prototype
	const result = fn.apply(obj, args)
	return result instanceof Object ? result : obj
}

function mySleep(time) {
	return new Promise((resole, reject) => setTimeout(resole(true), time))
}

function myIterator(arr) {
	let index = 0
	return {
		next: () => {
			return index < arr.length ? {
				value: arr[index++],
				done: false
			} : {
				value: undefined,
				done: true
			}
		}
	}
}

class myEventEmitter {
	constructor() {
		this.eventMap = {}
	}

	on(type, fn) {
		if (!(fn instanceof Function)) {
			throw new Error("哥 你错了 请传一个函数")
		}
		if (!this.eventMap[type]) {
			this.eventMap[type] = []
		}
		this.eventMap[type].push(fn)
	}

	emit(type, params) {
		if (this.eventMap[type]) {
			this.eventMap[type].myForEach(fn => {
				fn(params)
			})
		}
	}

	off(type, fn) {
		if (this.eventMap[type]) {
			this.eventMap[type].splice(this.eventMap[type].indexOf(fn) >>> 0, 1)
		}
	}

	clear() {
		this.eventMap = {}
	}
}

function memoize(fn, then) {
	let obj = Object.create(null)
	then = then || this
	return (...key) => {
		if (!obj(key)) {
			obj[key] = fn.apply(then, key)
		}
		return obj[key]
	}
}

function curry1 = (fn, args = []) {
	var then = this
	var len = fn.length
	var arg = args

	return function () {
		const _arg = [...Array.prototype.slice.call(arguments), ...arg]
		if (_arg.length < len) {
			return curry1.apply(then, fn, _arg)
		}
		return fn.apply(then, _arg)
	}
}

const curry = (fn, arr = []) => (...args) => (
	arg => arg.length < fn.length ? curry(fn, arg) : fn(...arg)
)([...arr, ...args])

function throttled(fn, delay = 500) {
	let timer = null
	let starttime = Date.now()
	return function() {
		const curtime = Date.now()
		const remaining = delay - (curtime - starttime)
		const then = this
		const args = arguments
		clearTimeout(timer)
		if (remaining <= 0) {
			fn.apply(then, args)
			starttime = Date.now()
		} else {
			timer = setTimeout(fn, remaining)
		}
	}
}

function debounce(fn, delay) {
	let timeout
	return function() {
		const then = this
		const args = arguments
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			fn.apply(then, ...args)
		}, delay)
	}
}

Function.prototype.myCall = (then, ...args) => {
	const _then = then || window
	_then.fn = this
	const result = eval('_then.fn(...args)')
	delete _then.fn
	return result
}

Function.prototype.myApply = (then, args) => {
	const _then = then || window
	_then.fn = this
	const result = eval('_then.fn(...args)')
	delete _then.fn
	return result
}

Function.prototype.myBind = (then, ...arr) => {
	if (typeof this !== 'function') throw new Error('this must be a function')
	const self = this
	let res = function(...args) {
		const arg = [...args, ...arr]
		return self.apply(this instanceof self ? this : then, arg)
	}
	if (this.prototype) {
		res.prototype = Object.create(this.prototype)
	}

	return res
}

Array.prototype.mySort = function(fn = (a, b) => a - b) {
	const len1 = this.length
	for (let i = 0; i < len1; i++) {
		const len2 = this.length - i - 1
		for (let j = 0; j < len2; j++) {
			if (fn(this[j], this[j + 1]) > 0) {
				let temp = this[j]
				this[j] = this[j + 1]
				this[j + 1] = temp
			}
		}
	}
}

// Object.create
const mycreate = obj => {
	function fn() {}
	fn.prototype = obj
	return new fn()
}

// 手写类型判断函数
const getType = value => {
	// 判断null
	if (value === null) {
		return value + ''
	}
	// 判断引用类型
	if (typeof value === 'object') {
		let valueClass = Object.prototype.toString.call(value),
			type = valueClass.split(" ")[1].split("");
		type.pop();
		return type.join("").toLowerCase();
	} else {
		return typeof value
	}
}

// 浅拷贝

// Object.assign
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
console.log(target);

// 扩展运算符
let obj1 = {a:1,b:{c:1}}
let obj2 = {...obj1};
obj1.a = 2;
console.log(obj1); //{a:2,b:{c:1}}
console.log(obj2); //{a:1,b:{c:1}}
obj1.b.c = 2;
console.log(obj1); //{a:2,b:{c:2}}
console.log(obj2); //{a:1,b:{c:2}}

// Array.prototype.slice
let arr = [1,2,3,4];
console.log(arr.slice()); // [1,2,3,4]
console.log(arr.slice() === arr); //false

// Array.prototype.concat
let arr = [1,2,3,4];
console.log(arr.concat()); // [1,2,3,4]
console.log(arr.concat() === arr); //false

// 
const shallowCopy = e => {
	if(!e && typeof e !== 'object') throw new Error('"url" is not "object"');
	const obj = Array.isArray(e)? []: {}
	for(let i in e) {
		if(e.hasOwnProperty(i)) {
			obj[i] = e[i]
		}
	}
	return obj
}

// 深拷贝

// JSON.stringify()
let obj1 = {  a: 0,
              b: {
                 c: 0
                 }
            };
let obj2 = JSON.parse(JSON.stringify(obj1));
obj1.a = 1;
obj1.b.c = 1;
console.log(obj1); // {a: 1, b: {c: 1}}
console.log(obj2); // {a: 0, b: {c: 0}}

// 函数库lodash的_.cloneDeep方法
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false

// 
const deepCopy = e => {
	if(!e && typeof e !== 'object') throw new Error('"url" is not "object"');
	const obj = Array.isArray(e)? []: {},
	for(let i in e) {
		if(e.hasOwnProperty(i)) {
			obj[i] = typeof e[i] === 'object'? deepCopy(e[i]): e[i]
		}
	}
	return obj
}

