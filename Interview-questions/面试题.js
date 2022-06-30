// 写一个mySetInterVal (fn, a, b) 每次间隔 a,a+b,a+2b 然后写一个 myClear 停止上面的 mySetInterVal

function mySetInterVal (fn, a, b){
	this.a = a
	this.b = b
	this.time = 0
	this.handle = -1
	this.myState = () => {
		this.handle = setTimeout(() => {
			this.time++
			fn()
			this.myState()
		},this.a + this.time * this.b)
	}
	this.myClear = () => {
		clearTimeout(this.handle)
		this.time = 0
	}
}

const a new mySetInterVal(() => { console.log('leaf') }, 1000, 2000)

// 合并二维有序数组成一维有序数组 归并排序的思路


// 斐波那契数列

function* fabonacciG(num) {
	var a = 1,
		b = 1,
		n = 0;
	while (n < num) {
		yield a;
		[a, b] = [b, a + b];
		n++
	}
}

// 字符串出现不重复最长长度

function maxLegth(){
	
}

// 有一堆整数 把它们分成三份 确保每一份尽量相等



