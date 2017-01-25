$(function(){
	$.ajax({
		url: "System_powerAction.do?method=selMenuChildren&node=root",
		success: function(r) {
			initrootmenu(r);
		},
		error:function(r) {
			alert('网络出现问题，请稍后再试');
		}
	});
})
function initmenu(node){
	$.ajax({
		url: "System_powerAction.do?method=selMenuChildren&node="+node,
		success: function(r) {
			var respText = eval('('+r+')'); 
			$("#leftmenu").html("");
			$("#leftmenu").append('<li class="layui-nav-item layui-this">'+
					'<a href="javascript:;" data-url="main.html">'+
				    '<i class="iconfont icon-home1" data-icon="icon-home1"></i>'+
					'<span>后台首页</span>'+
				'</a>'+
			'</li>');
			if(4==node){
				$("#leftmenu").append('<li class="layui-nav-item">'+
						'<a href="javascript:;" data-url="../system/System_password/System_password.jsp">'+
					    '<i class="iconfont icon-iconfuzhi01" data-icon="icon-iconfuzhi01"></i>'+
						'<span>修改密码</span>'+
					'</a>'+
				'</li>');
			}
			$.each(respText, function(i, item) {
				$("#leftmenu").append('<li class="layui-nav-item">'+
						'<a href="javascript:;" data-url="../'+item.href+'">'+
						'<i class="iconfont '+item.icon+'"  data-icon="'+item.icon+'"></i>'+
						   '<span>'+item.text+'</span>'+
						'</a>'+
					'</li>');
		    });
		},
		error:function(r) {
			alert('网络出现问题，请稍后再试');
		}
	});
	
}
function initrootmenu(data){	
	var respText = eval('('+data+')'); 
	if(document.body.clientWidth<500) {
		$(".layui-larry-menu").hide();
		$.each(respText, function(i, item) {
			if(i==0) initmenu(item.id);
			$("#smallerootmenu").append('<dd><a href="#" onclick="initmenu('+item.id+')">'+item.text+'</a></dd>');
	    });
	}else{
		$.each(respText, function(i, item) {
			if(i==0) {
				$("#rootmenu").append('<li class="layui-nav-item layui-this">'+
							'<a href="#" onclick="initmenu('+item.id+')"><i class="iconfont '+item.icon+'"></i>'+item.text+'</a>'+
	   			   		 	'</li>');
				initmenu(item.id);
			}else{
				$("#rootmenu").append('<li class="layui-nav-item">'+
		          	   	   '<a href="#" onclick="initmenu('+item.id+')"><i class="iconfont '+item.icon+'"></i>'+item.text+'</a>'+
		             	   '</li>');
			}
	    });
	}
}