window.pageInfo = new Object();
$(function(){
	$.ajax({
		url:"ContentAction.do?method=homePageInfo",
		type:"post",
		data:{
			wheresql:"contentparent='1'"
		},
		success : function(resp){
			var data = eval('('+resp+')');
			$('#hmPage-Cont').html('');
			
			//首页
			$.each(data.root[0],function(i,item){
				$('#hmPage-Cont').append(item.contentdetail);
				$('#hmPage-Cont .swiper-slide:eq('+i+')').css('background'," url('"+item.contentback+"') 50% 35% ");
			});
			
			//关于
			$('#guanyu-cont').css('background'," url('"+data.root[1][0].contentback+"') 50% 60% ");
			$('#guanyu-cont .nth1').append(data.root[1][0].contentdetail);
			$('#guanyu-cont .nth3').append(data.root[1][1].contentdetail);
			$.each(data.root[2],function(i,item){
				var newsT = item.contentdetail.substring(24,item.contentdetail.indexOf('<span>'));
				var newsCont = item.contentdetail.substring(item.contentdetail.indexOf('<p>')+3,item.contentdetail.indexOf('</p>'));
				$('#guanyu-cont .nth4').append('<ul><li><span>'+newsT+'</span><br>'+newsCont+
						'<a href="newslist.html">查看详情 > </a></li></ul>');
			});
			
			//服务
			$('#sever-cont').css('background'," url("+data.root[3][0].contentback+") 50% bottom");
			$.each(data.root[3],function(i,item){
				$('#sever-cont .items').append('<li class="pc">'+item.contentdetail+'</li>');
			});
			
			//提交"入驻"表单
			$('.cd-buttons .confirm-btn').click(subSQRZfm);
			
			//方案
			$.each(data.root[4],function(i,item){
				$('#product-cont .'+item.contentcode.substring(1,3)+' .he_ZoomInImg').append('<img class="he_ZoomInImg_img" src="'+item.contentback+
						'" width="100%" height="100%" alt=""><div class="he_ZoomInImg_caption">'+item.contentdetail+'</div>');
			});
			
			//特效
			if (window.location.host > 0) {
		        $("section").remove();
		        return;
		    }
		    var m = document.location.href.toLowerCase().match(/#p(\d+)$/);
		    if (m != null) pageIndex = m[1] - 1;
		    preload();
		},
		error : function(resp){
			var data = eval('('+resp+')');
			alert(data.msg);
		}
	});
});
//提交"入驻"表单
function subSQRZfm(){
	var strJson = '[{';
	$('#sqrz-fm input').each(function(i,item){
		strJson += '"'+item.name+'":"'+item.value+'",';
	});
	strJson = strJson.substring(0,strJson.length-1) + '}]';
	$.ajax({
		url:"IntentioncAction.do?method=insAll",
		type:"post",
		data:{
			json:strJson
		},
		success:function(resp){
			var data = eval('('+resp+')');
			if(data.msg == '操作成功'){
				alert('入驻申请已提交!');
			} else {
				alert('申请提交失败!');
			}
		},
		error : function(resp){
			var data = eval('('+resp+')');
			alert(data.msg);
		}
	});
}




















