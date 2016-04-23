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
function $(selector) {
    return document.querySelector(selector);
}

/**
 * 构造函数
 */
function MyInput(container) {
    var queue = []; // 爱好，Tag数组
    this.showPane = container.getElementsByClassName("show-pane")[0];


    /**
     * 为容器添加点击事件代理
     */
    this.delegateClickEvent = function() {
        var that = this;
        addEvent(container, "click", function(event) {
            event = getEvent(event);
            var target = getTarget(event),
                hobbyInput = $(".hobbyInput");
            var inputText = hobbyInput.value;
            switch (target.className) {
                case "addBtn":
                queue = that.intoQueue(queue, inputText.trim(), 10);
                that.render(queue);
                that.resetInput(hobbyInput);
                break;

                case "queue-item":
                that.deleteItem(queue, target);
                that.render(queue);
                that.resetInput(hobbyInput);
                break;

                case "delete-info":
                that.deleteItem(queue, target.parentNode);
                that.render(queue);
                that.resetInput(hobbyInput);
            }
        });
    };

    /**
     * 为容器添加按键事件代理
     */
    this.delegateKeyBoardEvent = function() {
        var that = this;
        addEvent(container, "keyup", function(event) {
            event = getEvent(event);
            var target = getTarget(event),
                tagInput = $(".tagInput");
            var inputText = tagInput.value;
            switch (target.className) {
                case "tagInput":
                if(/[,， \n]+/.test(inputText) || event.keyCode == 13) {
                    queue = that.intoQueue(queue, inputText.trim(), 10);
                    that.render(queue);
                    that.resetInput(tagInput);
                }

            }
        });
    },

    /**
     * 初始化
     */
    this.init = function() {
        this.delegateClickEvent();
        this.delegateKeyBoardEvent();
    };
}

/**
 * 原型链方法添加
 */
MyInput.prototype = {
    /**
     * 渲染数组
     */
    render: function(arr) {
        var innerHTML = '';
        arr.forEach(function(ele) {
            innerHTML += "<div class='queue-item'><span class='delete-info'>删除</span>" + ele + "</div>";
        });
        this.showPane.innerHTML = innerHTML;
    },

    /**
     * html字符转义
     */
    htmlConvert: function(inputText) {
        return inputText.replace(/[<>"&]/g, function(match) {
                switch (match) {
    				case '<':
    				return '&lt;';
    				case '>':
    				return '&gt;';
    				case '&':
    				return '&amp;';
    				case '"':
    				return '&quot;';
    			}
            });
    },

    /**
     * 对数组每项进行trim()
     */
    trimArr: function(arr) {
        var newArr = arr.filter(function(ele) {
            return ele;
        });
        return newArr.map(function(ele) {
            return ele.trim();
        });
    },

    /**
     * 按分隔符分隔成数组
     */
    splitInput: function(inputText) {
        inputText = this.htmlConvert(inputText);
        return this.trimArr(inputText.split(/[,，、\s\n]+/g));
    },

    /**
     * 去除重复元素
     */
    checkSame: function(arr) {
        var newQueue = [];
        arr.forEach(function(ele) {
            if(newQueue.indexOf(ele) === -1) {
                newQueue.push(ele);
            }
        });
        return newQueue;
    },

    /**
     * 将输入插入数组
     */
    intoQueue: function(oldQueue, inputText, maxLen) {
        if(!inputText) return oldQueue;
        var newQueue = [],
            arr = oldQueue.concat( this.splitInput(inputText));
        newQueue = this.checkSame(arr);
        if(newQueue.length <= maxLen)
            return newQueue;
        else
            return newQueue.slice(-10, maxLen+1);
    },

    /**
     * 点击元素删除
     */
    deleteItem: function(queue, item) {
        var showItems = this.showPane.children;
		var index = Array.prototype.indexOf.call(showItems, item);
		queue.splice(index, 1);
    },

    /**
     * 重置输入框,并获得焦点
     */
    resetInput: function(inputBox) {
        inputBox.value = '';
        inputBox.focus();
    }

};

/**
 * 生成实例
 */
var hobby =$(".hobbys"),
    tags = $(".tags");
var hobbyBox = new MyInput(hobby);
    tagsBox = new MyInput(tags);
hobbyBox.init();
tagsBox.init();
