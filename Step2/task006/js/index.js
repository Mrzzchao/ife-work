
var input = document.querySelector("#numInput"),
    buttons = document.querySelector(".buttons"),
    // leftIn = document.querySelector("#left-in"),
    // rightIn = document.querySelector("#right-in"),
    // leftOut = document.querySelector("#left-out"),
    // rightOut = document.querySelector("#right-out"),
     showPane = document.querySelector("#show-pane"),
    numQueue = [];

/**
* IE事件兼容
*/
function addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
function getEvent(event) {
    return event ? event : window.event;
}
function getTarget(event) {
    return event.target || event.srcElement;
}

/**
 * 检查输入合法
 */
function checkInput(value) {
    if(value == '') {
        alert("请输入插入数字");
        return 0;
    }
    if(!(/^\d+$/.test(value))) {
        alert("请输入合法数字");
        return 0;
    }
    return 1;
}

/**
 * 渲染队列
 */
function renderPane() {
    var innerHTML = "";
    numQueue.forEach(function(num) {
        innerHTML += "<div class='queue-item'>" + num + "</div>";
    });
    showPane.innerHTML = innerHTML;
}

/**
 * 4个按钮触发事件
 */
function leftIn(num) {
    numQueue.unshift(num);
    renderPane();
}
function rightIn(num) {
    numQueue.push(num);
    renderPane();
}
function leftOut(num) {
    numQueue.shift(num);
    renderPane();
}
function rightOut(num) {
    numQueue.pop(num);
    renderPane();
}

/**
 * 为4个按钮增加点击事件
 */
function initQueue() {
    addEvent(buttons, "click", function(event) {
        event = getEvent(event);
        var target = getTarget(event),
            num = input.value.trim();
        if(checkInput(num)) {
            switch (target.id) {
                case "left-in": leftIn(num); break;
                case "right-in": rightIn(num); break;
                case "left-out": leftOut(num); break;
                case "right-out": rightOut(num); break;
                default: alert("target.id error");
            }
        }
    });
}

initQueue();
