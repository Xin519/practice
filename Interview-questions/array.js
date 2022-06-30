// 使用 JavaScript 中的 Array 实现一个队列结构
function Query (){
	this.arrays = []
}

Query.prototype = {
	// 将参数放入队列中
	// 参数 item 即将加入队列的元素
	put: function(item){
		if(item == undefined) return '请传入正确参数'
		this.arrays.push(item)
	},
	// 从队列中取出
	get: function(){
		return this.arrays
	},
	// 输出长度
	length: function(){
		return this.arrays.length
	},
	// 清空队列
	clear: function(){
		this.arrays = []
	}
}

let foo = new Query()
console.log(foo.put()) // 
foo.put('leaf')	// 添加一项
console.log(foo.get()) // 输出 arrays
console.log(foo.length()) // 输出 arrays 长度
foo.clear() // 清空
console.log('---------------------------')
console.log(foo.get()) // 输出 arrays
console.log(foo.length()) // 输出 arrays 长度







