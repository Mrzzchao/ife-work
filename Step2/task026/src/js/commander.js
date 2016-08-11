(function(window, undefined) {
    /**
    * 指挥官对象
    */
    var Commander = function() {
        this.id = "MChao";   // 指挥官
        this.cmds = [];      // 记录操作日志
        this.mediator = null // 中介对象
    };

    Commander.prototype.send = function(msg) {
        this.mediator.send(msg);
        this.cmds.push(msg);
    };

    window.Commander = Commander;
})(window);
