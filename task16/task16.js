/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {}; //每个城市的空气质量数据都是对象中的一个键值对

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var aqi_city=document.getElementById("aqi-city-input"); 
	var aqi_value=document.getElementById("aqi-value-input");

	var str_aqi_city=aqi_city.value; //城市名称
	var str_aqi_value=aqi_value.value; //城市空气质量

	//利用正则表达式去除字符串前后的空白字符
	str_aqi_city=str_aqi_city.replace(/(^\s*)|(\s*$)/g,"");
	str_aqi_value=str_aqi_value.replace(/(^\s*)|(\s*$)/g,"");

	if(str_aqi_city==""||str_aqi_value==""){
		alert("请确保\"城市名\"和\"空气质量\"都不为空");
		return false;
	}

	//向对象中添加一条键值对，表示某个城市的空气质量
	aqiData[str_aqi_city]=str_aqi_value; //如果写成aqiData.str_aqi_city则键就为"str_aqi_city"，而不是
	//对应的城市名称了
	
	//添加数据成功，则将文本框中的内容置为空，准备下一次输入
	aqi_city.value="";
	aqi_value.value="";

	return true; //添加数据成功
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

	var aqi_table=document.getElementById("aqi-table");
	aqi_table.innerHTML=""; //每次渲染都是重新渲染

	var row1=document.createElement("tr");

	var col11=document.createElement("td");
	var col11_txt=document.createTextNode("城市");
	col11.appendChild(col11_txt);
	row1.appendChild(col11);

	var col12=document.createElement("td");
	var col12_txt=document.createTextNode("空气质量");
	col12.appendChild(col12_txt);
	row1.appendChild(col12);

	var col13=document.createElement("td");
	var col13_txt=document.createTextNode("操作");
	col13.appendChild(col13_txt);
	row1.appendChild(col13);

	aqi_table.appendChild(row1); //表头

	for(var key in aqiData){ //遍历对象中的键值对中的所有的键
		var row=document.createElement("tr");

		var col_first=document.createElement("td");
		col_first.className="table_city_name";
		var col_first_txt=document.createTextNode(key);
		col_first.appendChild(col_first_txt);
		row.appendChild(col_first);

		var col_second=document.createElement("td");
		col_second.className="table_city_aqi";
		var col_second_txt=document.createTextNode(aqiData[key]);
		col_second.appendChild(col_second_txt);
		row.appendChild(col_second);

		var col_third=document.createElement("td");
		var col_third_elem=document.createElement("button");
		col_third_elem.className="del_btn"; //本例中不是必须的
		var col_third_elem_txt=document.createTextNode("删除");
		col_third_elem.appendChild(col_third_elem_txt);
		col_third.appendChild(col_third_elem);
		row.appendChild(col_third);

		col_third_elem.onclick=delBtnHandle;//点击“删除”按钮进行删除操作

		aqi_table.appendChild(row);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  if(addAqiData()){ //添加数据成功了才有必要重新渲染；如果因为字段为空，添加数据到对象失败，
  	//则没有必要重新渲染
  	renderAqiList();
  }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var cur_tr=this.parentNode.parentNode; //要删除的行

  var del_city_name; //被删除的行对应的城市的名称

  for(var i=0;i<cur_tr.childNodes.length;i++){
  	var cur_childNode=cur_tr.childNodes[i];
  	if("TD"==cur_childNode.nodeName && "table_city_name"==cur_childNode.className){
  		del_city_name=cur_childNode.innerHTML;
  		break;
  	}
  }

  delete aqiData[del_city_name]; //用delete关键字删除对象中某个键对应的键值对

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add_btn=document.getElementById("add-btn"); //"确认添加按钮"
  add_btn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
}

init();