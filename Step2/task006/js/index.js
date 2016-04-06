
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
 function leftOut() {
     var num = numQueue.shift();
     if(num) {
         alert(num);
         renderPane();
     }
     else
         alert("请先插入，再尝试移出");
 }
 function rightOut() {
     var num = numQueue.pop();
     if(num) {
         alert(num);
         renderPane();
     }
     else
         alert("请先插入，再尝试移出");
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
             case "left-out": leftOut(); break;
             case "right-out": rightOut(); break;
             default: alert("target.id error");
         }
     });
 }
function init() {
    initBtn();
}
init();
