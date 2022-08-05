// 循环打印红黄绿 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次

function red() {
	console.log('red');
}

function green() {
	console.log('green');
}

function yellow() {
	console.log('yellow');
}

// callback 递归实现
const task1 = (timer, light, fn) => {
	setTimeout(() => {
		switch (light) {
			case 'red':
				red()
				break;
			case 'green':
				green()
				break;
			case 'yellow':
				yellow()
				break;
		}
		fn()
	}, timer)
}

const step1 = () => {
	task1(3000, 'red', () => {
		task1(2000, 'green', () => {
			task1(1000, 'yellow', step1)
		})
	})
}

// promise 
const task2 = (timer, light) => {
	new Promise((resolve, reject) => {
		setTimeout(() => {
			switch (light) {
				case 'red':
					red()
					break;
				case 'green':
					green()
					break;
				case 'yellow':
					yellow()
					break;
			}
			resolve()
		}, timer)
	})

}

const step2 = () => {
	task2(3000, 'red')
		.then(() => task2(2000, 'green'))
		.then(() => task2(2100, 'yellow'))
		.then(step2)
}

// async/await

const taskRunner = async () => {
	await task2(3000, 'red')
	await task2(2000, 'green')
	await task2(2100, 'yellow')
	taskRunner()
}

// 每隔一秒打印 1,2,3,4
// 使用闭包实现
for (var i = 0; i < 5; i++) {
	(function(i) {
		setTimeout(function() {
			console.log(i);
		}, i * 1000);
	})(i);
}
// 使用 let 块级作用域
for (let i = 0; i < 5; i++) {
	setTimeout(function() {
		console.log(i);
	}, i * 1000);
}

// 有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?

const childNum = (num, count) => {
	let allplayer = [];
	for (let i = 0; i < num; i++) {
		allplayer[i] = i + 1;
	}

	let exitCount = 0; // 离开人数
	let counter = 0; // 记录报数
	let curIndex = 0; // 当前下标

	while (exitCount < num - 1) {
		if (allplayer[curIndex] !== 0) counter++;

		if (counter == count) {
			exitCount++
			allplayer[curIndex] = 0
			counter = 0
		}

		curIndex++;

		if (curIndex == num) {
			curIndex = 0
		};
	}

	for (let i in allplayer) {
		if (allplayer[i] !== 0) return allplayer[i]
	}

}

// Proxy 数据响应式
let onWatch = (obj, setBind, getLogger) => {
	let handler = {
		get(target, property, receiver) {
			getLogger(target, property)
			return Reflect.get(target, property, receiver)
		},
		set(target, property, value, receiver) {
			setBind(value, property)
			return Reflect.set(target, property, value)
		}
	}
	return new Proxy(obj, handler)
}
let obj = {
	a: 1
}
let p = onWatch(
	obj,
	(v, property) => {
		console.log(`监听到属性${property}改变为${v}`)
	},
	(target, property) => {
		console.log(`'${property}' = ${target[property]}`)
	}
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2


// 双向数据绑定
let obj = {}
let input = document.getElementById('input')
let span = document.getElementById('span')
// 数据劫持
Object.defineProperty(obj, 'text', {
	configurable: true,
	enumerable: true,
	get() {
		console.log('获取数据了')
	},
	set(newVal) {
		console.log('数据更新了')
		input.value = newVal
		span.innerHTML = newVal
	}
})
// 输入监听
input.addEventListener('keyup', function(e) {
	obj.text = e.target.value
})

// 字符串出现的不重复最长长度
// 用一个滑动窗口装没有重复的字符，枚举字符记录最大值即可。用 map 维护字符的索引，遇到相同的字符，把左边界移动过去即可。挪动的过程中记录最大长度：

var lengthOfLongestSubstring = function(s) {
	let map = new Map();
	let i = -1
	let res = 0
	let n = s.length
	for (let j = 0; j < n; j++) {
		if (map.has(s[j])) {
			i = Math.max(i, map.get(s[j]))
		}
		res = Math.max(res, j - i)
		map.set(s[j], j)
	}
	return res
};

//  setTimeout 实现 setInterval
function mySetInterval(fn, timeout) {
	// 控制器，控制定时器是否继续执行
	var timer = {
		flag: true
	};
	// 设置递归函数，模拟定时器执行。
	function interval() {
		if (timer.flag) {
			fn();
			setTimeout(interval, timeout);
		}
	}
	// 启动定时器
	setTimeout(interval, timeout);
	// 返回控制器
	return timer;
}

// 判断对象是否存在循环引用
const isCycleObject = (obj, parent) => {
	const parentArr = parent || [obj];
	for (let i in obj) {
		if (typeof obj[i] === 'object') {
			let flag = false;
			parentArr.forEach((pObj) => {
				if (pObj === obj[i]) {
					flag = true;
				}
			})
			if (flag) return true;
			flag = isCycleObject(obj[i], [...parentArr, obj[i]]);
			if (flag) return true;
		}
	}
	return false;
}


const a = 1;
const b = {
	a
};
const c = {
	b
};
const o = {
	d: {
		a: 3
	},
	c
}
o.c.b.aa = a;

console.log(isCycleObject(o))

// 查找有序二维数组的目标值
var findNumberIn2DArray = function(matrix, target) {
	if (matrix == null || matrix.length == 0) {
		return false;
	}
	let row = 0;
	let column = matrix[0].length - 1;
	while (row < matrix.length && column >= 0) {
		if (matrix[row][column] == target) {
			return true;
		} else if (matrix[row][column] > target) {
			column--;
		} else {
			row++;
		}
	}
	return false;
};

// 二维数组斜向打印
function printMatrix(arr) {
	let m = arr.length,
		n = arr[0].length
	let res = []

	// 左上角，从0 到 n - 1 列进行打印
	for (let k = 0; k < n; k++) {
		for (let i = 0, j = k; i < m && j >= 0; i++, j--) {
			res.push(arr[i][j]);
		}
	}

	// 右下角，从1 到 n - 1 行进行打印
	for (let k = 1; k < m; k++) {
		for (let i = k, j = n - 1; i < m && j >= 0; i++, j--) {
			res.push(arr[i][j]);
		}
	}
	return res
}

// 用Promise实现图片的异步加载
let imageAsync = (url) => {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.src = url;
		img.οnlοad = () => {
			console.log(`图片请求成功，此处进行通用操作`);
			resolve(image);
		}
		img.οnerrοr = (err) => {
			console.log(`失败，此处进行失败的通用操作`);
			reject(err);
		}
	})
}

imageAsync("url").then(() => {
	console.log("加载成功");
}).catch((error) => {
	console.log("加载失败");
})
