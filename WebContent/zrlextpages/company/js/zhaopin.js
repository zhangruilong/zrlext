$(function(){
	$.ajax({
		url:"Cms_jobpublishAction.do?method=selAll",
		type:"post",
		data:{
			
		},
		success:function(resp){
			var data = eval('('+resp+')');
			$('#zp-data-li').html('');
			$.each(data.root,function(i,item){
				var jpd = item.jobpublishdetail.substring(0,item.jobpublishdetail.indexOf('；')+1);
				$('#zp-data-li').append('<li> <h1>'+item.jobpublishname+'</h1>'+
			            '<p>职位描述：<br>'+jpd+'<br>人数：'+item.jobpublishnum+'人</p>'+
			            '<a href="zhaopin-detail.html?jbpid='+item.jobpublishid+'" class="zpdetaillink">详情</a> </li>');
			});
			
		},
		error:function(resp){
			var data = eval('('+resp+')');
			alert(data.msg);
		}
	});
});