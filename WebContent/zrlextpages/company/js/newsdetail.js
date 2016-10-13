var conid = getQueryString('conid');
$(function(){
	$.ajax({
		url:"ContentAction.do?method=selAll",
		type:"post",
		data:{
			wheresql:"contentid='"+conid+"'"
		},
		success:function(resp){
			var data = eval('('+resp+')');
			if(data.msg=='操作成功' && data.root.length>0){
				$('.newsdetail').html(decodeURI(data.root[0].contentdetail));
			}
		}
	});
})