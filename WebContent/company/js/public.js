var pageIndex = 0,
preloadCount = 0;
var loopPlayback = false,
stopSwitch = true;
var videoSwiper, aboutSwiper;
$(function() {
    if (window.location.host > 0) {
        $("section").remove();
        return
    }
    var m = document.location.href.toLowerCase().match(/#p(\d+)$/);
    if (m != null) pageIndex = m[1] - 1;
    preload()
});
function preload() {
    $("body>section, .video .swiper-container, .video .swiper-slide").height($(window).height());
    var selector = $("section.video .swiper-container .swiper-slide:lt(2)");
    if (pageIndex > 0 && pageIndex < $("body>section").size()) selector = $("body>section").eq(pageIndex);
    preloadCount = selector.size();
    selector.each(function(i, item) {
        var imgUrl = $(item).css("background-image");
        var m = imgUrl.match(/url\("?([^"]+)"?\)/);
        loadImage(m[1], imgLoaded)
    })
}
function loadImage(url, callback) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        preloadCount--;
        callback.call(img);
        return
    }
    img.onload = function() {
        preloadCount--;
        callback.call(img)
    }
}
function imgLoaded() {
    if (preloadCount == 0) pageLoad()
}
function pageLoad() {
    $("body").bind("mousewheel",
    function(e, delta) {
        if (stopSwitch) return;
        stopSwitch = true;
        delta > 0 ? pageIndex--:pageIndex++;
        pageSwitching()
    }).bind("touchmove",
    function(e) {
        e.preventDefault()
    });
    $("body").swipe({
        swipeUp: function() {
            if (stopSwitch) return;
            stopSwitch = true;
            pageIndex++;
            pageSwitching()
        },
        swipeDown: function() {
            if (stopSwitch) return;
            stopSwitch = true;
            pageIndex--;
            pageSwitching()
        }
    });
    $("header").append('<div class="bg"></div>');
    $("header nav.menu").append('<i class="line"></i>');
    $("header .menu li a").bind("mouseenter",
    function() {
        var line = $("header .menu .line");
        if (line.css("display") == "none") line.show();
        line.stop().animate({
            width: $(this).width() + 10,
            left: parseInt($(this).position().left) - 5 + "px"
        },
        300)
    });
    $("header .menu").bind("mouseleave",
    function() {
        $("header .menu li.active a").trigger("mouseenter")
    }).trigger("mouseleave");
    $("header .menu").bind(whichTransitionEvent(),
    function() {
        $(this).trigger("mouseleave")
    });
    $("header .menu li").bind("click touchstart",
    function() {
        pageIndex = $(this).index();
        pageSwitching()
    });
	
    $("header .menu-icon span.glyphicon-th-large").bind("click touchstart",
    function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("header .menu").removeClass("active")
        } else {
            $(this).addClass("active");
            $("header .menu").addClass("active")
        }
    });
    for (var i = 0; i < $(".video .swiper-slide").size(); i++) $(".video .guide").append('<a></a>');
    $(".video .guide a").eq(0).addClass("active");
    videoSwiper = new Swiper(".video .swiper-container", {
        loop: true,
        autoplay: 4000,
        grabCursor: true,
        onSlideChangeStart: function() {
            resetVideoSwiperAnimation()
        },
        onSlideChangeEnd: function() {
            $(".video .guide a").removeClass("active").eq(videoSwiper.activeLoopIndex).addClass("active");
            videoSwiperAnimation()
        },
        onTouchEnd: function() {
            videoSwiper.startAutoplay()
        }
    });
    videoSwiper.stopAutoplay();
    $(".video .guide a").bind("mouseover click touchstart",
    function(e) {
        e.preventDefault();
        videoSwiper.stopAutoplay();
        videoSwiper.swipeTo($(this).index())
    }).mouseout(function(e) {
        videoSwiper.startAutoplay()
    });
    $(".video .movedown").bind("click touchstart",
    function() {
        if (stopSwitch) return;
        stopSwitch = true;
        pageIndex = 1;
        pageSwitching()
    });
    $(".cases .swiper-container").after('<a class="prev" href="javascript:;"></a><div class="swiper-container mini">' + $(".cases .swiper-container").html() + '</div><a class="next" href="javascript:;"></a>').after('<div class="swiper-container xs">' + $(".cases .swiper-container").html() + '</div>');
    $(".cases .xs .swiper-slide img").addClass("img-responsive");
    $(".cases .swiper-slide a").prepend('<div class="shade"><u></u></div>').append('<div class="bg"><u></u></div>');
    var menu = $(".aboutus ul.menu");
    menu.append('<li class="bg all"></li><li class="bg one"></li>');
    menu.find("li.all").height(menu.height());
    menu.find("li.one").height(menu.find("li:eq(0)").height());
    $(".aboutus .exp").after('<div class="expBg"></div><div class="shade"></div>');
	
    aboutSwiper = new Swiper(".aboutus .swiper-container.items", {
        loop: true,
        autoplay: 4000,
        grabCursor: true,
        onSlideChangeStart: function() {
            var li = $(".aboutus ul.menu li").eq(aboutSwiper.activeLoopIndex);
            var x = li.position();
            li.parent().find(".one").css("top", x.top).css("left", x.left);
            $(".aboutus ul.menu li").removeClass("active");
            li.addClass("active")
        },
        onTouchEnd: function() {
            aboutSwiper.startAutoplay()
        }
    });
    aboutSwiper.stopAutoplay();
    $(".aboutus ul.menu li").not(".bg").bind("mouseover click touchstart",
    function(e) {
        e.preventDefault();
        aboutSwiper.stopAutoplay();
        aboutSwiper.swipeTo($(this).index())
    }).bind("mouseout",
    function() {
        aboutSwiper.startAutoplay()
    }).eq(0).addClass("active");
    $(".contact .box .wechat img").addClass("img-responsive");
    $(window).bind("resize",
    function(e) {
        initLayout();
        var lock = false;
        var selector = "body>section.active";
        if (pageIndex == 0) selector = ".video .swiper-slide.active .box";
        $(selector).bind(whichTransitionEvent(),
        function() {
            initLayout();
            if (lock) return;
            else lock = true;
            pageSwitching();
            $("header .menu").trigger("mouseleave");
            $(".dock").css("top", ($(window).height() - $(".dock").height()) / 2 + 35)
        })
    });
    dockEvent();
    var tEvent = whichTransitionEvent();
    if (tEvent == undefined) {
        initLayout();
        var fun = '$("div.welcome").animate({opacity:"0", zIndex:"-1"}, 1500, "swing", function(){ pageSwitching(); })';
        setTimeout(fun, 600);
        pageSwitching()
    } else {
        $("div.welcome").animate({
            opacity: "0",
            zIndex: "-1"
        },
        1500, "swing",
        function() {
            initLayout();
            pageSwitching()
        })
    }
}
function initLayout() {
    $("body>section, .video .swiper-container, .video .swiper-slide").height($(window).height());
    var hhNormal = $("header").height();
    var hhFixed = 70;
    if (hhNormal == 42) hhFixed = 60;
    else if (hhNormal == 0) hhFixed = 0;
    $(".video .swiper-slide").each(function(i, item) {
        if ($(item).hasClass("nth1")) {
            var boxMt = 220;
            var boxWidth = $(item).find(".left").width() + $(item).find(".right").width();
            $(item).find(".box").css("margin-top", boxMt).css("width", boxWidth);
            $(item).find(".shade").css("top", boxMt - 711)
        } else if ($(item).hasClass("nth2")) {
			var boxMt = 220
            $(item).find(".box").css("top", boxMt)
        } else if ($(item).hasClass("nth3")) {
            boxHeight = 207;
			var boxMt = 220
            if ($(item).find(".box .bottom").css("font-size") == "12px") boxHeight = 134;
            $(item).find(".box").css("margin-top", boxMt)
        } else if ($(item).hasClass("nth4")) {
            var boxMt = 220;
            $(item).find(".box").css("margin-top", boxMt)
        }
    });
    var items = $(".business ul.items li");
    if ($(window).width() > 1000) {
        var itemMarginLeft = items.css("margin-left").replace("px", "");
        var width = items.outerWidth() * items.size() + itemMarginLeft * 2 * items.size() + 4 * (items.size() - 1) + 2;
        $(".business ul.items").width(width)
    } else {
        var itemWidth = items.outerWidth() + 25;
        var lineSize = parseInt($(window).width() / itemWidth);
        $(".business ul.items").width(itemWidth * lineSize + 2)
    }
    var box = $(".business .box");
    var boxTop = parseInt(($(window).height() - box.height() + hhFixed) / 2);
    box.css("top", boxTop);
    box = $(".cases .box");
    boxTop = parseInt(($(window).height() - box.height() + hhFixed) / 2);
    box.css("top", boxTop);
    box = $(".clients .box");
    boxTop = parseInt(($(window).height() - box.height() + hhFixed) / 2);
    box.css("top", boxTop);
    box = $(".quality .box");
    boxTop = parseInt(($(window).height() - box.height() + hhFixed) / 2);
    box.css("top", boxTop);
    items = $(".aboutus .items");
    items.css("top", "150px");
    var li = $(".aboutus ul.menu li").eq(aboutSwiper.activeLoopIndex);
    var x = li.position();
    li.parent().find(".one").css("top", x.top).css("left", x.left);
    box = $(".contact .box");
    boxTop = parseInt(($(window).height() - box.height() + hhFixed) / 3);
    box.css("top", boxTop)
}
function videoSwiperAnimation() {
    var e = $(".video .swiper-container .nth" + (videoSwiper.activeLoopIndex + 1).toString()).addClass("active");
    if (videoSwiper.activeLoopIndex == 1) {
        if (e.find(".box").width() == $(window).width()) e.find(".box").css("left", 0);
        else {
            e.find(".box").css("left", "0")
        }
    }
}
function resetVideoSwiperAnimation() {
    if (!loopPlayback) return;
    $(".video .swiper-slide").removeClass("active");
}
function sectionAnimation() {
    if (pageIndex == 0) {
        videoSwiper.startAutoplay();
        videoSwiperAnimation();
        return
    } else videoSwiper.stopAutoplay();
    var e = $("body>section").eq(pageIndex).addClass("active");
    if (pageIndex == 2) {
        var prevBtn = $(".cases a.prev");
        var nextBtn = $(".cases a.next");
        if (prevBtn.css("display") == "block") {
            var btnTop = $(".cases .mini").position().top + 140;
            prevBtn.css("top", btnTop);
            nextBtn.css("top", btnTop)
        }
    } else if (pageIndex == 3) {
        var clientsRow = parseInt($(".clients ul.items").height() / $(".clients ul.items li.one").height());
        var clientsCol = parseInt($(".clients ul.items").width() / $(".clients ul.items li.one").width());
        $(".clients ul.items li:gt(1)").each(function(i, item) {
            if ((i + 1) % clientsCol != 0) $(this).addClass("r");
            else $(this).removeClass("r");
            if (i < clientsCol * (clientsRow - 1)) $(this).addClass("b");
            else $(this).removeClass("b")
        })
    } else if (pageIndex == 4) {
        prevBtn = $(".quality a.prev");
        nextBtn = $(".quality a.next");
        if (prevBtn.css("display") == "block") {
            var btnTop = $(".quality .mini").position().top + 140;
            prevBtn.css("top", btnTop);
            nextBtn.css("top", btnTop)
        }
    }
    if (pageIndex == 6) aboutSwiper.startAutoplay();
    else aboutSwiper.stopAutoplay()
}
function resetSectionAnimation() {
    if (!loopPlayback) return;
    $("body>section").removeClass("active")
}
function pageSwitching() {
    if (pageIndex < 0) {
        pageIndex = 0;
        stopSwitch = false;
        return
    }
    if (pageIndex >= $("body>section").size()) {
        pageIndex = $("body>section").size() - 1;
        stopSwitch = false;
        return
    }
    var lock = false;
    $("html,body").stop().animate({
        scrollTop: $("body>section").eq(pageIndex).offset().top
    },
    500, "swing",
    function() {
        if (lock) return;
        else lock = true;
        resetVideoSwiperAnimation();
        resetSectionAnimation();
        sectionAnimation();
        stopSwitch = false
    });
    if (pageIndex > 0) $("header").addClass("fixed");
    else $("header").removeClass("fixed");
    $("header .menu li").removeClass("active").eq(pageIndex).addClass("active");
    $("header .menu").trigger("mouseleave")
}
function dockEvent() {
    $(".dock").height($(".dock ul.icons li").length * 50 + $(".dock a.switch").height() + 20).css("top", ($(window).height() - $(".dock").height()) / 2 + 35);
    $(".dock ul.icons li i").bind("mouseover click touchstart",
    function() {
        $(".dock ul.icons li").removeClass("active");
        $(this).parent().addClass("active")
    });
    $(".dock ul.icons li").bind("mouseleave",
    function() {
        $(".dock ul.icons li").removeClass("active")
    });
    $(".dock ul.icons li.up i").bind("click touchstart",
    function() {
        pageIndex--;
        pageSwitching()
    });
    $(".dock ul.icons li.down i").bind("click touchstart",
    function() {
        pageIndex++;
        pageSwitching()
    });
    $(".dock a.switch").bind("click",
    function() {
        if ($(this).hasClass("off")) {
            $(".dock").removeClass("close");
            $(this).removeClass("off")
        } else {
            $(".dock ul.icons li").removeClass("active");
            $(".dock").addClass("close");
            $(this).addClass("off")
        }
    })
}
function whichTransitionEvent() {
    var t;
    var el = document.createElement("qianzhu");
    var transitions = {
        "WebkitTransition": "webkitTransitionEnd",
        "MozTransition": "transitionend",
        "MSTransition": "msTransitionEnd",
        "OTransition": "oTransitionEnd",
        "transition": "transitionend"
    };
    for (t in transitions) {
        if (el.style[t] !== undefined) return transitions[t]
    }
}