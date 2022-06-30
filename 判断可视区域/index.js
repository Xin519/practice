// 在日常开发中，我们经常需要判断目标元素是否在视窗之内或者和视窗的距离小于一个值（例如 100 px），从而实现一些常用的功能，例如：

// 图片的懒加载
// 列表的无限滚动
// 计算广告元素的曝光情况
// 可点击链接的预加载

// offsetTop、scrollTop
function isInViewPortOfOne (el) {
    // viewPortHeight 兼容所有浏览器写法
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}

// getBoundingClientRect
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  );
}

// Intersection Observer
const options = {
  // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
  // 1 表示完全被包含
  threshold: 1.0, 
  root:document.querySelector('#scrollArea') // 必须是目标元素的父级元素
};

const callback = function(entries, observer) { 
    entries.forEach(entry => {
        entry.time;               // 触发的时间
        entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
        entry.boundingClientRect; // 被观察者的位置举行
        entry.intersectionRect;   // 重叠区域的位置矩形
        entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
        entry.target;             // 被观察者
    });
};

const observer = new IntersectionObserver(callback, options);
