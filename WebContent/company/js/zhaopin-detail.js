var jbpid = getQueryString('jbpid');
$(function(){
	$.ajax({
		url:"JobpublishAction.do?method=selAll",
		type:"post",
		data:{
			json:'[{jobpublishid:"'+jbpid+'"}]'
		},
		success:function(resp){
			var data = eval('('+resp+')');
			var item = data.root[0];
			$('.zp-detail h1').text(item.jobpublishname);
			$('.zp-detail p:eq(0)').append(item.jobpublishdetail.replace(/；/g,'；<br>'));
			$('.zp-detail p:eq(1)').append(item.jobpublishmust.replace(/；/g,'；<br>'));
			
		},
		error:function(resp){
			var data = eval('('+resp+')');
			alert(data.msg);
		}
	});
});



















