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
    var root = $(".root"),        //  根节点
        preBtn = $(".preBtn"),    //  前序
        inBtn = $(".inBtn"),      //  中序
        postBtn = $(".postBtn"),  //  后序
        lowSpeed = 500,          //  低速
        midSpeed = 200,           //  中速
        highSpeed = 100,          //  高速
        treeGo = new TreeTravese();



    addEvent(preBtn, "click", function() {
        treeGo.preOrder(root);
        treeGo.speedSelect(lowSpeed, midSpeed, highSpeed);  // 设置运行速度
        treeGo.animation();
    });

    addEvent(inBtn, "click", function() {
        treeGo.inOrder(root);
        treeGo.speedSelect(lowSpeed, midSpeed, highSpeed);  // 设置运行速度
        treeGo.animation();
    });

    addEvent(postBtn, "click", function() {
        treeGo.postOrder(root);
        treeGo.speedSelect(lowSpeed, midSpeed, highSpeed);  // 设置运行速度
        treeGo.animation();
    });
})();


/**
 * 构造函数
 */
function TreeTravese() {
    this.stack = [];   // 遍历节点数组
    this.speeder = 0;  // 时间延迟
}

/**
 * 防止多次点击动画叠加
 */
TreeTravese.prototype.isShowEnd = true;
/**
 * 前序遍历
 */
TreeTravese.prototype.preOrder = function(node) {
    if(node !== undefined) {
        this.stack.push(node);
        this.preOrder(node.children[0]);
        this.preOrder(node.children[1]);
    }
}
/**
 * 中序遍历
 */
TreeTravese.prototype.inOrder = function(node) {
    if(node !== undefined) {
        this.inOrder(node.children[0]);
        this.stack.push(node);
        this.inOrder(node.children[1]);
    }
}
/**
 * 后序遍历
 */
TreeTravese.prototype.postOrder = function(node) {
    if(node !== undefined) {
        this.postOrder(node.children[0]);
        this.postOrder(node.children[1]);
        this.stack.push(node);
    }
}
/**
 * 速度选择
 */
TreeTravese.prototype.speedSelect = function(lowSpeed, midSpeed, highSpeed) {
    var speed = $(".speed");     //  速度Select
    switch (speed.value) {
        case "low": this.speeder = lowSpeed; break;
        case "mid": this.speeder = midSpeed; break;
        case "high": this.speeder = highSpeed; break;
    }
}
/**
 * 遍历动画
 */
TreeTravese.prototype.animation = function() {
    var index = 0,
        stack = this.stack,
        stackLen = stack.length,
        self = this;
        this.stack = [];

    if(this.isShowEnd == true) {
        this.isShowEnd = false;
        var timer = setInterval(run, this.speeder);

        function run() {
            if(index < stackLen) {
                if(index == 0) {
                    stack[index].style.background = "red";
                }
                else {
                    stack[index-1].style.background = "#fff";
                    stack[index].style.background = "red";
                }
            }
            else {
                self.isShowEnd = true;
                stack[stackLen-1].style.background = "#fff";
                clearInterval(timer);
            }
            index++;
        }
    }
}
