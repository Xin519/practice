// 数据转换 obj => list

const obj = {
	property1: ['a', 'b'],
	property2: [1, 2, 3],
	property3: ['+', '-']
}

// list = [
// 	{property1: 'a', property2: 1},
// 	{property1: 'a', property2: 2},
// 	{property1: 'b', property2: 1},
// 	{property1: 'b', property2: 2}
// ]

// 若obj不确定 如何解决

const objFn = e => {
	const keys = Object.keys(e)
	const list = []
	
	const keysFor = (key, arr, obj = {}, keyIndex = 0) => {
		for(let i in arr){
			obj[key] = arr[i]
			const index = keyIndex + 1
			if(keys[index] && e[keys[index]].length > 0) {
				keysFor(keys[index], e[keys[index]], obj, index)
			}else{
				list.push({...obj})
			}
		}
	}
	
	if(keys.length > 0) keysFor(keys[0], e[keys[0]])
	return list
}

console.log(objFn(obj))
