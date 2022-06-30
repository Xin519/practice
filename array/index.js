Array.prototype.maps = function(callbackFn, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null");
  }
  // console.log(Object.prototype.toString.call(callbackFn))
  if (Object.prototype.toString.call(callbackFn) != "[object Function]") {
    throw new TypeError(callbackFn + ' is not a function')
  }
  let O = Object(this);
  let T = thisArg;

  let len = O.length >>> 0;
  let A = new Array(len);
  for(let k = 0; k < len; k++) {
    if (k in O) {
      let kValue = O[k];
      // 依次传入this, 当前项，当前索引，整个数组
      let mappedValue = callbackFn.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
  }
  return A;
}

let arr = [1, 2]

let list = arr.maps(i => i + 1, arr)

// 遍历并返回新数组
Array.prototype.myMap = function (callback, then) {
	let len = this.length
	let arr = []
	if(len === 0) return arr
	for(let i = 0; i < len; i++) {
		arr[i] = callback.call(then, this[i], i, this)
	}
	
	return arr
}

Array.prototype.myForEach = function(callback) {
	let len = this.length
	for(let i = 0; i < len; i++) {
		callback(this[i], i, this)
	}
}

// 返回满足条件的array
Array.prototype.myFilter = function(callback) {
	let len = this.length
	let arr = []
	for(let i = 0; i < len; i++) {
		callback(this[i], i, this) && arr.push(this[i])
	}
	return arr
}

// 返回满足条件的第一个
Array.prototype.myFind = function(callback) {
	let len = this.length
	for(let i = 0; i < len; i++) {
		if(callback(this[i], i, this)) return this[i]
	}
	return ''
}

// 判断每一项是否满足条件 返回 true/false
Array.prototype.myEvery = function (callback) {
	let len = this.length
	for(let i = 0; i < len; i++) {
		if(!callback(this[i], i, this)) false
	}
	return true
}

// 判断有一项是否满足条件 返回 true/false
Array.prototype.mySome = function (callback) {
	let len = this.length
	for(let i = 0; i < len; i++) {
		if(callback(this[i], i, this)) true
	}
	return false
}

// 数组扁平化
Array.prototype.myFlat = function (num = 1) { // num : '' / number / Infinity
	const array = []
	let index = 0
	
	const fn = arr => {
		for(let i = 0; i < arr.length; i++) {
			if(arr[i]){
				if(Array.isArray(arr[i]) && index !== num) {
					index ++
					fn(arr[i])
				}else{
					array.push(arr[i])
				}
			} 
		}
		
	}
	fn(this)
	return array
}
