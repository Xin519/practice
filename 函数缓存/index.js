// 把参数和对应的结果数据存在一个对象中，调用时判断参数对应的数据是否存在，存在就返回对应的结果数据，否则就返回计算结果

const add = (a, b) => a + b
const jian = (a, b) => a - b

const memoize = function (func, content) {
  let cache = Object.create(null) // 设置空对象
  content = content || this // 设置this
  return (...key) => {	// 返回函数
    if (!cache[key]) {	// 通过key判断是否对象里是否存在
      cache[key] = func.apply(content, key) // 缓存当前值
    }
    return cache[key] // 返回结果
  }
}

const calc = memoize(add);
const num1 = calc(100,200)
const num2 = calc(100,200) // 缓存得到的结果

const calcs = memoize(jian);

// 在当前函数作用域定义了一个空对象，用于缓存运行结果
// 运用柯里化返回一个函数，返回的函数由于闭包特性，可以访问到cache
// 然后判断输入参数是不是在cache的中。如果已经存在，直接返回cache的内容，如果没有存在，使用函数func对输入参数求值，然后把结果存储在cache中

// 以下几种情况下，适合使用缓存：

// 对于昂贵的函数调用，执行复杂计算的函数
// 对于具有有限且高度重复输入范围的函数
// 对于具有重复输入值的递归函数
// 对于纯函数，即每次使用特定输入调用时返回相同输出的函数
