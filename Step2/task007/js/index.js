
var input = document.querySelector("#numInput"),
    buttons = document.querySelector(".buttons"),
    // leftIn = document.querySelector("#left-in"),
    // rightIn = document.querySelector("#right-in"),
    // leftOut = document.querySelector("#left-out"),
    // rightOut = document.querySelector("#right-out"),
    showPane = document.querySelector("#show-pane"),
    numQueue = [];

var showColor = ["rgb(66, 171, 167)","rgb(156, 235, 76)","rgb(228, 96, 153)","rgb(237, 92, 108)"];
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
    if(numQueue.length >= 60) {
        alert("输入超过60个");
    }
    if(value == '') {
        alert("请输入插入数字");
        return 0;
    }
    if(!(/^\d+$/.test(value))) {
        alert("请输入合法数字");
        return 0;
    }
    var num = parseInt(value);
    if(num < 10 || num > 100) {
        alert("限制输入的数字在10-100");
        return 0;
    }

    return 1;
}

function getShowColor(num) {

    if(num < 33) {
        return showColor[0];
    } else if(num < 56) {
        return showColor[1];
    } else if(num < 79) {
        return showColor[2];
    } else if(num < 100) {
        return showColor[3];
    }
}

//鼠标移上去的时候显示提示
function hoverTip(e){
   var detail= e.childNodes[0];
   detail.style.visibility='visible';
}

//鼠标移除时候隐藏信息
function hideTip(e){
   var detail= e.childNodes[0];
   detail.style.visibility='hidden';
}

/**
 * 渲染队列
 */
function renderPane() {
    var showInner = '';
    if(arguments[0] == 2){
        for (var num in numQueue) {
            if (numQueue.hasOwnProperty(num)) {
                showInner += "<div class='queue-item' style='height:" + numQueue[num]*2 + "px;background:" + getShowColor(numQueue[num]) + ";'" +
                    "onmouseover='hoverTip(this)' onmouseout='hideTip(this)'>" +
                    "<div class='itemTip'>" + numQueue[num] + "</div></div>";
            }
        }
    }
    if(arguments[0] == 1) {
        for (var num in numQueue) {
            if (numQueue.hasOwnProperty(num)) {
                showInner += "<div class='queue-item move-left' style='height:" + numQueue[num]*2 + "px;background:" + getShowColor(numQueue[num]) + ";'" +
                    "onmouseover='hoverTip(this)' onmouseout='hideTip(this)'>" +
                    "<div class='itemTip'>" + numQueue[num] + "</div></div>";
            }
        }
    }
    showPane.innerHTML = showInner;
}

/**
 * 4个按钮触发事件
 */
function leftIn(num) {
    numQueue.unshift(num);
    renderPane(2);
}
function rightIn(num) {
    numQueue.push(num);
    renderPane(2);
}
function leftOut(num) {
    numQueue.shift(num);
    renderPane(2);
}
function rightOut(num) {
    numQueue.pop(num);
    renderPane(2);
}

/**
 * 排序
 */
function sort() {
    var numLen = numQueue.length;
    for(var i = 0; i < numLen - 1; i++) {
        for(var j = 0; j < numLen - 1 - i; j++){
            if(numQueue[j] > numQueue[j + 1]) {
                var temp = numQueue[j];
                numQueue[j] = numQueue[j + 1];
                numQueue[j + 1] = temp;
            }
        }
    }
    renderPane(1);
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
                case "sort": sort(); break;
                default: alert("target.id error");
            }
        }
    });
}

initQueue();
