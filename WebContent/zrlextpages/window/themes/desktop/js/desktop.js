!function(){layui.form();var a=layui.jquery,c=layui.layer,m=layui.laytpl;a("#loading").hide().remove();var b={setting:function(a){b.hidemenu();c.alert("\u5bf9\u4e0d\u8d77\uff0c\u6211\u8fd8\u4e0d\u80fd\u6ee1\u8db3\u4f60",{icon:5,title:"\u7cfb\u7edf\u91cd\u8981\u63d0\u793a"})},theme:function(e){b.hidemenu();a(this).data({url:"themes.html",isicon:0,icon:"&#xe638;",height:400,width:460,iconbg:"#51555e",title:"\u80cc\u666f\u8bbe\u7f6e"});b.appopen(a(this))},users:function(a){b.hidemenu();c.alert("\u5bf9\u4e0d\u8d77\uff0c\u6211\u8fd8\u4e0d\u80fd\u6ee1\u8db3\u4f60",
{icon:5,title:"\u7cfb\u7edf\u91cd\u8981\u63d0\u793a"})},loginout:function(a){b.hidemenu();c.alert("\u6ce8\u9500\u767b\u5f55")},technicalsupport:function(a){b.hidemenu();c.alert("\u52a0QQ\u7fa4\u554a\uff08601178086\uff09\uff0c\u6709\u6e90\u7801\uff0c\u6709\u840c\u59b9\u5b50",{icon:1,title:"\u6280\u672f\u652f\u6301"})},lockscreen:function(a){c.open({type:1,title:!1,closeBtn:!1,area:"300px;",shade:.8,id:"LAY_layuipro",resize:!1,btn:["\u89e3\u9501"],btnAlign:"c",zIndex:parseInt(c.zIndex+1),moveType:1,
content:'<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">\u597d\u4e86\uff0c\u5c01\u5370\u89e3\u9664</div>',success:function(a){}});b.hidemenu()},closeall:function(e){e=a(".taskbar-app").length;b.hidemenu();1>e||c.alert("\u786e\u5b9a\u5173\u95ed\u6240\u6709\u7a97\u53e3\uff1f",{icon:0,btn:["\u786e\u5b9a","\u53d6\u6d88"],zIndex:parseInt(c.zIndex+1),yes:function(e,d){a(document).find(".taskbar-app").remove();c.closeAll("iframe");c.close(e)},end:function(){}})},
showdesktop:function(e){b.hidemenu();a(document).find(".layui-layer .layui-layer-min").click();a(document).find(".taskbar-app").removeClass("taskbar-app-on")},hidemenu:function(e){a(".desktop-menu").hide()},hidopeningemenu:function(){a(".opening-menu").removeClass("opening-menu-on")},openingmenu:function(e){a("#opening-menu").toggleClass("opening-menu-on").off("mousedown",b.stope).on("mousedown",b.stope);a(document).off("mousedown",b.hidopeningemenu).on("mousedown",b.hidopeningemenu);a(window).off("resize",
b.hidopeningemenu).on("resize",b.hidopeningemenu);e.off("mousedown",b.stope).on("mousedown",b.stope)},hide:function(){c.closeAll("tips")},pattern:function(a){var b=new Date,d={"M+":b.getMonth()+1,"d+":b.getDate(),"h+":0==b.getHours()%12?12:b.getHours()%12,"H+":b.getHours(),"m+":b.getMinutes(),"s+":b.getSeconds(),"q+":Math.floor((b.getMonth()+3)/3),S:b.getMilliseconds()},c={0:"\u65e5",1:"\u4e00",2:"\u4e8c",3:"\u4e09",4:"\u56db",5:"\u4e94",6:"\u516d"};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(b.getFullYear()+
"").substr(4-RegExp.$1.length)));/(E+)/.test(a)&&(a=a.replace(RegExp.$1,(1<RegExp.$1.length?2<RegExp.$1.length?"\u661f\u671f":"\u5468":"")+c[b.getDay()+""]));for(var h in d)(new RegExp("("+h+")")).test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?d[h]:("00"+d[h]).substr((""+d[h]).length)));return a},refreshtime:function(){a(".taskbar-time").attr("title",b.pattern("yyyy\u5e74MM\u6708dd\u65e5 EEE"));a("#laydate-hs").text(b.pattern("HH:mm"));a("#laydate-ymd").text(b.pattern("yyyy/MM/dd"))},appopen:function(b){var l=
!0,d=b.data();a(document).find(".taskbar-app").each(function(c,f){a(f).attr("title")==d.title&&(b.removeClass("disabled"),a(f).click(),l=!1)});if(l){var f=a(".taskbar-app").length+1,h=parseInt((layui.jquery(".desktop-taskbar").width()-160)/110);if(f>h)c.alert("\u8bf7\u5148\u5173\u95ed\u4e00\u4e9b\u7a97\u53e3\uff01",{title:"\u5b98\u4eba\u4f11\u606f\u4e0b\uff1f",icon:2,zIndex:c.zIndex+1},function(a){b.removeClass("disabled");c.close(a)});else{var f=d.width?d.width:.8*a(".desktop-container").width(),
h=d.height?d.height:.9*a(".desktop-container").height(),g="",k=c.open({type:2,title:[d.title,"background-color:#4a8cce;color:#fff"],shadeClose:!0,shade:!1,maxmin:!0,area:[f+"px",h+"px"],content:d.url,zIndex:c.zIndex,skin:"desktop-win-app",success:function(a,d){b.removeClass("disabled");c.setTop(a);a.find(".layui-refreswind").is(":visible")||a.find(".layui-layer-setwin").prepend('<a class="layui-icon small-click layui-refreswind" data-type="refreshWind" data-id="'+d+'">&#x1002;</a>')},min:function(d,
b){a(d).hide();a("#"+g).removeClass("taskbar-app-on");var e=[];a(document).find(".layui-layer-iframe:visible").each(function(d,b){e.push(a(b).css("z-index"))});if(1>e.length)return!1;var c=e.sort().pop();a(document).find(".layui-layer-iframe:visible").each(function(d,b){if(a(b).css("z-index")==c)return a("#taskbar-"+a(b).attr("id")).addClass("taskbar-app-on"),!1});return!1},full:function(a,b){},restore:function(a,b){},moveEnd:function(){a("#"+g).addClass("taskbar-app-on").siblings().removeClass("taskbar-app-on")},
cancel:function(b){var d=layui.data("desktop-app")["desktop-app-"+b];layui.each(d,function(a,b){c.close(b)});layui.data("desktop-app",{key:"desktop-app-"+b,remove:!0});a("#"+g).remove()},end:function(){b.removeClass("disabled")}}),g="taskbar-layui-layer"+k,f="",f=d.isicon?""+('<div class="layui-inline layui-elip taskbar-app taskbar-app-on" title="'+d.title+'" id="'+g+'"><i class="layui-icon" style=" background-color:'+d.iconbg+'">'+d.icon+'</i><span class="desktop-title layui-elip">'+d.title+"</span></div>"):
""+('<div class="layui-inline layui-elip taskbar-app taskbar-app-on" title="'+d.title+'" id="'+g+'"><span class="desktop-title layui-elip">'+d.title+"</span></div>");a("#"+g).is(":visible")||(a(".desktop-taskbar-app-list").append(f),a("#"+g).on("click",function(){var b=a(this);b.hasClass("taskbar-app-on")?a("#layui-layer"+k).find(".layui-layer-setwin .layui-layer-min").click():(b.addClass("taskbar-app-on").siblings().removeClass("taskbar-app-on"),a("#layui-layer"+k).show(),c.zIndex=parseInt(c.zIndex+
1),c.style(k,{zIndex:c.zIndex}))}).siblings().removeClass("taskbar-app-on"))}}},stope:function(a){a=a||window.event;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},arrange:function(b){b=a(".swiper-slide-active").index();b=a(".desktopContainer:eq("+(""==b||void 0==b?0:b)+")");var c=a(".desktopContainer"),d=0,f=0,h=96,g=96,k=0,k=c.height()-40;c.width();b.find(".desktop-app").each(function(b,c){a(c).css("top",f+"px");a(c).css("left",d+"px");g=a(c).height();h=a(c).width();f=f+g+10+10;f>=k-65&&
(f=0,d=d+h+10)})},refreshWind:function(b){b=b.data("id");url=a("#layui-layer-iframe"+b).attr("src");c.iframeSrc(b,url)},init:function(){var e=["{{# layui.each(d.menu, function(index, menuitem){ if(index>="+parseInt(desktpData.menu.length-1)+")return false;}}",'<div class="swiper-slide"><div class="desktopContainer"  data-menuid="{{menuitem.menuid}}" data-name="{{menuitem.name}}" >{{# layui.each(menuitem.app, function(index, app){}}<div class="desktop-app" data-id="{{d.apps[app].appid}} " data-title="{{d.apps[app].name}}" data-url="{{d.apps[app].url}}" data-icon="{{d.apps[app].icon}}" data-iconbg="{{d.apps[app].iconbg}}"  data-isicon="{{d.apps[app].isicon}}" data-height="{{d.apps[app].height}}" data-width="{{d.apps[app].width}}" data-fid="{{app}}"><i class="layui-icon" style="background-color:{{d.apps[app].iconbg}}">{{d.apps[app].icon}}</i><span class="desktop-title layui-elip">{{d.apps[app].name}}</span></div>{{# });}}</div></div>{{# }); }} '].join(""),
l=["{{# layui.each(d.menu["+parseInt(desktpData.menu.length-1)+"].app, function(index, app){}}",'<div class="desktop-app" data-id="{{d.apps[app].appid}} " data-title="{{d.apps[app].name}}" data-url="{{d.apps[app].url}}" data-icon="{{d.apps[app].icon}}" data-iconbg="{{d.apps[app].iconbg}}"  data-isicon="{{d.apps[app].isicon}}" data-height="{{d.apps[app].height}}" data-width="{{d.apps[app].width}}" data-fid="{{app}}"><i class="layui-icon" style="background-color:{{d.apps[app].iconbg}}">{{d.apps[app].icon}}</i><span class="desktop-title layui-elip">{{d.apps[app].name}}</span></div>{{# });}}'].join("");
m(e).render(desktpData,function(b){a(".swiper-wrapper").html(b)});m(l).render(desktpData,function(b){a(".opening-menu-app-list").html(b)});a(".desktop-container").css("height",a(window).height()-30);c.open({type:1,title:"\u4fbf\u7b7e",area:"250px",skin:"layui-layer-notepaper",offset:"rt",anim:6,shade:!1,content:'<textarea class="layui-textarea notepaper">QQ\u7fa4\uff1a601178086(\u6709\u6e90\u7801););2017-2-7:\u66f4\u65b0\u4e86\u5206\u9875\u673a\u5236\uff0c\u7075\u6d3b\u914d\u7f6e;2017-1-22:\u7a97\u4f53\u65b0\u52a0\u5237\u65b0\u6309\u94ae;2017-1-11:\u65b0\u52a0\u80cc\u666f\u56fe\u7247\u66f4\u6539\uff0c\u770b\u83dc\u5355\uff1b\u89e3\u51b3\u4e86\u9501\u5c4fz-index\u4e0d\u591f\u7684\u95ee\u9898\uff1b2016-12-27:\u91cd\u5199\u4e86js;2016-12-30:\u4fee\u590d\u4e86\u53f3\u4e0b\u89d2\u65f6\u95f4\u663e\u793a\uff0clayim\u8d77\u59cb\u4f4d\u7f6e\u4fee\u590d\u5728\u7a97\u4f53\u5185\uff1b2017-1-5:\u4fee\u590d\u4e2a\u4eba\u8d44\u6599\u63d0\u793a;2:\u4fee\u590d\u4efb\u52a1\u680f\u8d85\u591a\u63d0\u793a\u540e\u70b9\u51fb\u5931\u6548\u95ee\u9898\uff1b\u2014\u2014B</textarea>',
success:function(b,c){a(b).find(".notepaper").on("change",function(){console.log(a(this).val())})}});new Swiper(".swiper-container",{pagination:1>=parseInt(desktpData.menu.length-1)?"":".swiper-pagination",simulateTouch:!1,slidesPerView:1,paginationClickable:!0,spaceBetween:30,keyboardControl:!0,mousewheelControl:!0,onSlideChangeEnd:function(a){b.arrange(a.realIndex)}});a(window).resize(function(d){a(".desktop-container").css("height",a(window).height()-40);a(".desktopContainer").css("height",a(".desktop-container").height());
b.arrange()});a(".desktopContainer").sortable({revert:!0});a(".desktopContainer").sortable({connectToSortable:".desktopContainer",stop:function(a,c){b.arrange()}}).disableSelection();b.arrange();setInterval(b.refreshtime,1E3);a(document).contextmenu(function(){return!1});a(".desktopContainer").on("contextmenu",function(b){var c=b.clientX;b=b.clientY;var e=a(".desktop-menu"),g=document.body.clientWidth,k=document.body.clientHeight,c=c+e.width()>=g?g-e.width()-15:c;b=b+e.height()>=k-40?k-e.height()-
15:b;e.css({top:b,left:c}).show()});a(".desktop-app").on("click",function(){var c=a(this);if(c.hasClass("disabled"))return!1;c.addClass("disabled");b.appopen(c)})}};b.init();a("body").on("click",".small-click",function(){var c=a(this),l=c.data("type");b[l]?b[l].call(this,c):""})}();