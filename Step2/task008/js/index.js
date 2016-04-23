
var valueInput = document.querySelector("#numInput"),
    buttons = document.querySelector(".buttons"),
    showPane = document.querySelector("#show-pane"),
    searchInput = document.querySelector("#searchInput"),
    searchBtn = document.querySelector("#search"),
    valueQueue = [];

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
function checkInput(valueArr) {
    if(valueArr.length == 0) {
        alert("请输入有效内容");
        return 0;
    }
    return 1;
}

/**
 * 渲染队列
 */
function renderPane(match) {
    var innerHTML = "";
    valueQueue.forEach(function(num) {
        if(match != null) {
            num = num.replace(new RegExp(match, "g"), "<span class='select'>" + match + "</span>")
        }
        innerHTML += "<div class='queue-item'>" + num + "</div>";
    });
    showPane.innerHTML = innerHTML;
}

/**
 * 4个按钮触发事件
 */
 function leftIn(valueArr) {
     if(checkInput(valueArr)) {
         valueArr.forEach(function(ele) {
             valueQueue.unshift(ele);
         });
         renderPane();
     }
 }
 function rightIn(valueArr) {
     if(checkInput(valueArr)) {
         valueArr.forEach(function(ele) {
             valueQueue.push(ele);
         });
         renderPane();
     }
 }
 function leftOut() {
     var num = valueQueue.shift();
     if(num) {
         alert(num);
         renderPane();
     }
     else
         alert("请先插入，再尝试移出");
 }
 function rightOut() {
     var num = valueQueue.pop();
     if(num) {
         alert(num);
         renderPane();
     }
     else
         alert("请先插入，再尝试移出");
 }

/**
 * 查询按钮事件
 */
function search() {
    var searchText = searchInput.value.trim();
    renderPane(searchText);
}

/**
 * 获得输入的分隔数组
 */
function getInput() {
    return valueInput.value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(value) {
        return value != '';
    });
}

/**
 * 为5个按钮增加点击事件
 */
 function initBtn() {
     addEvent(buttons, "click", function(event) {
         event = getEvent(event);
         var target = getTarget(event),
             valueArr = getInput();
         switch (target.id) {
             case "left-in": leftIn(valueArr); break;
             case "right-in": rightIn(valueArr); break;
             case "left-out": leftOut(); break;
             case "right-out": rightOut(); break;
             case "search": search(); break;
             default: break;
         }
     });
 }
function init() {
    initBtn();
}
init();
