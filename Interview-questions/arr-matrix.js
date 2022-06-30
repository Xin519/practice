// 给定一个整数n 生成一个1 - n2 的所有元素 且按顺时针矩阵螺旋排序

// n = 3
// [
// 	[1,2,3],
// 	[8,9,4],
// 	[7,6,5]
// ]

function arrayRectangle(n){
	let arr = []
	for(let i=0; i < n; i++){
		let arrChlid = []
		for(let a = 0; a < n; a++){
			arrChlid.push('')
		}
		arr.push(arrChlid)
	}
	
	let nn = n*n
	let left = 0, top = 0, right = n - 1, bottom = n - 1, val = 1
	for(let i = 0; i < nn; i++ ){
		for(let i = left; i <= right; i++){
			arr[top][i] = val
			val++
		}
		top++
		
		for(let i = top; i <= bottom; i++){
			arr[i][right] = val
			val++
		}
		right--
		
		for(let i = right; i >= left; i--){
			arr[bottom][i] = val
			val++
		}
		bottom--
		
		for(let i = bottom; i >= top; i--){
			arr[i][left] = val
			val++
		}
		left++
	}
	return arr
}

console.log(arrayRectangle(5))
