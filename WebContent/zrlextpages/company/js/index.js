$(function(){
	$.ajax({
		url:"Cms_contentAction.do?method=homePageInfo",
		type:"post",
		data:{
		},
		success : function(resp){
			var data = eval('('+resp+')');
			//$('#hmPage-Cont').html('');
			//首页
			$.each(data.root[0],function(i,item){
				$('#hmPage-Cont').append(decodeURI(item.contentdetail));
				$('#hmPage-Cont .swiper-slide:eq('+i+')').css('background'," url('"+item.contentback+"') 50% 35% ");
				$('#hmPage-Cont .swiper-slide:eq('+i+')').css('background-size',"cover");
			});
			
			//关于
			$('#guanyu-cont').css('background'," url('"+data.root[1][0].contentback+"') 50% 60% ");
			$('#guanyu-cont').css('background-size',"cover");
			$('#guanyu-cont .nth1').append(decodeURI(data.root[1][0].contentdetail));				//简介
			$.each(data.root[2],function(i,item){										//文化
				$('#guanyu-cont .nth3 ul').append('<li>'+decodeURI(item.contentdetail)+'</li>');
			});
			$.each(data.root[3],function(i,item){										//动态
				var detaStr = decodeURI(item.contentdetail);
				var newsT = detaStr.substring(24,detaStr.indexOf('<span>'));
				var newsCont = detaStr.substring(detaStr.indexOf('<p>')+3,detaStr.indexOf('</p>'));
				$('#guanyu-cont .nth4').append('<ul><li><span>'+newsT+'</span><br>'+newsCont+
						'<a href="newslist.html">查看详情 > </a></li></ul>');
			});
			
			//服务
			$('#sever-cont').css('background'," url("+data.root[4][0].contentback+") 50% bottom");
			$('#sever-cont').css('background-size',"cover");
			$.each(data.root[4],function(i,item){
				//alert(item.contentdetail);
				$('#sever-cont .items').append(decodeURI(item.contentdetail));
			});
			
			//提交"入驻"表单
			$('.cd-buttons .confirm-btn').click(subSQRZfm);
			
			//方案
			$.each(data.root[5],function(i,item){
				$('#product-cont .'+item.contentcode.substring(1,3)+' .he_ZoomInImg').append('<img class="he_ZoomInImg_img" src="'+item.contentback+
						'" width="100%" height="100%" alt=""><div class="he_ZoomInImg_caption">'+item.contentdetail+'</div>');
			});
			
			//联系
			if(typeof(data.root[6]) != 'undefined' && data.root[6]){
				var ctInfo = data.root[6][0];
				$('.wechat h1').html(ctInfo.contentname+'<span>'+ctInfo.contentdetail+'</span>');
				$('.contact').css('background'," url("+ctInfo.contentback+") 50% bottom");
				$('.contact').css('background-size',"cover");
			}
			//公司信息
			if(typeof(data.root[7]) != 'undefined' && data.root[7]){
				var seoInfo = data.root[7][0];
				$('.wechat .tel').text(seoInfo.seotel);
				$('.below').html('<i>'+seoInfo.seocompany+'<br>地址：'+seoInfo.seoaddress+'</i><i>邮编：'+seoInfo.seoposcode+'<br>Email：'+seoInfo.seoemail+
						'</i><i>'+seoInfo.seocopyright+'<br>'+seoInfo.seoicp+'</i>');
				$('meta[name="Keywords"]').attr('content',seoInfo.seokeword);				//关键字
				$('meta[name="Description"]').attr('content',seoInfo.seodetail);			//描述
			}
			
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
	var flag = false;
	$('#sqrz-fm input').each(function(i,item){
		if($(item).val()){
			strJson += '"'+item.name+'":"'+item.value+'",';
		} else {
			alert('请将申请信息填写完整。');
			flag = true;
			return false;
		}
	});
	if(flag){
		return;
	}
	strJson = strJson.substring(0,strJson.length-1) + '}]';
	$.ajax({
		url:"Cms_intentioncAction.do?method=insAll",
		type:"post",
		data:{
			json:strJson
		},
		success:function(resp){
			var data = eval('('+resp+')');
			if(data.msg == '操作成功'){
				alert('已成功提交入驻申请!');
				$('.cd-popup').removeClass('is-visible');
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