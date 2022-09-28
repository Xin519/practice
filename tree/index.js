const a = {
	val: 'b',
	children: [
		{
			val: 'c',
			children: [
				{
					val: 'd',
					children: []
				}
			]
		},
		{
			val: 'e',
			children: []
		}
	]
}

// 深度优先遍历 
// 从跟出发 尽可能深的遍历节点
// 对根节点children挨个进行深度优先遍历

function for1 (root) {
	console.log(root)
	root.children.forEach(for1)
}

// 广度优先遍历
// 从跟出发 优先遍历距离根近的节点
// 建一个队列 把根节点入列 
// 把对头出队 
// 把对头children挨个入队
// 重复上面两步 直到结束

function for2 (root) {
	const arr = [root]
	while(arr.length > 0) {
		const o = arr.shift()
		console.log(o)
		o.children.forEach(i => {
			arr.push(i)
		})
	}
	
}
