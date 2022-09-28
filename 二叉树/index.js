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


// 中序遍历
// 左 => 跟  => 右

// 递归
function inorderTraversal1 (root) {
	const arr = []
	
	const fn = node => {
		if(!node) return
		fn(node.left)
		arr.push(node.val)
		fn(node.right)
	}
	
	fn(root)
	
	return arr
}

// 非递归
function inorderTraversal2 (root) {
	const arr = []
	const stack = []
	let o = root
	
	while(stack.length || o) {
		while(o) {
			stack.push(o)
			o = o.left
		}
		const n = stack.pop()
		arr.push(n.val)
		o = n.right
	}
	
	return arr
}


// 后序遍历
// 左 => 右  => 跟

// 递归
function postorderTraversal1 (root) {
	const arr = []
	
	const fn = node => {
		if(!node) return
		fn(node.left)
		fn(node.right)
		arr.push(node.val)
	}
	
	fn(root)
	
	return arr
}

// 非递归
function postorderTraversal2 (root) {
	if(!root) return []
	const arr = []
	const stack = [root]
	
	while(stack.length) {
		const o = stack.pop()
		arr.unshift(o.val)
		
		if(o.left) stack.push(o.left)
		if(o.right) stack.push(o.right)
	}
	
	return arr
}