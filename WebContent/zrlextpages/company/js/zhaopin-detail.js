var jbpid = getQueryString('jbpid');
$(function(){
	$.ajax({
		url:"Cms_jobpublishAction.do?method=selAll",
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

//提交职位申请
function subApplyc(){
	var strJson = '[{';
	var flag = false;
	$('.cd-popup [id]').each(function(i,item){
		if($(item).val()){
			strJson += '"'+item.id+'":"'+$(item).val()+'",';
		} else {
			flag = true;
			alert(item.name+'不能为空!');
			return false;
		}
	});
	if(flag){
		return;
	}
	strJson += '"applycjob":"'+jbpid+'"}]';
	$.ajax({
		url:"Cms_applycAction.do?method=insAll",
		type:"post",
		data:{
			json:strJson
		},
		success:function(resp){
			var data = eval('('+resp+')');
			if(data.msg=='操作成功'){
				alert('已成功提交职位申请！');
			} else {
				alert('职位申请提交失败！');
			}
		},
		error:function(resp){
			var data = eval('('+resp+')');
			alert(data.msg);
		}
	});
}



















