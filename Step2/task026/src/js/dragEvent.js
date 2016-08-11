/**
 * 实现可拖动窗口的抽象函数
 * @param  {dom} dom             拖动的窗体dom
 * @param  {dom} dragPosition    可拖动的补位
 */
function dragFactory(dom, dragPosition) {
    this.dom = dom;
    this.dragPosition = dragPosition;
    this.position = [0, 0]; // 窗体坐标
    this.distance = [0, 0]; // 点击点与窗体坐标距离
    this.draggingControl = false; // 控制是否可拖动
}
dragFactory.prototype = {
    constructor: dragFactory,
    // 判断是否为祖先关系
    isFather: function(p, c2) {
        var c = c2;
        while (c.parentNode) {
            c = c.parentNode;
            if (c == p) return true;
        }
        return false;
    },

    // 设置dom的坐标
    setPosition: function(x, y) {
        this.dom.style.left = x + "px";
        this.dom.style.top = y + "px";
        this.position = [x, y];
    },

    // 窗体设置到右下角
    setBottomRight: function() {
        this.dom.style.right = 'auto';
        this.dom.style.bottom = 'auto';
        this.setPosition(window.innerWidth - this.dom.offsetWidth,
            window.innerHeight - this.dom.offsetHeight);
    },

    // 添加拖动事件
    addEvent: function() {
        var that = this;
        that.dragPosition.style.cursor = "pointer";
        EventUtil.addHandler(this.dragPosition, 'mousedown', function(
            event) {
            var event = EventUtil.getEvent(event);
            that.distance = [
                event.clientX - that.position[0],
                event.clientY - that.position[1]
            ];
            that.draggingControl = true;
        });
        EventUtil.addHandler(window, 'mouseup', function(event) {
            that.draggingControl = false;
        });
        EventUtil.addHandler(window, 'mousemove', function(event) {
            if (that.draggingControl) {
                var event = EventUtil.getEvent(event);
                var w = window.innerWidth - that.dom.offsetWidth;
                var h = window.innerHeight - that.dom.offsetHeight;
                that.position = [
                    event.clientX - that.distance[0],
                    event.clientY - that.distance[1]
                ];
                if (that.position[0] < 0) {
                    that.position[0] = 0
                }
                if (that.position[1] < 0) {
                    that.position[1] = 0;
                }
                if (that.position[0] > w) {
                    that.position[0] = w;
                }
                if (that.position[1] > h) {
                    that.position[1] = h;
                }
                that.setPosition(that.position[0], that.position[
                    1]);
            }
        });
    },

    // 初始化
    init: function() {
        this.dom.position = [
            this.dom.style.left,
            this.dom.style.top
        ];
        this.addEvent();
    }
};
var control = document.querySelector('.controller');
var controlH = document.querySelector('.controller h2');
var c1 = new dragFactory(control, controlH);
c1.init();

var console = document.querySelector('.console');
var consoleH = document.querySelector('.console h2');
var c2 = new dragFactory(console, consoleH);
c2.setBottomRight();
c2.init();
