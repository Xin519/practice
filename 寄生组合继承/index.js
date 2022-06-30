// 寄生组合继承
// 寄生组合继承其实需要注意的是子构造函数constructor的指向问题。以及继承的弊病：超集会调用两次。
// constructor 属性返回对创建此对象的数组函数的引用。

function Super() {}
function Sub() {
    Super.call(this)
}
Sub.prototype = new Super();
console.log(Sub.constructor) // Function() { [native code] }
Sub.constructor = Sub;
console.log(Sub.constructor) // Sub() 


//

function clone(parent, child) {
	child.prototype = Object.create(parent.prototype)
	child.prototype.constructor = child
}

function parent () {
	this.name = '圈圈'
	this.arr = [1, 2]
}
parent.prototype.getName = function () {
	return this.name
}

function child () {
	parent.call(this)
	this.finds = 5
}

clone(parent, child)

child.prototype.getFinds = function () {
	return this.finds
}

child.prototype.getArr = function () {
	return this.arr
}

const fn = new child()
