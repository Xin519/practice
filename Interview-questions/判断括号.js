// 字符串是有括号组成，判断内容是否为有效内容

// '()' // true
// ‘({})’ // true
// '[()' // false
// '[(])' // false

// 通过数组的压栈出栈的方式
function brackets(str) {
    const arr = [];
    const map = {
        '{': '}',
        '[': ']',
        '(': ')'
    }
    for(let i = 0, l = str.length; i < l; i++) {
        let s = str[i];
        if(map[s]) {
            arr.push(s);
        }
        else if(map[arr.at(-1)] === s) {
            arr.pop();
        }
    }
    return arr.length === 0;
}

// 字符串中心扩散的方式
function brackets1(str) {
    const map = {
        '{': '}',
        '[': ']',
        '(': ')'
    }
    let tempStr = str;
    for(let i = 0; i < tempStr.length;) {
        let s = tempStr[i];
        let next = tempStr[i + 1];
        if(map[s] === next) {
            tempStr = tempStr.slice(0, i) + tempStr.slice(i + 2);
            i = i > 0 ? i - 1 : 0;
        }
        else {
            i++;
        }
    }
    return tempStr.length === 0;
}

