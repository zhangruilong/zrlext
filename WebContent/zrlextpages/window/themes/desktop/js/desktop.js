/*
 * Windows WebOS
 * WEB 桌面风格，基于Layui-打造的Windows WebOS桌面风格，实现了右键、开始菜单、返回桌面等一些列功能。窗口全部由 layer 完成
 * http://test.90zs.net/window
 * Copyright 2016-2017, SMALL,1531982850
 * The 90zs.net
 * http://www.90zs.net/
 * Released on: 12, 2016
*/
function desktop() {
    var n = layui.form(),
    $ = layui.jquery,
    layer = layui.layer,
    laytpl = layui.laytpl,
    laydate = layui.laydate;
    $("#loading").hide().remove();
    var p = {
        setting: function(a) {
            layer.alert("对不起，我还不能满足你", {
                icon: 5,
                title: "系统重要提示"
            })
        },
        theme: function(a) {
            p.hidemenu();
            layer.alert("对不起，我还不能满足你", {
                icon: 5,
                title: "系统重要提示"
            })
        },
        users: function(a) {
            p.hidemenu();
            layer.alert("对不起，我还不能满足你", {
                icon: 5,
                title: "系统重要提示"
            })
        },
        loginout: function(a) {
            p.hidemenu();
            layer.alert("现在注销？", {
                icon: 0,
                btn: ['确定', '取消'],
                zIndex: parseInt(layer.zIndex + 1),
                yes: function(a, b) {
                	window.location.href = "../charisma/login.html";
                },
                end: function() {}
            })
        },
//        lockscreen: function(b) {
//            layer.open({
//                type: 1,
//                title: false,
//                closeBtn: false,
//                area: '300px;',
//                shade: .8,
//                id: 'LAY_layuipro',
//                resize: false,
//                btn: ['解锁'],
//                btnAlign: 'c',
//                moveType: 1,
//                content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">好了，封印解除</div>',
//                success: function(a) {}
//            });
//            p.hidemenu()
//        },
        closeall: function(c) {
            var d = $(".taskbar-app").length;
            p.hidemenu();
            if (d < 1) return;
            layer.alert("确定关闭所有窗口？", {
                icon: 0,
                btn: ['确定', '取消'],
                zIndex: parseInt(layer.zIndex + 1),
                yes: function(a, b) {
                    $(document).find(".taskbar-app").remove();
                    layer.closeAll('iframe');
                    layer.close(a)
                },
                end: function() {}
            })
        },
        showdesktop: function(a) {
            p.hidemenu();
            $(document).find(".layui-layer .layui-layer-min").click();
            $(document).find(".taskbar-app").removeClass("taskbar-app-on")
        },
        hidemenu: function(a) {
            $(".desktop-menu").hide()
        },
        hidopeningemenu: function() {
            $(".opening-menu").removeClass("opening-menu-on")
        },
        openingmenu: function(a) {
            $("#opening-menu").toggleClass("opening-menu-on").off('mousedown', p.stope).on('mousedown', p.stope);
            $(document).off('mousedown', p.hidopeningemenu).on('mousedown', p.hidopeningemenu);
            $(window).off('resize', p.hidopeningemenu).on('resize', p.hidopeningemenu);
            a.off('mousedown', p.stope).on('mousedown', p.stope)
        },
        hide: function() {
            layer.closeAll('tips')
        },
        pattern: function(a) {
            var b = new Date();
            var o = {
                "M+": b.getMonth() + 1,
                "d+": b.getDate(),
                "h+": b.getHours() % 12 == 0 ? 12 : b.getHours() % 12,
                "H+": b.getHours(),
                "m+": b.getMinutes(),
                "s+": b.getSeconds(),
                "q+": Math.floor((b.getMonth() + 3) / 3),
                "S": b.getMilliseconds()
            };
            var c = {
                "0": "日",
                "1": "一",
                "2": "二",
                "3": "三",
                "4": "四",
                "5": "五",
                "6": "六"
            };
            if (/(y+)/.test(a)) {
                a = a.replace(RegExp.$1, (b.getFullYear() + "").substr(4 - RegExp.$1.length))
            }
            if (/(E+)/.test(a)) {
                a = a.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期": "周") : "") + c[b.getDay() + ""])
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(a)) {
                    a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                }
            }
            return a
        },
        refreshtime: function() {
            $(".taskbar-time").attr("title", p.pattern('yyyy年MM月dd日 EEE'));
            $("#laydate-hs").text(p.pattern('HH:mm'));
            $("#laydate-ymd").text(p.pattern('yyyy/MM/dd'))
        },
        appopen: function(g) {
            var h = true,
            data = g.data();
            $(document).find(".taskbar-app").each(function(a, b) {
                if ($(b).attr("title") == data.title) {
                    g.removeClass("disabled");
                    $(b).click();
                    h = false;
                    return
                }
            });
            if (!h) return;
            var i = $(".taskbar-app").length + 1,
            maxcount = parseInt((layui.jquery(".desktop-taskbar").width() - 160) / 110);
            if (i > maxcount) {
                layer.alert("请先关闭一些窗口！", {
                    title: "官人休息下？",
                    icon: 2,
                    zIndex: layer.zIndex + 1
                });
                return
            }
            var j = data.width ? data.width: $(".desktop-container").width() * 0.8,
            height = data.height ? data.height: $(".desktop-container").height() * 0.9;
            var k = '';
            var l = layer.open({
                type: 2,
                title: [data.title, 'background-color:#485664;color:#fff'],
                shadeClose: true,
                shade: false,
                maxmin: true,
                area: [j + 'px', height + 'px'],
                content: data.url,
                zIndex: layer.zIndex,
                skin: 'desktop-win-app',
                success: function(a, b) {
                    g.removeClass("disabled");
                    layer.setTop(a)
                },
                min: function(c, d) {
                    $(c).hide();
                    $("#" + k).removeClass("taskbar-app-on");
                    var e = [];
                    $(document).find(".layui-layer-iframe:visible").each(function(a, b) {
                        e.push($(b).css("z-index"))
                    });
                    if (e.length < 1) return false;
                    var f = e.sort().pop();
                    $(document).find(".layui-layer-iframe:visible").each(function(a, b) {
                        if ($(b).css("z-index") == f) {
                            $("#taskbar-" + $(b).attr("id")).addClass("taskbar-app-on");
                            return false
                        }
                    });
                    return false
                },
                full: function(a, b) {},
                restore: function(a, b) {},
                moveEnd: function() {
                    $("#" + k).addClass("taskbar-app-on").siblings().removeClass("taskbar-app-on")
                },
                cancel: function(c) {
                    var d = layui.data('desktop-app')['desktop-app-' + c];
                    layui.each(d,
                    function(a, b) {
                        layer.close(b)
                    });
                    layui.data('desktop-app', {
                        key: 'desktop-app-' + c,
                        remove: true
                    });
                    $("#" + k).remove()
                },
                end: function() {
                    g.removeClass("disabled")
                }
            });
            k = "taskbar-layui-layer" + l;
            var m = "";
            if (data.isicon) {
                m = ['<div class="layui-inline layui-elip taskbar-app taskbar-app-on" title="' + data.title + '" id="' + k + '"><i class="layui-icon" style=" background-color:' + data.iconbg + '">' + data.icon + '</i><span class="desktop-title layui-elip">' + data.title + '</span></div>'].join("")
            } else {
                m = ['<div class="layui-inline layui-elip taskbar-app taskbar-app-on" title="' + data.title + '" id="' + k + '"><span class="desktop-title layui-elip">' + data.title + '</span></div>'].join("")
            }
            if ($("#" + k).is(":visible")) return;
            $(".desktop-taskbar-app-list").append(m);
            $("#" + k).on("click",
            function() {
                var a = $(this);
                if (a.hasClass("taskbar-app-on")) {
                    $("#layui-layer" + l).find(".layui-layer-setwin .layui-layer-min").click()
                } else {
                    a.addClass("taskbar-app-on").siblings().removeClass("taskbar-app-on");
                    $("#layui-layer" + l).show();
                    layer.zIndex = parseInt(layer.zIndex + 1);
                    layer.style(l, {
                        zIndex: layer.zIndex
                    })
                }
            }).siblings().removeClass("taskbar-app-on")
        },
        stope: function(e) {
            e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
        },
        arrange: function(c) {
            c = $(".swiper-slide-active").index();
            c = c == '' || c == undefined ? 0 : c;
            var d = $(".desktopContainer:eq(" + c + ")");
            var e = $(".desktopContainer");
            var f = {
                x: 0,
                y: 0,
                bottom: 65,
                width: 96,
                height: 96,
                parent: {
                    height: 0,
                    width: 0
                },
                padding: {
                    top: 10,
                    left: 10,
                    right: 0,
                    bottom: 10
                }
            };
            f.parent.height = e.height() - 40;
            f.parent.width = e.width();
            d.find(".desktop-app").each(function(a, b) {
                $(b).css("top", f.y + "px");
                $(b).css("left", f.x + "px");
                f.height = $(b).height();
                f.width = $(b).width();
                f.y = f.y + f.height + f.padding.bottom + f.padding.bottom;
                if (f.y >= f.parent.height - f.bottom) {
                    f.y = 0;
                    f.x = f.x + f.width + f.padding.left
                }
            })
        },
        init: function() {
//            var c = ['<div class="desktop-app" data-id="{{d.apps[app].appid}} " data-title="{{d.apps[app].name}}" data-url="{{d.apps[app].url}}" data-icon="{{d.apps[app].icon}}" data-iconbg="{{d.apps[app].iconbg}}"  data-isicon="{{d.apps[app].isicon}}" data-height="{{d.apps[app].height}}" data-width="{{d.apps[app].width}}" data-fid="{{app}}">', '<i class="layui-icon" style="background-color:{{d.apps[app].iconbg}}">{{d.apps[app].icon}}</i>', '<span class="desktop-title layui-elip">{{d.apps[app].name}}</span>', '</div>'].join(""),
//            desktopTmp = ['{{# layui.each(d.menu, function(index, menuitem){ if(index>=3)return false;}}',
//            	'<div class="swiper-slide">', 
//            	'<div class="desktopContainer"  data-menuid="{{menuitem.menuid}}" data-name="{{menuitem.name}}" >', 
//            	'{{# layui.each(menuitem.app, function(index, app){}}', c, 
//            	'{{# });}}', '</div>', '</div>', '{{# }); }} '].join(""),
//            desktopOpeningTmp = ['{{# layui.each(d.menu[3].app, function(index, app){}}', c, '{{# });}}'].join("");
//            laytpl(desktopTmp).render(desktpData,
//            function(a) {
//                $(".swiper-wrapper").html(a)
//            });
//            laytpl(desktopOpeningTmp).render(desktpData,
//            function(a) {
//                $(".opening-menu-app-list").html(a)
//            });
            $(".desktop-container").css("height", $(window).height() - 30);
            layer.open({
                type: 1,
                title: '便签',
                area: '250px',
                skin: 'layui-layer-notepaper',
                offset: 'rt',
                anim: 6,
                shade: false,
                content: '<textarea class="layui-textarea notepaper">欢迎登入桌面版！</textarea>',
                success: function(a, b) {
                    $(a).find(".notepaper").on("change",
                    function() {
                        console.log($(this).val())
                    })
                }
            });
            var d = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                simulateTouch: false,
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 30,
                keyboardControl: true,
                mousewheelControl: true,
                onSlideChangeEnd: function(a) {
                    p.arrange(a.realIndex)
                }
            });
            $(window).resize(function(a) {
                $(".desktop-container").css("height", $(window).height() - 40);
                $(".desktopContainer").css("height", $(".desktop-container").height());
                p.arrange()
            });
            $(".desktopContainer").sortable({
                revert: true
            });
            $(".desktopContainer").sortable({
                connectToSortable: ".desktopContainer",
                stop: function(a, b) {
                    p.arrange()
                }
            }).disableSelection();
            p.arrange();
            p.refreshtime();
            setInterval(p.refreshtime, 1000);
            $(document).contextmenu(function() {
                return false
            });
            $(".desktopContainer").on("contextmenu",
            function(a) {
                var x = a.clientX,
                y = a.clientY,
                desktopmenu = $(".desktop-menu");
                var b = document.body.clientWidth,
                height = document.body.clientHeight;
                x = (x + desktopmenu.width()) >= b ? b - desktopmenu.width() - 15 : x;
                y = (y + desktopmenu.height()) >= height - 40 ? height - desktopmenu.height() - 15 : y;
                desktopmenu.css({
                    "top": y,
                    "left": x
                }).show()
            });
            $(".desktop-app").on("click",
            function() {
                var a = $(this);
                if (a.hasClass("disabled")) return false;
                a.addClass("disabled");
                p.appopen(a)
            })
        }
    };
    p.init();
    $('body').on('click', '.small-click',
    function() {
        var a = $(this),
        type = a.data('type');
        p[type] ? p[type].call(this, a) : ''
    })
};