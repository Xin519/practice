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

const fn (a, b) => {
	a = a + b
	b = a - b
	a = a - b
	return [a, b]
}

