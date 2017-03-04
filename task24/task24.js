var nodeList=[];//按顺序存放要遍历的节点
var timer=null;//保存setInterval返回的值，用来取消间隔执行
(function(){
	var preOrderTraverseBtn=document.getElementById("pre-order-traverse");
	var postOrderTraverseBtn=document.getElementById("post-order-traverse");
	var delectSelectedNodeBtn=document.getElementById("delectSelectedNodeBtn");
	var insertNodeBtn=document.getElementById("insertNodeBtn");

	//查找功能相关控件
	var preSearchBtn=document.getElementById("pre-order-search-btn");
	var postSearchBtn=document.getElementById("post-order-search-btn");

	//事件绑定
	preOrderTraverseBtn.addEventListener("click",preOrder,false);
	
	postOrderTraverseBtn.addEventListener("click",postOrder,false);

	preSearchBtn.addEventListener("click",preOrderSearch,false); //前序遍历查找
	postSearchBtn.addEventListener("click",postOrderSearch,false); //后序遍历查找

	setClickedNodeColor();//点击节点设置颜色

	delectSelectedNodeBtn.addEventListener("click",delSelNode,false);//删除选中的节点

	insertNodeBtn.addEventListener("click",function(){ //插入节点
		insertNodeToTree.call(this,selectedNode);
	},false);
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
		for(var i=1;i<node.children.length;i++){
			preOrderTraverse(node.children[i]);
		}
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
		for(var i=1;i<node.children.length;i++){
			postOrderTraverse(node.children[i]);
		}
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

function setColor2(searchContent){ //查找过程中将查询到的要素设置固定颜色
	var index=0;
	if(nodeList.length==0){
		return;
	}
	nodeList[0].style.backgroundColor="#EA4646";
	timer=setInterval(function(){
		index++;
		if(index<nodeList.length){
			if(nodeList[index-1].children[0]!=null && nodeList[index-1].children[0].innerHTML!=searchContent){
				nodeList[index-1].style.backgroundColor="#fff";
			}
			nodeList[index].style.backgroundColor="#EA4646";
		}else{
			clearInterval(timer);
			timer=null;
			nodeList[index-1].style.backgroundColor="#fff";
		}
	},500);
}

/********************为选中节点上色****start****/
var selectedNode=null;//被点击并且上色的节点
//为被点击的节点注册上色事件
function setClickedNodeColor(){
	var root=document.getElementById("root"); //根节点
	root.addEventListener("click",function(){
		if(selectedNode!=null){
			resetColor3(selectedNode);
		}
		selectedNode=this;
		setColor3.call(this,this);
	},false);
	
	var nodes=root.getElementsByTagName("div");
	for(var i=0;i<nodes.length;i++){ //为子节点注册点击事件
		if(nodes[i].className.indexOf("tree-node")!=-1){
			nodes[i].addEventListener("click",function(){
				event.stopPropagation(); 
				if(selectedNode!=null){
					resetColor3(selectedNode);
				}
				selectedNode=this;
				setColor3.call(this,this);
			},false);
		}
	}
}
//给被点击的节点上色
function setColor3(node){
	if(node!=null){
		node.style.backgroundColor="#75F2C8";
		var nodeChildren=node.children;
		for(var i=0;i<nodeChildren.length;i++){
			if(nodeChildren[i].className.indexOf("tree-node")!=-1){
				setColor3(nodeChildren[i]);
			}
		}
	}
}

function resetColor3(node){
	if(node!=null){
		node.style.backgroundColor="#fff";
		var nodeChildren=node.children;
		for(var i=0;i<nodeChildren.length;i++){
			if(nodeChildren[i].className.indexOf("tree-node")!=-1){
				resetColor3(nodeChildren[i]);
			}
		}
	}
}
/********************为选中节点上色****end****/


/*******************删除选中节点****start******/
function delSelNode(){
	if(selectedNode!=null){
		var parentNode=selectedNode.parentNode;//得到要被删除节点的父节点
		parentNode.removeChild(selectedNode);
		selectedNode=null;//重新置为空
	}
}
/*******************删除选中节点****end******/

/*******************start********************/

//先序遍历查找
function preOrderSearch(){
	reset();
	var searchContent=((document.getElementById("searchContent")).value).replace(/(^\s+)|(\s+$)/g,"");
	if(searchContent!=""){
		var root=document.getElementById("root");
		if(root!=null){
			preOrderTraverse(root);
		}
		setColor2(searchContent);
	}
}

//后序遍历查找
function postOrderSearch(){
	reset();
	var searchContent=((document.getElementById("searchContent")).value).replace(/(^\s+)|(\s+$)/g,"");
	if(searchContent!=""){
		var root=document.getElementById("root");
		if(root!=null){
			postOrderTraverse(root);
		}
		setColor2(searchContent);
	}
}

/*********************end*******************/

/*******************插入节点****start*******/
function insertNodeToTree(parentNode){
	if(parentNode!=null){
		var insertTxt=(document.getElementById("insertTxt").value).replace(/(^\s+)|(\s+$)/g,"");
		var insertNode=document.createElement("div");
		var spanInInsertNode=document.createElement("span");
		var spanTxtInInsertNode=document.createTextNode(insertTxt);
		spanInInsertNode.appendChild(spanTxtInInsertNode);
		insertNode.appendChild(spanInInsertNode);
		if(parentNode.className.indexOf("root")!=-1){
			insertNode.className="tree-node second-level";
		}else if(parentNode.className.indexOf("second-level")!=-1){
			insertNode.className="tree-node third-level";
		}else if(parentNode.className.indexOf("third-level")!=-1){
			insertNode.className="tree-node fourth-level";
		}else if(parentNode.className.indexOf("fourth-level")!=-1){
			insertNode.className="tree-node fifth-level";
		}else if(parentNode.className.indexOf("fifth-level")!=-1){
			alert("不要在最后一级节点下插入节点");
			return;
		}
		insertNode.addEventListener("click",function(){
			event.stopPropagation(); 
			if(selectedNode!=null){
				resetColor3(selectedNode);
			}
			selectedNode=this;
			setColor3.call(this,this);
		},false);
		parentNode.appendChild(insertNode);
	}else{
		alert("请选择插入节点的父节点");
	}
	document.getElementById("insertTxt").value="";
}
/*******************插入节点****end*******/