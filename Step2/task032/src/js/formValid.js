  ;
  (function(window, document, undefined) {
          var Validator = function() {
              this.catch = [];
              this.strategies = {};
              this.isPass = false;
              this.domMsgList = {};
              this.defaultErrorMsg = {};
              this.successMsg = {};
          };

          Validator.prototype = {
                  constructor: Validator,

                  // 验证策略初始化
                  strategiesInit: function() {
                      this.strategies = {
                              // 验证填写或选择
                              required: function(dom, errorMsg) {
                                  if (dom.type === 'radio' || dom.type ===
                                      'checkbox') {
                                      var selects = document.getElementsByName(
                                          dom.name);
                                      for (var k = 0, rlen = selects.length; k <
                                          rlen; k++) {
                                          if (selects[k].checked) {
                                              return;
                                          }
                                      }
                                      this.isPass = false;
                                      return errorMsg;
                                  } else if (dom.value.trim() === '') {
                                      this.isPass = false;
                                      if (this.domMsgList[dom.name]) {
                                          this.domMsgList[dom.name][
                                                  'required'
                                              ] = errorMsg ? errorMsg :
                                              this.defaultErrorMsg[
                                                  'required'];
                                      }
                                      return errorMsg;
                                  }
                              },
                              // 验证最小长度
                              minLength: function(dom, length, errorMsg) {
                                  if (dom.value.trim().length < length) {
                                      this.isPass = false;
                                      if (this.errorMsg[dom.name]) {
                                          this.errorMsg[dom.name][
                                                  'required'
                                              ] = errorMsg ? errorMsg :
                                              this.defaultErrorMsg[
                                                  'required'];
                                      }
                                      return errorMsg;
                                  }
                              },
                              // 验证最大长度
                              maxLength: function(dom, length, errorMsg) {
                                  if (dom.value.trim().length > length) {
                                      this.isPass = false;
                                      if (this.errorMsg[dom.name]) {
                                          this.errorMsg[dom.name][
                                                  'required'
                                              ] = errorMsg ? errorMsg :
                                              this.defaultErrorMsg[
                                                  'required'];
                                      }
                                      return errorMsg;
                                  }
                              },
                              // 验证长度范围
                              rangeLength: function(dom, minLength,
                                  maxLength,
                                  errorMsg) {
                                  if (dom.value.trim().length <
                                      minLength ||
                                      dom.value.length > length) {
                                      this.isPass = false;
                                      if (this.errorMsg[dom.name]) {
                                          this.errorMsg[dom.name][
                                                  'required'
                                              ] = errorMsg ? errorMsg :
                                              this.defaultErrorMsg[
                                                  'required'];
                                      }
                                      return errorMsg;
                                  }
                              },
                              // 验证手机号
                              mobile: function(dom, errorMsg) {
                                  if (!
                                      /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/
                                      .test(dom.value.trim())) {
                                      this.isPass = false;
                                      if (this.errorMsg[dom.name]) {
                                          this.errorMsg[dom.name][
                                                  'required'
                                              ] = errorMsg ? errorMsg :
                                              this.defaultErrorMsg[
                                                  'required'];
                                      }
                                      return errorMsg;
                                  }
                              },
                              // 验证固定电话
                              phone: function(dom, errorMsg) {
                                  if (!/(\d{3}-d{8})|(\d{4}-\d{7})/.test(
                                          dom.value.trim())) {
                                      this.isPass = false;
                                      if (this.errorMsg[dom.name]) {
                                          this.errorMsg[dom.name][
                                                  'required'
                                              ] = errorMsg ? errorMsg :
                                              this.defaultErrorMsg[
                                                  'required'];
                                      }
                                      return errorMsg;
                                  }
                              },
                              // 验证邮箱
                              email: function(dom, errorMsg) {
                                  if (!/^(\w)+(\.\w)*@(\w)+((\.\w+)+)$/)
                                      .test(
                                          dom.value.trim())) {
                                  this.isPass = false;
                                  if (this.errorMsg[dom.name]) {
                                      this.errorMsg[dom.name][
                                              'required'
                                          ] =
                                          errorMsg ? errorMsg : this.defaultErrorMsg[
                                              'required'];
                                  }
                                  return errorMsg;
                              }
                          },
                          // 验证qq
                          qq: function(dom, errorMsg) {
                              if (!/[1-9][0-9]{4,}/.test(dom.value.trim())) {
                                  this.isPass = false;
                                  if (this.errorMsg[dom.name]) {
                                      this.errorMsg[dom.name]['required'] =
                                          errorMsg ? errorMsg : this.defaultErrorMsg[
                                              'required'];
                                  }
                                  return errorMsg;
                              }
                          },
                          // 验证身份证
                          idCard: function(dom, errorMsg) {
                              if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(
                                      dom.value.trim())) {
                                  this.isPass = false;
                                  if (this.errorMsg[dom.name]) {
                                      this.errorMsg[dom.name]['required'] =
                                          errorMsg ? errorMsg : this.defaultErrorMsg[
                                              'required'];
                                  }
                                  return errorMsg;
                              }
                          },
                          // 验证ip地址
                          ip: function(dom, errorMsg) {
                              if (!
                                  /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/
                                  .test(dom.value.$.trim())) {
                                  this.isPass = false;
                                  if (this.errorMsg[dom.name]) {
                                      this.errorMsg[dom.name]['required'] =
                                          errorMsg ? errorMsg : this.defaultErrorMsg[
                                              'required'];
                                  }
                                  return errorMsg;
                              }
                          }
                  };

              },

              // 默认错误提示
              errorInit: function() {
                  this.defaultErrorMsg = {
                      required: "必填项",
                      minLength: "输入必须大于最小长度",
                      maxLength: "输入必须小于最大长度",
                      rangeLength: "输入必须在长度范围内",
                      mobile: "手机号格式不合法",
                      phone: "固定电话格式不合法",
                      email: "电子邮箱格式不合法",
                      qq: "QQ号格式不合法",
                      idCard: "身份证格式不合法",
                      ip: "ip地址格式不合法"
                  };
              },

              // 初始化
              init: function() {
                  this.strategiesInit();
                  this.errorInit();
              },

              add: function(dom, rules) {
                  var self = this;
                  for (var i = 0, rule; rule = rules[i++];) {
                      (function(rule) {
                          var strategyAry = rule.strategy.split(':');
                          var errorMsg = rule.errorMsg;
                          self.cache.push(function() {
                              var strategy = strategyAry.shift();
                              strategyAry.unshift(dom.value);
                              strategyAry.push(errorMsg);
                              return this.strategies[strategy].apply(
                                  dom,
                                  strategyAry);
                          });
                      })(rule)
                  }
              },

              // 验证全部表单控件
              validate: function() {
                  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
                      validatorFunc();
                      if (!this.isPass) {
                          return false;
                      }
                  }
                  return true;
              }
      }

      function init() {

      }


      //注册命名空间FF
      var FF = {}; FF.init = init; FF.validate =
      w['FF'] = FF;


  })(window, document)
