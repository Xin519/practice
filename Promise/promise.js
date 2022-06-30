const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class myPromise {
	constructor(executor) {
		try {
			executor(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}
	
	student = PENDING
	value = null
	reason = null
	successCallback = []
	failCallback = []

	resolve = value => {
		if (this.student !== PENDING) return
		this.student = FULFILLED
		this.value = value
		while (this.successCallback.length) this.successCallback.shift()()
		// this.successCallback && this.successCallback(value)
	}

	reject = reason => {
		if (this.student !== PENDING) return false
		this.student = REJECTED
		this.reason = reason
		while (this.failCallback.length) this.failCallback.shift()()
		// this.failCallback && this.failCallback(reason)
	}

	then(successCallback = value => value, failCallback = reason => { throw reason }) {
		// successCallback = successCallback ? successCallback : value => value;
		// failCallback = failCallback ? failCallback : reason => { throw reason };
		const promise2 = new myPromise((resolve, reject) => {
			if (this.student === FULFILLED) {
				setTimeout(() => {
					try {
						const x = successCallback(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						this.reject(e)
					}
				}, 0)
			} else if (this.student === REJECTED) {
				setTimeout(() => {
					try {
						const x = failCallback(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						this.reject(e)
					}
				}, 0)
			} else {
				// 异步
				this.failCallback.push(() => {
					setTimeout(() => {
						try {
							const x = failCallback(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							this.reject(e)
						}
					}, 0)
				})
				this.successCallback.push(() => {
					setTimeout(() => {
						try {
							const x = successCallback(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							this.reject(e)
						}
					}, 0)
				})
			}
		})
		return promise2
	}

	finally(callback) {
		return this.then(value => {
			return myPromise.resolve(callback()).then(() => value)
		}, reason => {
			return myPromise.resolve(callback()).then(() => throw reason)
		})
	}
	
	catch(failCallback){
		return this.then(undefined, failCallback)
	}
	
	static all(arr) {
		return new myPromise((resolve, reject) => {
			let result = []
			let index = 0
			
			const addConst(key, value) {
				result[key] = value
				index ++ 
				if(index === result.length){
					resolve(result)
				}
			}
			
			for(let i = 0; i < arr.length; i++){
				const current = arr[i]
				if(current instanceof myPromise){
					current.then(value => addConst(i, value), reason => reject(reason))
				}else{
					addConst(i, current)
				}
			}
		})

	}
	
	static resolve(value) {
		if(value instanceof myPromise) return value
		return new myPromise(resolve => resolve(value))
	}
}

function resolvePromise(promises, x, resolve, reject) {
	if (promises === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	if (x instanceof myPromise) {
		x.then(resolve, reject)
	} else {
		resolve(x)
	}
}
