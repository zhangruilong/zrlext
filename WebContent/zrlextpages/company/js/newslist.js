$(function(){
	$.ajax({
		url:"ContentAction.do?method=selAll",
		type:"post",
		data:{
			wheresql:"contentparent='G14763280088554983'"
		},
		success:function(resp){
			var data = eval('('+resp+')');
			if(data.msg=='操作成功'){
				$.each(data.root,function(i,item){
					var detaStr = decodeURI(item.contentdetail);
					var newsCont = detaStr.substring(detaStr.indexOf('<p>')+3,detaStr.indexOf('</p>'));
					$('.newswrapper ul').append('<li>'+
				        	'<p class="newspic"><img src="images/shiyongyou.jpg"></p>'+newsCont+
				            '<a href="newsdetail.html?conid='+item.contentid+'" class="detaillink">查看详情 > </a>'+
				        '</li>');
				});
			}
		}
	});
})