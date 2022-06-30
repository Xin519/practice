//封装一个ajax请求
function ajax(options) {
    //创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()

    //初始化参数的内容
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    const params = options.data

    //发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true)
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true)
        xhr.send(params)
	}
	
    //接收请求 监听
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
}


function myAjax({type, dataType, data, url, success, fail}) {
	const xhr. = new XMLHttpRequest()
	
	type = (type || 'GET').toUpperCase()
	dataType = dataType || 'json'
	
	if(type === 'GET'){
		const obj = Object.entries(data)
		let txt = ''
		if(obj.length > 0){
			for(let i of obj) {
				txt += `${i[0]}=${i[1]}&`
			}
		}
		xhr.open(type, `${url}?${txt}`, true)
		xhr.send(null)
	}else if(type === 'POST'){
		xhr.open(type, url, true)
		xhr.send(data)
	}
	
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4) {
			const status = xhr.status
			if(status>= 200 && status < 300) {
				success && success(xhr.responseText, xhr.responseXML)
			}else{
				fail && fail(xhr)
			}
		}
	}
}

