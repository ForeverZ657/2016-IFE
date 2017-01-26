(function(){
	var left_in_btn=document.getElementById("left_in");//从左侧插入
	var right_in_btn=document.getElementById("right_in");//从右侧插入
	var left_out_btn=document.getElementById("left_out");//从左侧删除
	var right_out_btn=document.getElementById("right_out");//从右侧删除

	var queue=document.getElementById("queue");//ul模拟的队列
	var childNodes=queue.childNodes; //得到所有子节点
	//浏览器会将元素节点之前的空白字符当做文本节点来处理，这样就会出现出乎意料的多余文本节点

	//去除多余的文本节点
	for(var i=0;i<childNodes.length;i++){
		if(childNodes[i].nodeType==3){
			queue.removeChild(childNodes[i]);
			i--;
		}
	}

	left_in_btn.onclick=function(){ //从左侧插入的响应函数

		var input_content=((document.getElementById("content")).value).replace(/(^\s*)|(\s*$)/g,"");

		if(input_content!=""){
			var first_elem=queue.firstChild;
			var insert_elem=document.createElement("li");
			var insert_elem_txt=document.createTextNode(input_content);
			insert_elem.appendChild(insert_elem_txt);
			queue.insertBefore(insert_elem,first_elem);//注意：有insertBefore，没有insertAfter
		}
		else{
			alert("请输入待插入的内容");
		}
		document.getElementById("content").value="";
	}

	left_out_btn.onclick=function(){ //从左侧删除
		var first_elem=queue.firstChild;
		if(first_elem!=null){
			queue.removeChild(first_elem);
		}
	}

	right_in_btn.onclick=function(){
		var input_content=((document.getElementById("content")).value).replace(/(^\s*)|(\s*$)/g,"");

		if(input_content!=""){
			var insert_elem=document.createElement("li");
			var insert_elem_txt=document.createTextNode(input_content);
			insert_elem.appendChild(insert_elem_txt);
			queue.appendChild(insert_elem);
		}
		else{
			alert("请输入待插入的内容");
		}
		document.getElementById("content").value="";
	}

	right_out_btn.onclick=function(){
		var last_elem=queue.lastChild;
		if(last_elem!=null){
			queue.removeChild(last_elem);
		}
	}

	for(var i=0;i<childNodes.length;i++){
		childNodes[i].onclick=function(){
			queue.removeChild(this); //this表示当前元素
		}
	}

})();