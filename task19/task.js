var arr=[20,30,10,70,50];
(function(){
	render();

	var left_in_btn=document.getElementById("left_in");
	var right_in_btn=document.getElementById("right_in");

	var left_out_btn=document.getElementById("left_out");
	var right_out_btn=document.getElementById("right_out");

	var asc_sort_btn=document.getElementById("asc_sort");
	var desc_sort_btn=document.getElementById("desc_sort");

	left_in_btn.onclick=function(){
		if(arr.length==60){
			alert("队列元素数量最多限制为60个");
			return;
		}
		var str_num=(document.getElementById("num")).value;
		str_num=str_num.replace(/(^\s*)|(\s*$)/g,"");
		var num=parseInt(str_num);
		if(Number.isInteger(num) && num>=10 && num<=100){
			arr.unshift(num);//在数组的开头添加一个或多个元素
			render();
		}else{
			alert("请输入10-100之间的整数");
			(document.getElementById("num")).value="";
			return;
		}
	}

	right_in_btn.onclick=function(){
		if(arr.length==60){
			alert("队列元素数量最多限制为60个");
			return;
		}
		var str_num=(document.getElementById("num")).value;
		str_num=str_num.replace(/(^\s*)|(\s*$)/g,"");
		var num=parseInt(str_num);
		if(Number.isInteger(num) && num>=10 && num<=100){
			arr.push(num);//添加一个或多个元素到数组末尾
			render();
		}else{
			alert("请输入10-100之间的整数");
			(document.getElementById("num")).value="";
			return;
		}
	}

	left_out_btn.onclick=function(){
		if(arr.length>0){
			arr.shift();//删除数组中第一个元素
			render();
		}
	}
		

	right_out_btn.onclick=function(){
		if(arr.length>0){
			arr.pop();//删除数组中最后一个元素
			render();
		}
	}

	asc_sort_btn.onclick=ascSort;

	desc_sort_btn.onclick=descSort;

})();

function render(){
	var chart_wrap=document.getElementById("chart-wrap");//存放图表的容器
	chart_wrap.innerHTML="";
	for(var index in arr){
		var chart_part=document.createElement("div");
		chart_part.style.height=arr[index]+"px";
		chart_part.className="chart-part";
		chart_part.setAttribute("title",arr[index].toString());
		chart_wrap.appendChild(chart_part);
	}
}

function ascSort(){ //升序排列
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>arr[j+1]){
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
	render();
}

function descSort(){ //降序排列
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]<arr[j+1]){
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
	render();
}