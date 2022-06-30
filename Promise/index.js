const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' //失败

class Mypromise{
    constructor(executor){
		try{
			executor(this.resolve,this.reject)
		}catch(e){
			// 发生错误调用reject
			this.reject(e);
		}
    }
    status = PENDING; // 状态为等待
    // 状态为等待可执行修改状态
	
	value = undefined	//成功的值
	reason = undefined	//失败原因
	
	//回调 
	successCallback = []; //成功
	failCallback = []; // 失败
    resolve = value => {
        if(this.status === PENDING)
        this.status = FULFILLED 
        // 状态改为成功
        this.value = value 
        // 保存成功的值
		while(this.successCallback.length) this.successCallback.shift()(this.value)
        // 判断成功回调是否存在 如果存在 循环调用
    }
    reject = reason => {
        if(this.status === PENDING)
        this.status = REJECTED
        // 状态改为失败
        this.reason = reason
        // 保存失败原因
		while (this.failCallback.length) this.failCallback.shift()(this.reason)
        // 判断失败回调是否存在 如果存在 循环调用
    }
    then (successCallback,failCallback) {
		// 判断successCallback failCallback是否存在 如果不存在添加函数向下传递
		successCallback = successCallback ? successCallback : value => value;
		failCallback = failCallback ? failCallback : reason => { throw reason };
		let promises = new Mypromise((resolve,reject) => {
			// 判断状态
			if(this.status === FULFILLED){
				setTimeout(() => {
					try{
						let x = successCallback(this.value)   //成功回调
						// 判断x是普通值还是promise对象
						// 如果是普通值直接调用
						// 如果为promise对象查看promise对象返回值
						// 再根据返回值判断调用 resolve / reject
						resolvePromise(promises,x,resolve,reject)
					} catch(e){
						reject(e);
					}
				},0)
			}else if(this.status === REJECTED){
				setTimeout(() => {
					try{
						let x =  failCallback(this.reason)  //失败回调
						// 判断x是普通值还是promise对象
						// 如果是普通值直接调用
						// 如果为promise对象查看promise对象返回值
						// 再根据返回值判断调用 resolve / reject
						resolvePromise(promises,x,resolve,reject)
					} catch(e){
						reject(e);
					}
				},0)	
			}else{
				// 将回调存储起来
				// push函数
				this.successCallback.push(() => {
					setTimeout(() => {
						try{
							let x = successCallback(this.value)   //成功回调
							resolvePromise(promises,x,resolve,reject)
						} catch(e){
							reject(e);
						}
					},0)
				});
				this.failCallback.push(() => {
					setTimeout(() => {
						try{
							let x =  failCallback(this.reason)  //失败回调
							resolvePromise(promises,x,resolve,reject)
						} catch(e){
							reject(e);
						}
					},0)	
				});
			}
		});
		return promises;
    }
	finally(callback){
		// 得到当前promise状态
		// 返回promise对象
		// 调用resolve方法
		return this.then(
			value => {
				return Mypromise.resolve(callback()).then(() => value)
			}, reason =>{
				return Mypromise.resolve(callback()).then(() => {throw reason})
			}
		)
	}
	catch(failCallback){
		// 失败回调 调用then方法
		return this.then(undefined,failCallback)
	}
	static all (array){
		let result = []; // 结果数组
		let index = 0; // 自增变量
		return new Mypromise((resolve,reject) => {
			function addData(key,value){
				result[key] = value;
				index++;
				if(index === array.length){
					resolve(result)
					// 判断是否全部执行完毕
				}
			}
			//循环数组判断是普通值还是数组
			for(let i = 0; i < array.length; i++){
				let current = array[i]
				if(current instanceof Mypromise){
					// promise对象
					current.then(value => addData(i,value),reason => reject(reason))
				}else{
					// 普通值
					addData(i,array[i])
				}
			}
		})
		// resolve(result)
	}
	static resolve (value){
		// 判断是否为promise对象 如果不是创建promise对象
		if(value instanceof Mypromise) return value;
		return new Mypromise(resolve => resolve(value))
	}
}

function resolvePromise(promises,x,resolve,reject){
	//判断是否自调用
	if(promises === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	if(x instanceof Mypromise){
		x.then(resolve,reject)
	}else{
		resolve(x)
	}
}