var tecArr=["HTML5","JavaScript","CSS"]; //技术数组
var hobbyArr=["游泳","瑜伽","摄影"]; //兴趣数组
(function(){
	//渲染两个数组
	renderTec();
	renderHobby();

	//添加Tag
	var tec=document.getElementById("tecs");
	tec.addEventListener("keyup",addTec,false);

	//添加兴趣
	var add_hobbies_btn=document.getElementById("add_hobbies_btn");
	add_hobbies_btn.addEventListener("click",addHobbies,false);
})();

/*
	渲染技术队列
*/
function renderTec(){
	var tec_queue=document.getElementById("tec-queue-wrapper");
	tec_queue.innerHTML="";
	if(tecArr.length>10){ //超过10个进行截取
		tecArr=tecArr.slice(tecArr.length-10,tecArr.length);
	}
	for(var i=0;i<tecArr.length;i++){
		var tecItem=document.createElement("div");
		var tecItemTxt=document.createTextNode(tecArr[i]);
		tecItem.appendChild(tecItemTxt);
		tecItem.className="tec-item";
		tec_queue.appendChild(tecItem);
		tecItem.addEventListener("click",function(){
			delItemFromArr(tecArr,this.innerHTML.substring(2));
			renderTec();
		});
		tecItem.addEventListener("mouseover",function(){
			this.innerHTML="删除"+this.innerHTML;
		},false);
		
		tecItem.addEventListener("mouseout",function(){
			this.innerHTML=this.innerHTML.substring(2);
		});
	}
}

/*
	渲染兴趣队列
*/
function renderHobby(){
	var hobby_queue=document.getElementById("hobby-queue-wrapper");
	hobby_queue.innerHTML="";
	if(hobbyArr.length>10){ //超过10个进行截取
		hobbyArr=hobbyArr.slice(hobbyArr.length-10,hobbyArr.length);
	}
	for(var i=0;i<hobbyArr.length;i++){
		var hobbyItem=document.createElement("div");
		var hobbyItemTxt=document.createTextNode(hobbyArr[i]);
		hobbyItem.appendChild(hobbyItemTxt);
		hobbyItem.className="hobby-item";
		hobby_queue.appendChild(hobbyItem);
		hobbyItem.addEventListener("click",function(){
			delItemFromArr(hobbyArr,this.innerHTML.substring(2));
			renderHobby();
		});
		hobbyItem.addEventListener("mouseover",function(){
			this.innerHTML="删除"+this.innerHTML;
		},false);
		
		hobbyItem.addEventListener("mouseout",function(){
			this.innerHTML=this.innerHTML.substring(2);
		});
	}
}

//增加元素到技术队列
function addTec(){
	if(/[,， ]/.test(this.value)||event.keyCode==13){
		var tecName=(this.value.replace(/(^\s+)|(\s+$)/g,"")).replace(/[,，]/,"");
		if(tecArr.indexOf(tecName)==-1){
			tecArr.push(tecName);
			renderTec();
		}
		this.value="";
	}
}

//从无重复数据的数组中删除某项
function delItemFromArr(arr,elem){
	var delIndex=-1;
	for(var i=0;i<arr.length;i++){
		if(arr[i]==elem){
			delIndex=i;
			break;
		}
	}
	if(delIndex!=-1){
		arr.splice(delIndex,1);
	}
}

/*
	将文本域中输入的内容分割开，形成一个字符串数组
*/
function getInputValues(str){
	return str.split(/[^0-9a-zA-Z\u4E00-\u9FA5]+/).filter(function(e){ return e!=""; });
}

/*增加兴趣*/
function addHobbies(){
	var hobbies_content=document.getElementById("hobbies-content");
	var hobbies_value=hobbies_content.value;
	var hobbies=getInputValues(hobbies_value);
	var originHobbiesNumber=hobbyArr.length;//原始兴趣数
	for(var i=0;i<hobbies.length;i++){
		if(hobbyArr.indexOf(hobbies[i])==-1){
			hobbyArr.push(hobbies[i]);
		}
	}
	if(hobbyArr.length>originHobbiesNumber){ //有非重复兴趣的加入
		renderHobby();
	}
	hobbies_content.value="";
}