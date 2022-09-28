const arr = [5,8,9,4,7,15,36,1,14]

// 冒泡排序

const arrSolt = arr => {
	for(let i = 0; i < arr.length; i++) {
		for(let j = 0; j < arr.length - 1 - i; j++) {
			if(arr[j] > arr[j + 1]) {
				const temp = arr[j]
				arr[j] = arr[j + 1]
				arr[j + 1] = temp
			}
		}
	}
	
	return arr
} 

// 选择排序

const sortMin = arr => {
	for(let i = 0; i < arr.length - 1; i++) {
		let o = i
		for(let j = i + 1; j < arr.length; j++) {
			if(arr[j] < arr[o]) o = j
		}
		let temp = arr[i]
		arr[i] = arr[o]
		arr[o] = temp
	}
	
	return arr
}

