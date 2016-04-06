
var input = document.querySelector("#numInput"),
    buttons = document.querySelector(".buttons"),
    showPane = document.querySelector("#show-pane"),
    ranData = document.querySelector("#ranData"),
    timeDelay = 10,  // 动画延迟时间
    ranCount = 50,   // 随机生成数量
    maxValue = 100,   // 随机生成数最大值
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
        return 0;
    }
    if(value == '') {
        alert("请输入插入数字");
        return 0;
    }
    if(!(/^[1-9]+[0-9]*$/.test(value))) {
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
    } else if(num <= 100) {
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
    for (var num in numQueue) {
        if (numQueue.hasOwnProperty(num)) {
            showInner += "<div class='queue-item' style='height:" + numQueue[num]*2 + "px;background:" + getShowColor(numQueue[num]) + ";'" +
                "onmouseover='hoverTip(this)' onmouseout='hideTip(this)'>" +
                "<div class='itemTip'>" + numQueue[num] + "</div></div>";
        }
    }

    showPane.innerHTML = showInner;
}

/**
 * 4个按钮触发事件
 */
function leftIn(num) {
    if(checkInput(num)) {
        numQueue.unshift(num);
        renderPane();
    }
}
function rightIn(num) {
    if(checkInput(num)) {
        numQueue.push(num);
        renderPane();
    }
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
 * 排序
 */
function sort() {
    var numLen = numQueue.length;
    var i = 0, j = 0, time = null;
    time = setInterval(run, timeDelay);
    //for(var i = 0; i < numLen - 1; i++) {
    //    for(var j = 0; j < numLen - 1 - i; j++){
    //        if(numQueue[j] > numQueue[j + 1]) {
    //            var temp = numQueue[j];
    //            numQueue[j] = numQueue[j + 1];
    //            numQueue[j + 1] = temp;
    //        }
    //    }
    //}
    function run() {
        if(i < numLen - 1) {
            if(j < numLen - 1 - i) {
                if(numQueue[j] > numQueue[j + 1]) {
                    var temp = numQueue[j];
                    numQueue[j] = numQueue[j + 1];
                    numQueue[j + 1] = temp;
                    renderPane();
                }
                j++;
            }
            else {
                i++;
                j = 0;
            }
        }
        else {
            clearInterval(time);
            return;
        }
    }
    //renderPane(1);
}
/**
 * 随机生成数据
 */
function initData() {
    numQueue = [];
    var ranNum;
    for(var i = 0; i < ranCount; i++) {
        if(ranCount < 10 || ranCount > 60 || maxValue < 0 || maxValue > 100) {
            alert("random error");
            return;
        }
        ranNum = Math.floor(Math.random()*maxValue+1);
        numQueue.push(ranNum);
    }
    renderPane();
}
/**
 * 为4个按钮增加点击事件
 */
function initBtn() {
    addEvent(buttons, "click", function(event) {
        event = getEvent(event);
        var target = getTarget(event),
            num = input.value.trim();
        switch (target.id) {
            case "left-in": leftIn(num); break;
            case "right-in": rightIn(num); break;
            case "left-out": leftOut(num); break;
            case "right-out": rightOut(num); break;
            case "ranData": initData();break;
            case "sort": sort(); break;
            default: alert("target.id error");
        }

    });
}
function init() {
    initBtn();
    renderPane();
}
init();
