// 拍平去重排序 
const arr = [
	[1, 2, 3], 1, 1, [9, 8, 4], 1, 5, 5, 2, 3, 2, 9, 3, 6, 99, 25, 99
]

function foo(array) {
	return [...new Set(array.join(',').split(','))].map(a => +a).sort((a, b) => a - b)
	// join: 展开转为字符串 => split: 转为数组 => map(a => +a): 数组内每一项字符串转回数字 => sort((a, b) => a - b): 排序 => new Set: 去重 => ...: 展开 => []: 转为数组 => return: 输出
}

let a = foo(arr)

//思路：判断，如果一趟下来，一次交换都没有做，说明就已经排好序，就不需要继续比
var arr = [65, 97, 76, 13, 27, 49, 58];

function fn(array) {
	for (var i = 0; i < array.length - 1; i++) {
		var count = 0; //记录交换的次数
		//思路： 两两比较，如果前面的大于后面的，交换位置
		for (var j = 0; j < arr.length - 1 - i; j++) {
			if (array[j] > array[j + 1]) {
				count++;
				var temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
		console.log(count);
		if (count == 0) {
			//说明，没有进行交换
			break;
		}
	}
	return array
}

console.log(fn(arr))
