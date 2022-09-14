const tree = {
	val: 'a',
	left: {
		val: 'b',
		left: null,
		right: null
	},
	right: {
		val: 'c',
		left: null,
		right: null
	}
}

// 前序遍历 
// 从根开始 先左 后右

// 递归实现
function preorder1 (root) {
	if(!root) return []
	
	const arr = []
		
	const fn = (node) => {
	    arr.push(node.val)
	    if(node.left) fn(node.left)
	    if(node.right) fn(node.right) 
	}
		
	fn(root)
		
	return arr
}

// 栈方式
function preorder1 (root) {
	if(!root) return []
	const arr = []
	
	let stack = [root]
	
	while(stack.length) {
		const o = stack.pop()
		arr.push(o.val)
		
		if(o.right) stack.push(o.right)
		if(o.left) stack.push(o.left)
	}
	
	return arr
} 
