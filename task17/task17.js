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
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = { //各个城市每日的空气质量
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

var aqiDataPerWeek={}; //各个城市每周的空气质量

var aqiDataPerMonth={}; //各个城市每月的空气质量

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var cityNameSel=document.getElementById("city-select");
  var cityName=cityNameSel.options[pageState.nowSelectCity].text; //城市名称
  var graTime=pageState.nowGraTime; //时间粒度

  var aqi_chart_wrap=document.getElementById("aqi-chart-wrap"); //图表容器
  aqi_chart_wrap.innerHTML="";

  var curData;
  var part_class;
  switch(graTime){
    case "day":
      curData=aqiSourceData; //对象可以直接赋值给另一个对象
      part_class="part-day";
      break;
    case "week":
      curData=aqiDataPerWeek;
      part_class="part-week";
      break;
    case "month":
      curData=aqiDataPerMonth;
      part_class="part-month";
      break;
  }

  var clrs=[ //用于填充直方图的颜色数组
      "#FC0404",
      "#820CF5",
      "#09DDF8",
      "#000000",
      "#FAF305",
      "#FE18F7",
      "#7B7B7A",
      "#9F5582",
      "#A6B46B",
      "#832E24"
    ];

  var cityData=curData[cityName]; //取出当前城市对应时间粒度的空气质量数据

  for(var oneGraData in cityData){ //遍历时间粒度数据
    var oneAqi=cityData[oneGraData]; 
    var part=document.createElement("div");
    part.className=part_class;
    part.style.height=Math.round(oneAqi);
    part.setAttribute("title",oneGraData+":"+Math.round(oneAqi));
    part.style.background=clrs[Math.floor(Math.random()*10)];
    aqi_chart_wrap.appendChild(part);
  }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  var gra_radios=document.getElementsByName("gra-time"); //选择时间粒度的按钮组

  var sel_gra_time; //用户选择的时间粒度
  for(var i=0;i<gra_radios.length;i++){
    if(gra_radios[i].checked){
      sel_gra_time=gra_radios[i].value;
    }
  }

  var cur_gra_time=pageState.nowGraTime;//当前的时间粒度

  if(sel_gra_time==cur_gra_time){ //时间粒度并没有改变则不作处理
    return;
  }
  // 设置对应数据
  pageState.nowGraTime=sel_gra_time;//时间粒度发生改变则更新当前的时间粒度
  // 调用图表渲染函数
  if(pageState.nowSelectCity!=-1){
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 此处选项肯定发生了变化
  // 设置对应数据
  var citySelect=document.getElementById("city-select");
  
  pageState.nowSelectCity=citySelect.selectedIndex; //更新下拉列表中被选中项的索引
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var gra_radios=document.getElementsByName("gra-time");//得到选择时间粒度的单选按钮
  //gra_radios.onclick=graTimeChange; 错误。不能试图将一个数组中的所有元素一次性注册同一个事件；需要
  //一个元素一个元素地注册事件
  for(var i=0;i<gra_radios.length;i++){
    gra_radios[i].onclick=graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect=document.getElementById("city-select"); //城市下拉列表
  citySelect.innerHTML="";//清空城市列表，然后重新添加
  for(var cityName in aqiSourceData){ //用for in 可以遍历对象中所有的“键”
    var opt=document.createElement("option");
    var opt_txt=document.createTextNode(cityName);
    opt.appendChild(opt_txt);
    citySelect.appendChild(opt);
  }
  if(citySelect.options.length>0){
    pageState.nowSelectCity=0;
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange=citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式

  //空气质量按月统计
  for(var cityName in aqiSourceData){
    if(!(aqiDataPerMonth.hasOwnProperty(cityName))){
      aqiDataPerMonth[cityName]={};
    }
    
    for(var cityAqiDataDate in aqiSourceData[cityName]){
      var month=cityAqiDataDate.substring(0,7); //取出年月部分的日期
      if(!(aqiDataPerMonth[cityName].hasOwnProperty(month))){
        aqiDataPerMonth[cityName][month]=aqiSourceData[cityName][cityAqiDataDate];
      }else{
        aqiDataPerMonth[cityName][month]=(aqiDataPerMonth[cityName][month]+
          aqiSourceData[cityName][cityAqiDataDate])/2;
      }
    }
  }

  //空气质量按周统计
  for(var cityName in aqiSourceData){
    if(!(aqiDataPerWeek.hasOwnProperty(cityName))){
      aqiDataPerWeek[cityName]={};
    }
    for(var cityAqiDataDate in aqiSourceData[cityName]){
      var month=cityAqiDataDate.substring(0,7);
      var dayOfMonth=parseInt(cityAqiDataDate.substring(cityAqiDataDate.lastIndexOf("-")+1));
      var key_week="";
      switch(true){ //JavaScript中switch做比较判断必须写成switch(true);否则只能做相等判断。
        case dayOfMonth>=1 && dayOfMonth<=7:
          key_week=month+"-第1周";
          break;
        case dayOfMonth>=8 && dayOfMonth<=14:
          key_week=month+"-第2周";
          break;
        case dayOfMonth>=15 && dayOfMonth<=21:
          key_week=month+"-第3周";
          break;
        case dayOfMonth>=22 && dayOfMonth<=28:
          key_week=month+"-第4周";
          break;
        case dayOfMonth>=29 && dayOfMonth<=31:
          key_week=month+"-第5周";
          break;
      }
      if(aqiDataPerWeek[cityName].hasOwnProperty(key_week)){
        aqiDataPerWeek[cityName][key_week]=(aqiDataPerWeek[cityName][key_week]+
          aqiSourceData[cityName][cityAqiDataDate])/2;
      }else{
        aqiDataPerWeek[cityName][key_week]=aqiSourceData[cityName][cityAqiDataDate];
      }
    }
  }

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
