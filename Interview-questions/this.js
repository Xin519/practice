var name = 'leaf'

function main() {
	var name = 'main'
	var obj = {}
	console.log(this) // this 指向 window
	obj.name = 'LEAF'
	obj.info = function() {
		console.log(this)
		console.log(this.name)
		console.log(name) // 指向 var 声明的 name
	}
	return obj
}

var foo = main()
foo.info() // this 指向 obj
