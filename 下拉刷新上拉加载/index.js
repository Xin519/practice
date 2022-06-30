// scrollTop：滚动视窗的高度距离window顶部的距离，它会随着往上滚动而不断增加，初始值是0，它是一个变化的值
// clientHeight:它是一个定值，表示屏幕可视区域的高度；
// scrollHeight：页面不能滚动时是不存在的，body长度超过window时才会出现，所表示body所有元素的长度

// scrollTop + clientHeight >= scrollHeight

let clientHeight  = document.documentElement.clientHeight; //浏览器高度
let scrollHeight = document.body.scrollHeight;
let scrollTop = document.documentElement.scrollTop;
 
let distance = 50;  //距离视窗还用50的时候，开始触发；

if ((scrollTop + clientHeight) >= (scrollHeight - distance)) {
    console.log("开始加载数据");
}


// 下拉刷新
// 监听原生touchstart事件，记录其初始位置的值，e.touches[0].pageY；
// 监听原生touchmove事件，记录并计算当前滑动的位置值与初始位置值的差值，大于0表示向下拉动，并借助CSS3的translateY属性使元素跟随手势向下滑动对应的差值，同时也应设置一个允许滑动的最大值；
// 监听原生touchend事件，若此时元素滑动达到最大值，则触发callback，同时将translateY重设为0，元素回到初始位置

// <main>
//     <p class="refreshText"></p>
//     <ul id="refreshContainer">
//         <li>111</li>
//         <li>222</li>
//         <li>333</li>
//         <li>444</li>
//         <li>555</li>
//         ...
//     </ul>
// </main>

// 监听touchstart事件，记录初始的值
var _element = document.getElementById('refreshContainer'),
    _refreshText = document.querySelector('.refreshText'),
    _startPos = 0,  // 初始的值
    _transitionHeight = 0; // 移动的距离

_element.addEventListener('touchstart', function(e) {
    _startPos = e.touches[0].pageY; // 记录初始位置
    _element.style.position = 'relative';
    _element.style.transition = 'transform 0s';
}, false);

// 监听touchmove移动事件，记录滑动差值
_element.addEventListener('touchmove', function(e) {
    // e.touches[0].pageY 当前位置
    _transitionHeight = e.touches[0].pageY - _startPos; // 记录差值

    if (_transitionHeight > 0 && _transitionHeight < 60) { 
        _refreshText.innerText = '下拉刷新'; 
        _element.style.transform = 'translateY('+_transitionHeight+'px)';

        if (_transitionHeight > 55) {
            _refreshText.innerText = '释放更新';
        }
    }                
}, false);

// 监听touchend离开的事件
_element.addEventListener('touchend', function(e) {
    _element.style.transition = 'transform 0.5s ease 1s';
    _element.style.transform = 'translateY(0px)';
    _refreshText.innerText = '更新中...';
    // todo...

}, false);
