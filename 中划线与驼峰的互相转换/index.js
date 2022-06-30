// 这个其实主要考的是正则和replace方法。

// ‘-’ 转 驼峰
function camelize(str) {
    return (str + '').replace(/-\D/g, function(match) {
        return match.charAt(1).toUpperCase()
    })
}

// 驼峰 转 ‘-’
function hyphenate(str) {
    return (str + '').replace(/[A-Z]/g, function(match) {
        return '-' + match.toLowerCase();
    })
}
