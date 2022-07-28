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
	
	for(let i in allplayer) {
		if(allplayer[i] !== 0) return allplayer[i]
	}

}
