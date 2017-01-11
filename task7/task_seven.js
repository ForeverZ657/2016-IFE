/*
	全局变量
*/
var previousCountryName=""; //上一次选择的“国家名”
var previousProvinceName=""; //上一次选择的“省名”
var previousCityName=""; //上一次选择的“城市名”

$("#country_sel_btn").click(function(){
	$("#country_list").toggle();	
});

$("#province_sel_btn").click(function(){
	if($("#country").val()!=""){
		$("#province_list").toggle();	
	}
});

$("#city_sel_btn").click(function(){
	if(($("#country").val()!="") && ($("#province").val()!="")){
		$("#city_list").toggle();
	}	
});


$("#country_list li").click(function(){
	var countryName = $(this).text();	
	$("#country").val(countryName);
	$("#country_list").css("display","none");
	
	if(countryName!=previousCountryName){ //如果国家的名字改变，则省份列表中的内容也随之改变
		$("#province").val(""); //清空先前的省份选择结果
		$("#province_list").html("");//清空省份列表
		$("#city").val("");
		$("#city_list").html("");
		
		previousCountryName=countryName;
		
		if(countryName=="中国"){
			$("#province_list").append("<li>四川</li>");	
			$("#province_list").append("<li>江西</li>");	
			$("#province_list").append("<li>江苏</li>");	
		}else if(countryName=="美国"){
			$("#province_list").append("<li>华盛顿州</li>");	
			$("#province_list").append("<li>加利福尼亚州</li>");		
		}else if(countryName=="德国"){
			$("#province_list").append("<li>巴伐利亚州</li>");	
		}
		
		$("#province_list li").click(function(){
			var provinceName = $(this).text();
			$("#province").val(provinceName);	
			$("#province_list").css("display","none");
			
			if(provinceName!=previousProvinceName){
				$("#city").val("");
				$("#city_list").html("");
				
				previousProvinceName=provinceName;
				
				if(provinceName=="四川"){
					$("#city_list").append("<li>成都</li>");	
					$("#city_list").append("<li>资阳</li>");
					$("#city_list").append("<li>乐山</li>");
				}else if(provinceName=="江西"){
					$("#city_list").append("<li>南昌</li>");	
					$("#city_list").append("<li>上饶</li>");
					$("#city_list").append("<li>赣州</li>");	
				}else if(provinceName=="江苏"){
					$("#city_list").append("<li>南京</li>");	
					$("#city_list").append("<li>苏州</li>");
					$("#city_list").append("<li>无锡</li>");	
				}else if(provinceName=="华盛顿州"){
					$("#city_list").append("<li>华盛顿州A</li>");	
					$("#city_list").append("<li>华盛顿州B</li>");
					$("#city_list").append("<li>华盛顿州C</li>");	
				}else if(provinceName=="加利福尼亚州"){
					$("#city_list").append("<li>加利福尼亚州A</li>");	
					$("#city_list").append("<li>加利福尼亚州B</li>");
					$("#city_list").append("<li>加利福尼亚州C</li>");	
				}else if(provinceName=="巴伐利亚州"){
					$("#city_list").append("<li>巴伐利亚州A</li>");	
					$("#city_list").append("<li>巴伐利亚州B</li>");
					$("#city_list").append("<li>巴伐利亚州C</li>");	
				}
				
				$("#city_list li").click(function(){
					var cityName = $(this).text();
					$("#city").val(cityName);	
					$("#city_list").css("display","none");	
				});
			}
		});
	}
});


document.getElementById("carousel_btn_1").addEventListener("mouseover",function(){
	$("#content_fifth .cfdt_2").text("01");/* >是取直接子元素，取所有子元素用空格 */
	$("#content_fifth_description_text_1").fadeIn("fast");
	document.getElementById("content_fifth_description_text_2").style.display="none";
	document.getElementById("content_fifth_description_text_3").style.display="none";
});

document.getElementById("carousel_btn_2").addEventListener("mouseover",function(){	
	$("#content_fifth .cfdt_2").text("02");
	document.getElementById("content_fifth_description_text_1").style.display="none";
	$("#content_fifth_description_text_2").fadeIn("fast");
	document.getElementById("content_fifth_description_text_3").style.display="none";
});

document.getElementById("carousel_btn_3").addEventListener("mouseover",function(){	
	$("#content_fifth .cfdt_2").text("03");
	document.getElementById("content_fifth_description_text_1").style.display="none";
	document.getElementById("content_fifth_description_text_2").style.display="none";
	$("#content_fifth_description_text_3").fadeIn("fast");
});

/*
	选择省份
*/



/*
	onchange事件不响应JS带来的改变，且改变内容并失去焦点后才会触发。
	onpropertychange事件响应JS带来的改变，并且改变的同时实时触发，但是IE专享
	oninput事件不响应JS带来的改变，但实时触发
*/
/*
document.getElementById("country").onchange=function(){ //onchange不响应js带来的改变。并且改变并失去焦点后才触发
	alert(this.value);
}
*/
/*
document.getElementById("country").addEventListener("change",function(){
	alert(this.value);	
});
*/


/*
document.getElementById("country").onpropertychange=function(){ //说是IE专享，但是IE测试无效。Chrome测试也无效。
	alert(this.value);
}
*/
/*
document.getElementById("country").addEventListener("propertychange",function(){ //说是IE专享，但是IE测试无效。Chrome测试也无效。
	alert(this.value);
});
*/


/*
document.getElementById("country").oninput=function(){ //非IE版本的onpropertychange,实时地响应改变并触发，但不响应JS带来的改变
	alert(this.value);
}
*/
/*
document.getElementById("country").addEventListener("input",function(){
	alert(this.value);	
});
*/




