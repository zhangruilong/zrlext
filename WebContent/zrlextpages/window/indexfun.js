$(function(){
	$.ajax({
		url: "System_powerAction.do?method=selAllMenu",
		success: function(r) {
			initrootmenu(r);
		},
		error:function(r) {
			alert('网络出现问题，请稍后再试');
		}
	});
	   // 快捷键锁屏设置
	    $(document).keydown(function(e){
	         if(e.altKey && e.which == 76){
	         	 lockSystem();
	         }
	    });
	   function startTimer(){
	   	    var today=new Date();
	        var h=today.getHours();
	        var m=today.getMinutes();
	        var s=today.getSeconds();
	        m = m < 10 ? '0' + m : m;
	        s = s < 10 ? '0' + s : s;
	        $('#time').html(h+":"+m+":"+s);
	        t=setTimeout(function(){startTimer()},500);
	   }
	   // 锁屏状态检测
	   function checkLockStatus(locked){
	        // 锁屏
	        if(locked == 1){
	        	$('.lock-screen').show();
	            $('#locker').show();
	            $('#layui_layout').hide();
	            $('#lock_password').val('');
	        }else{
	        	$('.lock-screen').hide();
	            $('#locker').hide();
	            $('#layui_layout').show();
	        }
	    }

	   checkLockStatus(window.localStorage.getItem("locked"));
	   // 锁定屏幕
	   function lockSystem(){
	   	   var url = '';
	   	   $.post(
	   	   	   url,
	   	   	   function(data){
	   	   		   window.localStorage.setItem("locked",1);
	   	   		   checkLockStatus(1);
	   	   });
	   	   startTimer();
	   }
	   //解锁屏幕
	   function unlockSystem(){
	        // 与后台交互代码已移除，根据需求定义或删除此功能
		   $.ajax({
				url: "System_userAction.do?method=unlock",
				type: "post",
				data: {
					password : $('#lock_password').val()
					},
				success: function(r) {
					var respText = eval('('+r+')'); 
					if(respText.code != 202) {
						layer.tips(respText.msg, '#lock_password', {
							  tips: [1, 'red'],
							  time: 4000
							});
					} else {
						window.localStorage.setItem("locked",0);
						checkLockStatus(0);
					}
				},
				error:function(r) {
					alert(respText.msg);
				}
			});
	    }
	   // 点击锁屏
	   $('#lockscreen').click(function(){
	   	    lockSystem();
	   });
	   // 解锁进入系统
	   $('#unlock').click(function(){
	        unlockSystem();
	   });
	   // 监控lock_password 键盘事件
	   $('#lock_password').keypress(function(e){
	        var key = e.which;
	        if (key == 13) {
	            unlockSystem();
	        }
	    });
})
function initrootmenu(data){
	var respText = eval('('+data+')');
	var desktopmenu = '';
	var openingmenu = '';
	$.each(respText, function(y, ytem) {
		if('Cms'==ytem.code||'Om'==ytem.code||'System'==ytem.code){
			$.each(ytem.children, function(i, item) {
				openingmenu += '<div class="desktop-app" data-id="'+item.id+'" data-title="'+item.text+'" data-url="../'+item.href+
				'" data-icon="&#xe637" data-iconbg="#d3b59d"  data-isicon="1" data-height="" data-width="" data-fid="'+item.parent+'">'+ 
				'<i class="layui-icon" style="background-color:#d3b59d">&#xe637</i>'+
				'<span class="desktop-title layui-elip">'+item.text+'</span>'+
				'</div>';
			})
		}else{
			$.each(ytem.children, function(i, item) {
				desktopmenu += '<div class="desktop-app" data-id="'+item.id+'" data-title="'+item.text+'" data-url="../'+item.href+
				'" data-icon="&#xe637" data-iconbg="#d3b59d"  data-isicon="1" data-height="" data-width="" data-fid="'+item.parent+'">'+ 
				'<i class="layui-icon" style="background-color:#d3b59d">&#xe637</i>'+
				'<span class="desktop-title layui-elip">'+item.text+'</span>'+
				'</div>';
			})
		}
    });
	$(".swiper-wrapper").append('<div class="swiper-slide">'+
    		'<div class="desktopContainer"  data-menuid="1" data-name="1" >'+
    		desktopmenu+'</div></div>');
	openingmenu += '<div class="desktop-app" data-id="0" data-title="修改密码" data-url="../system/System_password/System_password.jsp'+
	'" data-icon="&#xe637" data-iconbg="#d3b59d"  data-isicon="1" data-height="" data-width="" data-fid="1">'+ 
	'<i class="layui-icon" style="background-color:#d3b59d">&#xe637</i>'+
	'<span class="desktop-title layui-elip">修改密码</span>'+
	'</div>';
	$(".opening-menu-app-list").append(openingmenu);
	desktop();
}