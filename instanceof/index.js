// 实现一个instanceof操作符
// instanceof是通过原型链来进行判断的
// instanceof操作符是判断原型链来生效的，所以只要你将左边的_proto_和右边的prototype做对比

function myInstance(left, right) {
    // 当left是基础类型的时候直接返回false
    if(typeof left !== 'object' || left === null) return false;
    let proto = Object.getPrototypeOf(left); // 返回指定对象的原型
    while(true) {
        if(proto === null) return false;
        if(proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
