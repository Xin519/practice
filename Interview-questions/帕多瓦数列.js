// 已知帕多瓦数列定义如下

// F0 = F1 = F2 = 1
// Fn = Fn-2 + Fn - 3 , (n>=3)  // 数字为下标 

// 采用递归的方法 使用 js 定义 函数 F(n), 用于生成n位置的数字
// 函数输入参数为整数 （0开始）表示数列索引 函数返回该索引处的数字
function f(n){
	// if(n >= 3){
	// 	let arrays = [1,1,1]
	// 	for(let i = 3; i <= n; i++){
	// 		let item = arrays[i-2] + arrays[i-3]
	// 		arrays.push(item)
	// 	}
	// 	console.log('-------------------')
	// 	console.log(arrays)
	// 	return arrays[n]
	// } else {
	// 	return 1
	// }
	
	if ( n < 3 ) return 1
	return f(n - 2) + f(n - 3)
}


