// 1 堆是什么？
// 堆都能用树来表示，并且一般树的实现都是利用链表。
// 而二叉堆是一种特殊的堆，它用完全二叉树表示，， 却可以利用数组实现。
// 平时使用最多的是二叉堆，它可以用完全二叉树表示，二叉堆易于存储，井且便于索
// 引
// ***堆数据结构像树，但是，是通过数组来实现的（不是通过链表：二叉堆）

// 2 在堆的实现时，需要注意：
// 因为是数组，所以父子节点的关系就不需要特殊的结构去维护了，索引l之间通过计算
// 就可以得到，省掉了很多麻烦。如果是链表结构，就会复杂很多；
// 完全二叉树要求叶子节点从左往右填满，才能开始填充下一层，这就保证了不需要对
// 数组整体进行大片的移动。这也是随机存储结构（数组）的短板：删除一个元素之后
// ，
// 整体往前移是比较费时的。这个特性也导致堆在删除元素的时候，要把最后一个叶
// 子节点补充到树根节点的缘由
// 二叉堆想树的样子我可以理解，但将它们安排在数组里的话，通过当前下标怎么就能找到父节点和字节的呢


// 左 	2 * index + 1
// 右   2 * index + 2
// 父	(index - 1) / 2

// 最小堆

class MinHeap {
	constructor() {
		this.heap = []
	}
	
	// 交换
	swap(i1, i2) {
		const value = this.heap[i1]
		this.heap[i1] = this.heap[i2]
		this.heap[i2] = value
	}
	
	// 父节点
	getParentIndex(index) {
		return Math.floor((index - 1) / 2)
	}
	// 左侧子节点
	getLeftIndex(index) {
		return 2 * index + 1
	}
	// 右侧子节点
	getRightIndex(index) {
		return 2 * index + 2
	}
	
	// 前移
	up(index) {
		// 下标为0不移动
		if(index == 0) return
		// 获取父节点下标
		const parentIndex = this.getParentIndex(index)
		// 判断父节点和当前值大小
		if(this.heap[parentIndex] > this.heap[index]) {
			// 交换两个值
			this.swap(parentIndex, index)
			// 递归处理
			this.up(parentIndex)
		}
	}
	
	// 后移
	down(index) {
		if(index == this.heap.length - 1) return
		const leftIndex = this.getLeftIndex(index)
		const rightIndex = this.getRightIndex(index)
		if(this.heap[leftIndex] < this.heap[index]) {
			this.swap(leftIndex, index)
			this.down(leftIndex)
		}
		if(this.heap[rightIndex] < this.heap[index]) {
			this.swap(rightIndex, index)
			this.down(rightIndex)
		}
	}
	
	// 添加元素
	insert(value) {
		this.heap.push(value)
		this.up(this.heap.length - 1)
	}
	
	// 删除堆顶
	pop() {
		this.heap[0] = this.heap.pop()
		this.down(0)
	}
	
	// 堆顶
	peek() {
		return this.heap[0]
	}
	
	// 长度
	size() {
		return this.heap.length
	}
}
