/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var addBtn = document.getElementById("add-btn");
var cityInput = document.getElementById('aqi-city-input');
var airInput = document.getElementById('aqi-value-input');
var table = document.querySelector("#aqi-table");
var reCity = /^[a-zA-Z\u4e00-\u9fa5]+$/;
var reAir = /^[0-9]+$/;
/**
 * [checkInput 检查输入城市是否合法]
 * @return {[Boolean]} [通过：true]
 */
function checkCity(inputValue) {
    if(inputValue == '') {
        alert("请输入城市名称！");
        return false;
    }
    if(!reCity.test(inputValue)) {
        alert("用户输入的城市名必须为中英文字符");
        return false;
    }
    return true;
}

/**
 * [checkAir 检查输入空气是否合格]
 * @return {[Boolean]} [通过：true]
 */
function checkAir(inputValue) {
    if(inputValue == '') {
        alert("请输入空气质量指数！");
        return false;
    }
    if(!reAir.test(inputValue)) {
        alert("空气质量指数必须为整数");
        return false;
    }
    return true;
}


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityName = cityInput.value.trim(),
        airNum = parseInt(airInput.value.trim());
    if(checkCity(cityName) && checkAir(airNum)) {
        aqiData[cityName] = airNum;
    }
}

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
    return event.target || window.srcElement;
}
/**
 * 清除表格
 */
function clearTab() {
    table.innerHTML = '';
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tabInner = "<thead><th>城市</th><th>空气质量</th><th>操作</th></thead>";
    for (var ele in aqiData) {
        if (aqiData.hasOwnProperty(ele)) {
            tabInner += "<tr><td>" + ele + "</td>" + "<td>" + aqiData[ele] + "</td>" + "<td><button data-city='" + ele + "'>删除</button></td></tr>";
        }
    }
    table.innerHTML = aqiData ? tabInner : "";
}


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addEvent(addBtn, "click", addBtnHandle);
    addEvent(table, "click", function(event) {
        event = getEvent(event);
        var target = getTarget(event);
        alert(target.nodeName.toLowerCase());
        if(target.nodeName.toLowerCase() === "button")
            delBtnHandle(target.dataset.city);
        else {
            alert(1);
        }
    });
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
