// 在JavaScript中，new操作符用于创建一个给定构造函数的实例对象
function mynew(Func, ...args) {
    // 1.创建一个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}

/**
*创建一个空对象，作为将要返回的对象实例
*将这个空对象的原型，指向构造函数的prototype属性
*将这个空对象赋值给函数内部的this关键字
*开始执行构造函数内部的代码
*/
//代码 演示new的过程
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ param1) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' && result != null) ? result : context;
}
