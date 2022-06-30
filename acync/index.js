// 微任务
// 一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前

// 常见的微任务有：

// 	Promise.then
// 	MutaionObserver
// 	Object.observe（已废弃；Proxy 对象替代）
// 	process.nextTick（Node.js）

// 宏任务
// 宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合

// 常见的宏任务有：

// 	script (可以理解为外层同步代码)
// 	setTimeout/setInterval
// 	UI rendering/UI事件
// 	postMessage、MessageChannel
// 	setImmediate、I/O（Node.js）


async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')

// 执行整段代码，遇到 console.log('script start') 直接打印结果，输出 script start
// 遇到定时器了，它是宏任务，先放着不执行
// 遇到 async1()，执行 async1 函数，先打印 async1 start，下面遇到await怎么办？先执行 async2，打印 async2，然后阻塞下面代码（即加入微任务列表），跳出去执行同步代码
// 跳到 new Promise 这里，直接执行，打印 promise1，下面遇到 .then()，它是微任务，放到微任务列表等待执行
// 最后一行直接打印 script end，现在同步代码执行完了，开始执行微任务，即 await下面的代码，打印 async1 end
// 继续执行下一个微任务，即执行 then 的回调，打印 promise2
// 上一个宏任务所有事都做完了，开始下一个宏任务，就是定时器，打印 settimeout

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// settimeout