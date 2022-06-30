// 创建一个指针对象，指向数据结构的起始位置。
// 第一次调用next方法，指针自动指向数据结构的第一个成员
// 接下来不断调用next方法，指针会一直往后移动，直到指向最后一个成员
// 每调用next方法返回的是一个包含value和done的对象，{value: 当前成员的值,done: 布尔值}
// 	value表示当前成员的值，done对应的布尔值表示当前的数据的结构是否遍历结束。
// 	当遍历结束的时候返回的value值是undefined，done值为true

function myIterator(arr) {
	let nextIndex = 0
	return {
		next: function() {
			return nextIndex < arr.length ?
				{
					value: arr[nextIndex++],
					done: false
				} :
				{
					value: undefined,
					done: true
				}
		}
	}
}
let arr = [1, 4, 'ads'] // 准备一个数据  let iteratorObj = myIterator(arr)  
console.log(iteratorObj.next()) // 所有的迭代器对象都拥有next()方法，会返回一个结果对象console.log(iteratorObj.next())  
console.log(iteratorObj.next())  
console.log(iteratorObj.next())
