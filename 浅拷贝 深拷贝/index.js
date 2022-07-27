// 浅拷贝

// Object.assign
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
console.log(target);

// 扩展运算符
let obj1 = {a:1,b:{c:1}}
let obj2 = {...obj1};
obj1.a = 2;
console.log(obj1); //{a:2,b:{c:1}}
console.log(obj2); //{a:1,b:{c:1}}
obj1.b.c = 2;
console.log(obj1); //{a:2,b:{c:2}}
console.log(obj2); //{a:1,b:{c:2}}

// Array.prototype.slice
let arr = [1,2,3,4];
console.log(arr.slice()); // [1,2,3,4]
console.log(arr.slice() === arr); //false

// Array.prototype.concat
let arr = [1,2,3,4];
console.log(arr.concat()); // [1,2,3,4]
console.log(arr.concat() === arr); //false

// 
const shallowCopy = e => {
	if(!e && typeof e !== 'object') throw new Error('"url" is not "object"');
	const obj = Array.isArray(e)? []: {}
	for(let i in e) {
		if(e.hasOwnProperty(i)) {
			obj[i] = e[i]
		}
	}
	return obj
}

// 深拷贝

// JSON.stringify()
let obj1 = {  a: 0,
              b: {
                 c: 0
                 }
            };
let obj2 = JSON.parse(JSON.stringify(obj1));
obj1.a = 1;
obj1.b.c = 1;
console.log(obj1); // {a: 1, b: {c: 1}}
console.log(obj2); // {a: 0, b: {c: 0}}

// 函数库lodash的_.cloneDeep方法
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false

// 
const deepCopy = e => {
	if(!e && typeof e !== 'object') throw new Error('"url" is not "object"');
	const obj = Array.isArray(e)? []: {},
	for(let i in e) {
		if(e.hasOwnProperty(i)) {
			obj[i] = typeof e[i] === 'object'? deepCopy(e[i]): e[i]
		}
	}
	return obj
}