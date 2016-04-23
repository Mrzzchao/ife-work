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

function $(selector) {
    return document.querySelector(selector);
}


/**
 * 执行
 */
(function() {
    var root = $(".root"), //  根节点
        depBtn = $(".depBtn"), //  深度遍历
        breadBtn = $(".breadBtn"), //  广度遍历
        domText = $(".domText"), //  节点文本
        lowSpeed = 500, //  低速
        midSpeed = 200, //  中速
        highSpeed = 100, //  高速
        treeGo = new TreeTravese(); // 构造对象


    // 深度遍历
    addEvent(depBtn, "click", function() {
        treeGo.depOrder(root);
        treeGo.speedSelect(lowSpeed, midSpeed, highSpeed); // 设置运行速度
        treeGo.animation(domText);
    });

    // 广度遍历
    addEvent(breadBtn, "click", function() {
        treeGo.breadOrder(root);
        treeGo.speedSelect(lowSpeed, midSpeed, highSpeed); // 设置运行速度
        treeGo.animation(domText);
    });
})();


/**
 * 构造函数
 */
function TreeTravese() {
    this.stack = []; // 遍历节点数组
    this.speeder = 0; // 时间延迟
}

/**
 * 防止多次点击动画叠加
 */
TreeTravese.prototype.isShowEnd = true;

/**
 * 深度遍历
 */
TreeTravese.prototype.depOrder = function(node) {
    if (node !== undefined) {
        this.stack.push(node);
        var children = node.children;
        for (var i = 0, len = children.length; i < len; i++) {
            this.depOrder(children[i]);
        }
    }
}

/**
 * 广度遍历
 */
TreeTravese.prototype.breadOrder = function(node) {
    var fifo = [];
    if (node.className === "root") {
        this.stack.push(node);
        fifo = fifo.concat([].slice.call(node.children));
    }
    while (fifo && fifo.length > 0) {
        var ele = fifo.shift();
        this.stack.push(ele);

        if (ele && ele.children)
            fifo = fifo.concat([].slice.call(ele.children));
    }
}

/**
 * 查询输入的文本所在节点
 */
TreeTravese.prototype.searchText = function(domText) {
    var keyWord = domText.value.trim();
    var that = this;
    if (keyWord) {
        this.stack.forEach(function(ele) {
            if (keyWord == ele.firstChild.nodeValue.trim()) {
                ele.isSelected = true;
            } else {
                ele.isSelected = false;
            }
        });
    }
}

// 将节点背景色全部变白
TreeTravese.prototype.renderAll = function() {
    this.stack.forEach(function(ele) {
        ele.style.background = "#fff";
    });
}

/**
 * 速度选择
 */
TreeTravese.prototype.speedSelect = function(lowSpeed, midSpeed, highSpeed) {
    var speed = $(".speed"); //  速度Select
    switch (speed.value) {
        case "low":
            this.speeder = lowSpeed;
            break;
        case "mid":
            this.speeder = midSpeed;
            break;
        case "high":
            this.speeder = highSpeed;
            break;
    }
}

/**
 * 遍历动画
 */
TreeTravese.prototype.animation = function() {
    this.renderAll();
    var index = 0,
        stack = this.stack,
        stackLen = stack.length,
        self = this;

    if (this.isShowEnd == true) {
        this.isShowEnd = false;
        var isFound = false; // 判断是否找到
        var isSearch = false; // 判断是否查询
        var timer = setInterval(run, this.speeder);

        if (arguments[0].value) {
            this.searchText(arguments[0]);
            isSearch = true;
        }

        function run() {
            if (index < stackLen) {
                if (index == 0) {
                    stack[index].style.background = "red";
                } else {
                    if (!stack[index - 1].isSelected)
                        stack[index - 1].style.background = "#fff";
                    else
                        isFound = true;
                    stack[index].style.background = "red";
                }
            } else {
                self.isShowEnd = true;
                if (!stack[index - 1].isSelected)
                    stack[index - 1].style.background = "#fff";
                else
                    isFound = true;
                clearInterval(timer);
                if (!isFound && isSearch) {
                    alert("不好意思，您查询的关键字没找到");
                }
            }
            index++;
        }
    }

    this.stack = [];
}
