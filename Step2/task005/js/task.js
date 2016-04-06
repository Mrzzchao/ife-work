    /* 数据格式演示
     var aqiSourceData = {
     "北京": {
     "2016-01-01": 10,
     "2016-01-02": 10,
     "2016-01-03": 10,
     "2016-01-04": 10
     }
     };
     */

    var showColor = ["rgb(237, 92, 108)","rgb(156, 235, 76)","rgb(228, 96, 153)","rgb(66, 171, 167)",
                      "rgb(96, 69, 117)","rgb(69, 182, 32)","rgb(80, 44, 245)","rgb(138, 194, 242)"];
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

    var begDate = "2016-01-01";
    // 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }
    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date(begDate);
        var datStr = '';
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

// 用于渲染图表的数据
    var chartData = {};

// 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: "北京",
        nowGraTime: "day"
    };
// 页面元素
    var showPane = document.querySelector(".aqi-chart-wrap"),
        cityTip = document.querySelector("#tip-city"),
        timeTip = document.querySelector("#tip-time"),
        formTime = document.querySelector("#form-gra-time"),
        formCity = document.querySelector("#city-select");
    /**
     * 渲染图表
     */
    function renderChart() {
        var dateType = pageState.nowGraTime,
            cityName = pageState.nowSelectCity,
            showData = chartData[dateType][cityName];
        cityTip.textContent = cityName;
        timeTip.textContent = dateType;
        switch (dateType) {
            case "day": initDayChart(showData);break;
            case "week": initWeekChart(showData);break;
            case "month": initMonthChart(showData);break;
            default: alert("dateType is error!");
        }
    }
    /**
     *  获得随机颜色
     */
    function getShowColor() {
        return showColor[Math.floor((Math.random()*8))];
    }

    /**
     *  显示项目提示
     */
     //鼠标移上去的时候显示提示
    function hoverTip(e){
        var detail= e.childNodes[0];
        detail.style.visibility='visible';
    }

    //鼠标移除时候隐藏信息
    function hideTip(e){
        var detail= e.childNodes[0];
        detail.style.visibility='hidden';
    }

    /**
    * 绘制日数据表
    */
    function initDayChart(showData) {
        var showInner = '';
        var begMonth = begDate.slice(5, 7).match(/[1-9]+/)[0],
            endMonth = Object.keys(showData)[Object.keys(showData).length-1].slice(5, 7).match(/[1-9]+/)[0];
        showInner += "<div class='title'>" + pageState.nowSelectCity + "市" + begMonth + "-" + endMonth + "月 每日空气质量报告</div>";
        for (var key in showData) {
            if (showData.hasOwnProperty(key)) {
                showInner += "<div class='chartDayItem' style='height:" + showData[key] + "px;background:" + getShowColor() + ";'" +
                             "onmouseover='hoverTip(this)' onmouseout='hideTip(this)'>" +
                             "<div class='itemTip dayTip'>" + key + "<br>AQI:" + showData[key] + "</div></div>";
            }
        }
        showPane.innerHTML = showInner;
    }
    /**
     * 绘制周数据表
     */
    function initWeekChart(showData) {
        var showInner = '';
        var begMonth = begDate.slice(5, 7).match(/[1-9]+/)[0],
            endMonth = Object.keys(showData)[Object.keys(showData).length-1].match(/[1-9]+/)[0];
            showInner += "<div class='title'>" + pageState.nowSelectCity + "市" + begMonth + "-" + endMonth + "月 周平均空气质量报告</div>";
        for (var key in showData) {
            if (showData.hasOwnProperty(key)) {
                showInner += "<div class='chartWeekItem' style='height:" + showData[key] + "px;background:" + getShowColor() + ";'" +
                             "onmouseover='hoverTip(this)' onmouseout='hideTip(this)'>" +
                             "<div class='itemTip weekTip'>" + key + "<br>AQI:" + showData[key] + "</div></div>";
            }
        }
        showPane.innerHTML = showInner;
    }

    /**
     * 绘制月数据表
     */
    function initMonthChart(showData) {
        var showInner = '';
        var begMonth = begDate.slice(5, 7).match(/[1-9]+/)[0],
            endMonth = Object.keys(showData)[Object.keys(showData).length-1].match(/[1-9]+/)[0];
            showInner += "<div class='title'>" + pageState.nowSelectCity + "市" + begMonth + "-" + endMonth + "月 月平均空气质量报告</div>";
        for (var key in showData) {
            if (showData.hasOwnProperty(key)) {
                showInner += "<div class='chartMonthItem' style='height:" + showData[key] + "px;background:" + getShowColor() + ";'" +
                             "onmouseover='hoverTip(this)' onmouseout='hideTip(this)'>" +
                             "<div class='itemTip monthTip'>" + key + "<br>AQI:" + showData[key] + "</div></div>";
            }
        }
        showPane.innerHTML = showInner;

    }

    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(selectTime) {
        // 确定是否选项发生了变化
        // 设置对应数据
        // 调用图表渲染函数
        if(pageState.nowGraTime != selectTime) {
            pageState.nowGraTime = selectTime;
            renderChart();
        }

    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange(selectCity) {
        // 确定是否选项发生了变化
        // 设置对应数据
        // 调用图表渲染函数
        pageState.nowSelectCity = selectCity;
        renderChart();
    }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        addEvent(formTime, "click", function(event) {
            event = getEvent(event);
            var target = getTarget(event);
            if(target.nodeName.toLowerCase() === "input")
                graTimeChange.call(null, target.value);
        });
    }

    /**
     * 添加城市下拉框项目
     */
    function createCitySelect() {
        var stInner = Object.getOwnPropertyNames(aqiSourceData).map(function(item) {
            return "<option value='" + item + "'>" + item + "</option>";
        });
        formCity.innerHTML = stInner.join("");
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        createCitySelect();
        addEvent(formCity, "change", function(event) {
            event = getEvent(event);
            var target = getTarget(event);
            citySelectChange.call(null, target.value);
        });

    }

    /**
     * 生成每日数据
     */
    function initDayData (dataObj) {
        return dataObj;
    }

    /**
     * 生成周平均数据
     */
    function initWeekData(dataObj) {
        // var timeArr = Object.getOwnPropertyNames(dataObj),
        var singleWeek = {},
            singleWeekSum = 0, count = 0,
            weekStr = '', weekTh = 0,
            dateTh = 0,
            nowMonth = begDate.slice(5, 7).match(/[1-9]+/)[0], // 初始化第一个单周的月份
            nextMonth = nowMonth,
            dateLen = Object.getOwnPropertyNames(dataObj).length;
        for (var dateStr in dataObj) {
            if (dataObj.hasOwnProperty(dateStr)) {
                var nowWeekDay = (new Date(dateStr)).getDay();
                count++; // 记录单周天数
                dateTh++; // 记录遍历到第几天
                singleWeekSum += dataObj[dateStr];
                // 属于哪个月的单周，由周一决定
                if(dateTh === dateLen) {
                    weekStr = nowMonth + "月，第" + weekTh + "周";
                    singleWeek[weekStr] = Math.round(singleWeekSum/count);
                }
                if(nowWeekDay == 1) {
                    nextMonth = dateStr.slice(5, 7).match(/[1-9]+/)[0];
                }
                if(nowWeekDay === 0) {
                    if(nowMonth !== nextMonth) {
                        nowMonth = nextMonth;
                        weekTh = 0;
                    }
                    weekTh++;
                    weekStr = nowMonth + "月，第" + weekTh + "周";
                    singleWeek[weekStr] = Math.round(singleWeekSum/count);
                    count = 0;
                    singleWeekSum = 0;
                }
            }
        }
        return singleWeek;
    }

    /**
     * 生成月平均数据
     */
    function initMonthData(dataObj) {
        var singleMonthSum = 0,
            singleMonth = {},
            monthStr = '', // 月对象属性名
            dateTh = 0, //
            count = 0, // 记录单个月天数
            dateLen = Object.getOwnPropertyNames(dataObj).length,
            nowMonth = begDate.slice(5, 7).match(/[1-9]+/)[0],
            nextMonth = '';
        for (var dateStr in dataObj) {
            if (dataObj.hasOwnProperty(dateStr)) {
                singleMonthSum += dataObj[dateStr];
                nextMonth = dateStr.slice(5, 7).match(/[1-9]+/)[0];
                dateTh++;
                count++;
                if(nowMonth !== nextMonth) {
                    monthStr = nowMonth + "月";
                    singleMonth[monthStr] = Math.round(singleMonthSum/count);
                    nowMonth = nextMonth;
                    singleMonthSum = 0;
                    count = 0;
                }
                if(dateTh === dateLen) {
                    monthStr = nowMonth + "月";
                    singleMonth[monthStr] = Math.round(singleMonthSum/count);
                }
            }
        }
        return singleMonth;
    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
        var dayData = {},
            weekData = {},
            monthData = {};
        for (var ele in aqiSourceData) {
            var tempData = aqiSourceData[ele];
            if (aqiSourceData.hasOwnProperty(ele)) {
                dayData[ele] = initDayData(tempData);
                weekData[ele] = initWeekData(tempData);
                monthData[ele] = initMonthData(tempData);
            }
        }
        chartData.day = dayData;
        chartData.week = weekData;
        chartData.month = monthData;
        renderChart();
    }

    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm();
        initCitySelector();
        initAqiChartData();
    }
    init();
