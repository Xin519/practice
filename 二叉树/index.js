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

function preorder (root) {
	const arr = []
		
	const fn = (node) => {
        if(node) {
            arr.push(node.val)
            if(node.left) fn(node.left)
            if(node.right) fn(node.right) 
        }
	}
		
	fn(root)
		
	return arr
}
