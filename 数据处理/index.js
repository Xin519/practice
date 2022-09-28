// 日期格式化函数
// dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
// dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
// dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日

const dateFormat = (dates = new Date(), format = 'yyyy-MM-dd') => {
	const Y = dates.getDate()
	const M = dates.getMonth() + 1
	const D = dates.getDay()
	format = format.replace('/yyyy/', Y)
	format = format.replace('/MM/', M)
	format = format.replace('/dd/', D)
	return format
}

// 交换a,b的值，不能用临时变量

const fn = (a, b) => {
	a = a + b
	b = a - b
	a = a - b
	return [a, b]
}

// 数组求和

const add = arr => {
	if(arr.length === 1) return arr[0]
	return arr[0] + add(arr.slice(1))
}

// 扁平化 reduce 函数迭代

let arr = [1, [2, [3, 4]]];
const flatten1 = (arr) => {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

// 拓展运算符

const flatten2 = (arr) => {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

// 数组去重
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

// es6
Array.from(new Set(array))
[...new Set(array)]

//es5
const uniqueArray = arr => {
	const obj = {}
	const list = []
	for(let i in arr) {
		if(!obj[arr[i]]) {
			obj[arr[i]] = arr[i]
			list.push(arr[i])
		}
	}
	return list
}

// push
Array.prototype.myPush = (...arr) => {
	if(arr.length === 1) {
		this[this.length] = arr[0]
		return this.length
	}
	
	for(let i in arr) {
		this[this.length] = arr[i]
	}
	return this.length
}

// repeat

const repeat1 = (s, n) {
    return (new Array(n + 1)).join(s);
}

const repeat2 = (s, n) {
    return (n > 0) ? s.concat(repeat2(s, --n)) : "";
}

// 符串翻转

const _reverse = (a = '') => {
	return a.split("").reverse().join("");
}

// 数字每千分位用逗号隔开
const format = n => {
    let num = n.toString() // 转成字符串
    let decimals = ''
        // 判断是否有小数
    num.indexOf('.') > -1 ? decimals = num.split('.')[1] : decimals
    let len = num.length
    if (len <= 3) {
        return num
    } else {
        let temp = ''
        let remainder = len % 3
        decimals ? temp = '.' + decimals : temp
        if (remainder > 0) { // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
        } else { // 是3的整数倍
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp 
        }
    }
}
format(12323.33) 

// 树结构

function jsonToTree(data) {
  // 初始化结果数组，并判断输入数据的格式
  let result = []
  if(!Array.isArray(data)) {
    return result
  }
  // 使用map，将当前对象的id与当前对象对应存储起来
  let map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  // 
  data.forEach(item => {
    let parent = map[item.pid];
    if(parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

// 解析 URL Params 为对象

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })
  return paramsObj;
}

parseParam(url)
