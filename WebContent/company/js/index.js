window.pageInfo = new Object();
$(function(){
	$.ajax({
		url:"ContentAction.do?method=selAll",
		type:"post",
		data:{
			wheresql:"contentparent='1'"
		},
		success : function(resp){
			var data = eval('('+resp+')');
			var ct = [];											//首页信息
			$.each(data.root,function(i,item){
				var ctItem = new Object();
				if(item.contentcode.indexof('t')!= -1){
					ctItem.title = getStr(item.contentdetail);		//标题
				} else if(item.contentcode.indexof('c')!= -1){
					ctItem.content = getStr(item.contentdetail);	//内容
				}
				ct.push(ctItem);
			});
			window.pageInfo.hpInfo = ct;
		},
		error : function(resp){
			var data = eval('('+resp+')');
			alert(data.msg);
		}
	});
});