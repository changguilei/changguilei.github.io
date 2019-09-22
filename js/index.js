window.onload = function() {
    // 点击实现页面小星星
    var color_arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    $(document).on('click', function(event) {
        var x = event.clientX;
        var y = event.clientY;
        var heart_color = "#";
        for (var i = 0; i < 6; i++) {
            heart_color += color_arr[rand(0, color_arr.length - 1)];
        };
        $("body").append("<span  class='heart  glyphicon  glyphicon-heart'  style='color:" + heart_color + ";left:" + x + "px;top:" + y + "px;" + "'></span>");
    });
    $("body").on('webkitAnimationEnd', ".heart", function(event) {
        $(this).remove();
    });
    // 动态渲染轮播图
    var w = $("body").width();
    $.ajax({
        url: 'js/index.json',
        type: 'get',
        dataType: 'text',
        success: function(msg) {
            eval("arr=" + msg);
            arr.push(w);
            var info = {
                items: arr
            };
            var template = _.template($("#indicators").html());
            var str = template(info);
            $(".wjs-banner .carousel-indicators").html(str);
            var template2 = _.template($("#inner").html());
            var str2 = template2(info);
            $(".wjs-banner .carousel-inner").html(str2);
            $(".wjs-banner .carousel-indicators li:eq(0)").addClass('active');
            $(".wjs-banner .carousel-inner  div.item:eq(0)").addClass('active');
        }
    })
    window.onresize = function() {
            var w = $("body").width();
            arr[arr.length - 1] = w;
            var info = {
                items: arr
            };
            $(".wjs-banner .carousel-inner").empty();
            var template2 = _.template($("#inner").html());
            var str2 = template2(info);
            $(".wjs-banner .carousel-inner").html(str2);
            var index_active = $(".wjs-banner .carousel-indicators li.active").index();
            $(".wjs-banner .carousel-inner  div.item:eq(" + index_active + ")").addClass('active');
        }
        // 轮播图的滑动效果
    var touchstart_x, touchstart_y;
    $(".wjs-banner").on('touchstart', function(event) {
        touchstart_x = event.originalEvent.targetTouches[0].clientX;
        touchstart_y = event.originalEvent.targetTouches[0].clientY;
    });

    //*************左右滑动**************//
    $(".wjs-banner").on('touchend', function(event) {
        var touchmove_x = event.originalEvent.changedTouches[0].clientX;
        var touchmove_y = event.originalEvent.changedTouches[0].clientY;
        var res = touch_dir(touchstart_x, touchstart_y, touchmove_x, touchmove_y);
        if (res[1] < 50) {
            return false;
        }
        if (res[0] == 3) {
            $(".wjs-banner").carousel('next');
        }
        if (res[0] == 4) {
            $(".wjs-banner").carousel('prev');
        }
    });
    // 动态渲染轮播图

    //先获取.product .nav的内容宽度
    var real_width = 0;
    $(".product .nav  li").each(function(index, el) {
        real_width += $(el).width();
    });
    $(".product .nav").css('width', real_width + "px");
    var container_width = $(".product .container").width();
    var compare_result = container_width - real_width;
    // tab栏的左右滑动
    var touch_start_x, distance_before;
    $(".product .nav").on('touchstart', function(event) {
        touch_start_x = event.originalEvent.targetTouches[0].clientX;
        var transform_before = $(this).css('transform');
        distance_before = get_translate(transform_before)[0];
    });

    $(".product .nav").on('touchmove', function(event) {
        var touch_move_x = event.originalEvent.targetTouches[0].clientX;
        var distance = touch_move_x - touch_start_x + distance_before;
        var w = $(document).width();
        if (compare_result < 0) {
            if (distance > 30) {
                distance = 30;
            }
            if (distance < (-(real_width - w + 30))) {
                distance = -(real_width - w + 30);
            }
            $(this).css('transform', 'translate(' + distance + 'px,0)');
        } else {
            if (distance > 30) {
                distance = 30;
            }
            if (distance < -30) {
                distance = -30;
            }
            $(this).css('transform', 'translate(' + distance + 'px,0)');
        }

    });

    $(".product .nav").on('touchend', function(event) {
        var touch_end_x = event.originalEvent.changedTouches[0].clientX;
        var distance = touch_end_x - touch_start_x + distance_before;
        var w = $(document).width();
        if (compare_result < 0) {
            if (distance > 0) {
                distance = 0;
            }
            if (distance < (-(real_width - w))) {
                distance = -(real_width - w);
            }
            $(this).css('transform', 'translate(' + distance + 'px,0)');
        } else {
            distance = 0;
            $(this).css('transform', 'translate(' + distance + 'px,0)');
        }
    });

        // 初始化提示工具
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })

        // 固定导航栏
        $(window).on('scroll', function(event) {
           var h=$(this).scrollTop();
           if(h>200){
            $("#wjs-nav").css('position', 'fixed');
           }else{
            $("#wjs-nav").css('position', 'static');
           }
        });
}