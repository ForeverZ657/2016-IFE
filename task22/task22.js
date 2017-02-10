var nodeList=[];//按顺序存放要遍历的节点
var timer=null;//保存setInterval返回的值，用来取消间隔执行
(function(){
	var preOrderTraverseBtn=document.getElementById("pre-order-traverse");
	var inOrderTraverseBtn=document.getElementById("in-order-traverse");
	var postOrderTraverseBtn=document.getElementById("post-order-traverse");

	//事件绑定
	preOrderTraverseBtn.addEventListener("click",preOrder,false);
	inOrderTraverseBtn.addEventListener("click",inOrder,false);
	postOrderTraverseBtn.addEventListener("click",postOrder,false);
})();

/************************start************************/
//执行先序遍历过程
function preOrder(){
	reset();
	var root=document.getElementById("root");
	if(root!=null){
		preOrderTraverse(root);
	}
	setColor();
}
//先序遍历
function preOrderTraverse(node){
	if(node!=null){
		nodeList.push(node);
		preOrderTraverse(node.children[0]);
		preOrderTraverse(node.children[1]);
	}
}
/***********************end**************************/

/************************start************************/
//执行中序遍历过程
function inOrder(){
	reset();
	var root=document.getElementById("root");
	if(root!=null){
		inOrderTraverse(root);
	}
	setColor();
}
//中序遍历
function inOrderTraverse(node){
	if(node!=null){
		inOrderTraverse(node.children[0]);
		nodeList.push(node);
		inOrderTraverse(node.children[1]);
	}
}
/***********************end**************************/

/************************start************************/
//执行后续遍历过程
function postOrder(){
	reset();
	var root=document.getElementById("root");
	if(root!=null){
		postOrderTraverse(root);
	}
	setColor();
}
//后续遍历
function postOrderTraverse(node){
	if(node!=null){
		postOrderTraverse(node.children[0]);
		postOrderTraverse(node.children[1]);
		nodeList.push(node);
	}
}
/***********************end**************************/

function reset(){
	clearInterval(timer);
	timer=null;
	for(var i=0;i<nodeList.length;i++){
		nodeList[i].style.backgroundColor="#fff";
	}
	nodeList=[];
}

function setColor(){
	var index=0;
	if(nodeList.length==0){
		return;
	}
	nodeList[0].style.backgroundColor="#EA4646";
	timer=setInterval(function(){
		index++;
		if(index<nodeList.length){
			nodeList[index-1].style.backgroundColor="#fff";
			nodeList[index].style.backgroundColor="#EA4646";
		}else{
			clearInterval(timer);
			timer=null;
			nodeList[index-1].style.backgroundColor="#fff";
		}
	},500);
}

//用动画的方式展示遍历过程

/*
******************************************
这么写是错误的，因为JavaScript是单线程的，for循环会阻塞线程，等for结束
后才会执行计时器，这时此处的elem是最后一个遍历的elem，会重复对最后一个elem设置背景颜色。
ps:不要在循环中使用setTimeout计时器，因为它会被线程阻塞，从而达不到预期的效果。
******************************************
function demoAnimation(arr){
	var interval=1000;
	for(var i=0;i<arr.length;i++){
		var elem=document.getElementById(arr[i]);
		var color;
		if(elem.className=="root"){
				color="#D7D5D5";
		}else if(elem.className=="second-level"){
			color="#B387DA";
		}else if(elem.className=="third-level"){
			color="#9AF0ED";
		}else if(elem.className=="fourth-level"){
			color="#F83838";
		}
		setTimeout(function(){
			elem.style.backgroundColor=color;
			//console.log(color);//测试用
		},interval);
		interval+=1000;
	}
}
*/
