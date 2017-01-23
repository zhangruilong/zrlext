$(function(){
	$.ajax({
		url: "System_powerAction.do?method=selMenuChildren&node=1",
		success: function(r) {
			initrootmenu(r);
		},
		error:function(r) {
			alert('网络出现问题，请稍后再试');
		}
	});
})
function initrootmenu(data){
	var respText = eval('('+data+')');
	$.each(respText, function(i, item) {
		var c = ['<div class="desktop-app" data-id="'+item.id+'" data-title="'+item.text+'" data-url="../'+item.href+
			'" data-icon="&#xe637" data-iconbg="#d3b59d"  data-isicon="1" data-height="" data-width="" data-fid="'+item.parent+'">', 
			'<i class="layui-icon" style="background-color:#d3b59d">&#xe637</i>',
			'<span class="desktop-title layui-elip">'+item.text+'</span>', 
			'</div>'].join(""),
        desktopTmp = ['{{# layui.each(d.menu, function(index, menuitem){ if(index>=3)return false;}}',
        	'<div class="swiper-slide">', 
        	'<div class="desktopContainer"  data-menuid="{{menuitem.menuid}}" data-name="{{menuitem.name}}" >', 
        	'{{# layui.each(menuitem.app, function(index, app){}}', c, 
        	'{{# });}}', '</div>', '</div>', '{{# }); }} '].join(""),
        desktopOpeningTmp = ['{{# layui.each(d.menu[3].app, function(index, app){}}', c, '{{# });}}'].join("");
        $(".swiper-wrapper").append();
    });
	desktop();
}