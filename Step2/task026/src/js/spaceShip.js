(function(window, undefined) {
    var STOP = 0,     // 停止
        FLY = 1,      // 飞行
        DESTROY = 2;  // 摧毁

    var SPACESHIP_SPEED = 2;   // 飞行速度
    var CHRGE_RATE = 0.3;      // 充电速度
    var DISCHARGE_RATE = 0.5;  // 放点速度

    var flyTimerId = [],       // 飞行定时器标志
        chargeTimerId = [],    // 充电定时器标志
        dischargeTimerId = []; // 放电定时器标志

    /**
     * 飞船类
     */
    var SpaceShip = function(id) {
        this.id = id;
        this.power = 100;     // 飞船电量，初始为100
        this.currstate = STOP;    // 飞船状态
        this.deg = 0;         // 飞船转过的角度
        this.mediator = null   // 注册的传播中介
    }

    /**
     * 动力系统，可以完成飞行和停止飞行两个行为
     */
    SpaceShip.prototype.dynamicalSystem = function() {
        var self = this;
        var shipId = this.id;

        // 飞行
        var fly = function() {
            flyTimerId[shipId] = setInterval(function() {
                self.deg += SPACESHIP_SPEED;
                if(self.deg > 360)
                    self.deg = 0;
            }, 20);
        };

        // 停止
        var stop = function() {
            clearInterval(flyTimerId[shipId]);
        };

        return {
            fly: fly,
            stop: stop
        };
    };

    /**
     * 能源系统，提供能源，并且在宇宙中通过太阳能充电
     */
    SpaceShip.prototype.powerSystem = function() {
        var self = this;
        var shipId = this.id;

        // 充电
        var charge = function() {
            chargeTimerId[shipId] = setInterval(function() {
                if(self.currstate === FLY || self.currstate === DESTROY) {
                    clearInterval(chargeTimerId[shipId]);
                    return false;
                }
                if(self.power > 100) {
                    self.power = 100;
                    clearInterval(chargeTimerId[shipId]);
                    return false;
                }
                self.power += CHARGE_RATE;
                return true;

            }, 20);

        };

        // 放电
        var discharge = function() {
            dischargeTimerId[shipId] = setInterval(function() {
                if(self.currstate === STOP) {
                    clearInterval(dischargeTimerId[shipId]);
                    return false;
                }
                if(self.power < 0) {
                    self.power = 0;
                    clearInterval(dischargeTimerId[shipId]);
                    return false;
                }
                self.power -= DISCHARGE_RATE;
                return true;
            }, 20);

        };

        return {
            charge: charge,
            discharge: discharge
        };

    };

    /**
     * 管理状态执行方法
     * @return {[type]} [description]
     */
    SpaceShip.prototype.stateManager = function() {
        var self = this;

        // 飞船状态执行方法
        var states = {
            fly: function() {
                self.currstate = FLY;
                self.dynamicalSystem.fly();
                self.powerSystem.discharge();
            },
            stop: function() {
                self.currstate = STOP;
                self.dynamicalSystem.stop();
                self.powerSystem.charge();
            },
            destroy: function() {
                self.currstate = DESTROY;
                self.mediator.remove(self);
            }
        };

        // 状态改变时的执行方法
        var changeState = function(state) {
            states[state] && states[state]();
        };

        return {
            changeState: changeState
        };

    };

    /**
     * 信号系统
     * @param  {Object} msg 传输的信息
     * @return {Object}     一个接收信号的方法
     */
    SpaceShip.prototype.signalSystem = function(msg) {
        var self = this;
        return {
            reiceive: function(msg) {
                if(msg.id === self.id && msg.cmd != self.currstate)
                    self.stateManager.changeState(msg.cmd);
            }
        };
    };

    // 把飞船类添加到全局对象中
    window.SpaceShip = SpaceShip;
})(window);
