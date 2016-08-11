(function(window, undefined) {
    var FAILURE_RATE = 0.3; // 发送失败率

    var Mediator = function() {
        var spaceShips = [];
        var commader = null;

        return {
            /**
             * 每个对象需在这里注册，否则无法通讯
             * @param  {[type]} obj [注册对象]
             * @return {} false 注册失败，true 注册成功
             */
            register: function(obj) {
                if(obj instanceof Commander) {
                    commader = obj;
                    obj.mediator = this;
                    ConsoleUtil.show("[系统]：Mediator register" + "Commander" + obj.id);
                    return true;
                } else if(obj instanceof SpaceShip) {
                    obj.mediator = this;
                    spaceShips[obj.id] = obj;
                    ConsoleUtil.show("[系统]：Mediator register" + "SpaceShip" + obj.id);
                    return true;
                }
                ConsoleUtil.show("[系统]：Mediator register" + "failed", false);
                return false;
            },

            /**
             * 发送消息，当发送超过失败率后，对方可以收到数据；有单播和广播两种发送方式
             * @param  {[type]} msg  命令
             * @param  {[type]} from 发送方，可选
             * @param  {[type]} to   接收方，可选
             * @return {[type]}      true 发送成功， false 发送失败
             */
            send: function(msg, from, to) {
                var self = this;
                setTimeout(function() {
                    var success = (Math.random() > FAILURE_RATE) ? true : false;
                    if(sucess) {
                        if(to) {
                            to.reiceive(msg);
                        }
                        else {
                            if(msg.cmd === "launch") {
                                self.create(msg);
                            }
                            for(var ele in spaceships) {
                                if(ele !== from) {
                                    ele.signalSystem.reiceive(msg, from);
                                }
                            }
                        }
                        ConsoleUtil.show("[指挥官" + self.commader.id + "]：" + "发送命令成功", true);
                        return true;
                    }
                    else {
                        ConsoleUtil.show("[指挥官" + self.commader.id + "]：" + "发送命令失败", false);
                        return false;
                    }
                }, 1000);
            },

            /**
             * 创建飞船，并注册到中介
             * @param  {[type]} msg 命令
             * @return {[type]}     true 成功， false 失败
             */
            create: function(msg) {
                if(msg.id === undefined) {
                    var spaceship = new SpaceShip(msg.id);
                    this.register(SpaceShip);
                    ConsoleUtil.show("[指挥官" + self.commader.id + "]：" + "创建飞船" + msg.id + "成功", true);
                    return true;
                }
                else {
                    ConsoleUtil.show("[指挥官" + self.commader.id + "]：" + "该飞船已在轨道", false);
                    return false;
                }
            },

            /**
             * 摧毁飞船，并从注册列表中移除
             * @param  {[type]} obj 摧毁的飞船对象
             * @return {[type]}     true 成功， false 失败
             */
            remove: function(obj) {
                if(obj instanceof SpaceShip) {
                    delete spaceShips[obj.id];
                    ConsoleUtil.show("[指挥官" + self.commader.id + "]：" + "摧毁飞船" + obj.id + "成功", true);
                    return true;
                }
                ConsoleUtil.show("[指挥官" + self.commader.id + "]：" + "摧毁" + obj.id + "失败", false);
                return false;
            }

        };
    };
    window.mediator = Mediator;
})(window);
