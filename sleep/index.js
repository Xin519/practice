// sleep函数实现的途径有很多，promise，async/await等等。
// promise API sleep
// 延时等待

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, time)
    })
}
