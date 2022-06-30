/*
	提到“对应关系”，应该联想到的是“映射”。在 JavaScript 中，处理“映射”我们大部分情况下都是用对象来做的。所以说在全局我们需要设置一个对象，来存储事件和监听函数之间的关系：
*/
class myEventEmitter {
	constructor() {
		// eventMap 用来存储事件和监听函数之间的关系
		this.eventMap = {}
	}

	/*
		所谓“订阅”，也就是注册事件监听函数的过程。这是一个“写”操作，具体来说就是把事件和对应的监听函数写入到 eventMap 里面去：
	  */
	 
	// type 这里就代表事件的名称
	on(type, handler) {
		// hanlder 必须是一个函数，如果不是直接报错
		if (!(handler instanceof Function)) {
			throw new Error("哥 你错了 请传一个函数")
		}
		// 判断 type 事件对应的队列是否存在
		if (!this.eventMap[type]) {
			// 若不存在，新建该队列
			this.eventMap[type] = []
		}
		// 若存在，直接往队列里推入 handler
		this.eventMap[type].push(handler)
	}

	/*
		订阅操作是一个“写”操作，相应的，发布操作就是一个“读”操作。发布的本质是触发安装在某个事件上的监听函数，
		我们需要做的就是找到这个事件对应的监听函数队列，将队列中的 handler 依次执行出队：
	  */
	 
	// 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体
	emit(type, params) {
		// 假设该事件是有订阅的（对应的事件队列存在）
		if (this.eventMap[type]) {
			// 将事件队列里的 handler 依次执行出队
			this.eventMap[type].forEach((handler, index) => {
				// 注意别忘了读取 params
				handler(params)
			})
		}
	}

	off(type, handler) {
		if (this.eventMap[type]) {
			this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)
		}
	}
}
