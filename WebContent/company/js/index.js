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
			$.each(data.root,function(i,item){
				$('#hmPage-Cont').append(item.contentdetail);
				$('#hmPage-Cont .swiper-slide:eq('+i+')').css('background'," url('"+item.contentname+"') 50% 35% ");
			});
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