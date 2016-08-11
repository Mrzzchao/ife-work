(function(window, undefined) {
    var ConsoleUtil = function(dom) {
        this.msgArr = [];
        this.dom = dom;
    };

    return {
        /**
         * 在控制面板显示命令信息
         * @return {[type]}
         */
        show: function() {
            var message = arguments.shift();  // 显示信息
            var success = arguments.shift();  // 信息标志
            var msg = document.createElement("p");
            var frag = document.createDocumentFragment();
            msg.innerHTML = message;
            if(success !== "undefined") {
                if(success) {
                    msg.className = "success";
                }
                else {
                    msg.className = "failed";
                }
            }
            if(msgArr.length > 10) {
                msgArr.shift();
            }

            for(var i = 0; i < msgArr.length; i++) {
                frag.appendChild(msgArr[i]);
            }
            this.dom.innerHTML = "";
            this.dom.appendChild(frag);
        }
    };

    window.ConsoleUtil = ConsoleUtil;
})(window);
