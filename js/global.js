function dw(a) {
    document.write(a + "<br/>");
}

function cl(a) {
        console.log(a);
    }
    // 格式化字符串
function trim(str) {
        var a = str.replace(/\s/g, "");
        return a;
    }
    //替换字符串的子串
function substr_replace(str, start, length, rep) {
        //139****4610
        var str = String(str);
        var str1 = str.slice(0, start);
        if (start + length - str.length < 0) {
            var str2 = str.slice(start + length - str.length);
        } else {
            str2 = "";
        }
        return str1 + rep + str2;
    }
    //返回具体时间天，时，分，秒
function detailTime(timestamp) {
        var day = Math.floor(timestamp / 1000 / 3600 / 24);
        var hour = Math.floor((timestamp - day * 24 * 3600 * 1000) / 1000 / 3600);
        var min = Math.floor((timestamp - day * 24 * 3600 * 1000 - hour * 3600 * 1000) / 1000 / 60);
        var sec = Math.floor((timestamp / 1000) % 60);
        return [day, hour, min, sec];
    }
    // 根据date对象返回具体日期和时间
function riqi(date) {
        var a = (date.getUTCMonth() + 1 < 10) ? "0" + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1;
        var b = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
        var c = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
        var d = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
        var e = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
        return date.getFullYear() + "-" + a + "-" + b + "&nbsp;&nbsp;" + c + ":" + d + ":" + e;
    }
    // 添加一个cookie
function addCookie(name, value, expiresHours) {
        if (!expiresHours) {
            document.cookie = name + "=" + escape(value);
        }
        if (expiresHours > 0) {
            var now = new Date();
            var timestamp = now.getTime() + expiresHours * 60 * 60 * 1000;
            now.setTime(timestamp);
            document.cookie = name + "=" + escape(value) + ";expires=" + now.toUTCString();
        }
        if (expiresHours === "infinity") {
            document.cookie = name + "=" + escape(value) + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }
    }
    // 添加一个整站cookie
function setCookie(name, value, expiresHours) {
        if (!expiresHours) {
            document.cookie = name + "=" + escape(value) + ";path=/";
        }
        if (expiresHours > 0) {
            var now = new Date();
            var timestamp = now.getTime() + expiresHours * 60 * 60 * 1000;
            now.setTime(timestamp);
            document.cookie = name + "=" + escape(value) + ";expires=" + now.toUTCString() + ";path=/";
        }
        if (expiresHours === "infinity") {
            document.cookie = name + "=" + escape(value) + ";expires=Fri, 31 Dec 9999 23:59:59 GMT" + ";path=/";
        }
    }
    // 删除一个cookie
function reduceCookie(name) {
        var now2 = new Date();
        var timestamp2 = now2.getTime() - 10000;
        now2.setTime(timestamp2);
        document.cookie = name + "=" + "v" + ";expires=" + now2.toUTCString();
    }
    // 删除一个整站cookie
function delCookie(name) {
        var now2 = new Date();
        var timestamp2 = now2.getTime() - 10000;
        now2.setTime(timestamp2);
        document.cookie = name + "=" + "v" + ";expires=" + now2.toUTCString() + ";path=/";
    }
    // 获取指定的cookie值
function getCookie(name) {
        var str = document.cookie;
        var arr = str.split("; ")
        for (var i in arr) {
            var arr2 = arr[i].split("=");
            if (arr2[0] == name) {
                return unescape(arr2[1]);
            }
        }
    }
    // 返回网页可见区域宽高
function get_client() {
        if (window.innerWidth) {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        } else if (document.compatMode === "CSS1Compat") {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        }
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    }
    // 数组调序（旋转木马）
function turn_array(arr) {
    var length = arr.length;
    var temp = arr[0];
    for (var i = 0; i < length - 1; i++) {
        arr[i] = arr[i + 1];
    };
    arr[length - 1] = temp;
}

function reversal_array(arr) {
        var length = arr.length;
        var temp = arr[length - 1];
        for (var i = length - 1; i >= 1; i--) {
            arr[i] = arr[i - 1];
        };
        arr[0] = temp;
    }
    // 判断touch方向
function touch_dir(touchstart_x, touchstart_y, touchmove_x, touchmove_y) {
        var distance_x = Math.abs(touchmove_x - touchstart_x);
        var distance_y = Math.abs(touchmove_y - touchstart_y);
        if (distance_y > distance_x && touchmove_y < touchstart_y) {
            return [1, distance_y];
            // cl("向上滑动");
        } else if (distance_y > distance_x && touchmove_y > touchstart_y) {
            return [2, distance_y];
            // cl("向下滑动");
        } else if (distance_y < distance_x && touchmove_x > touchstart_x) {
            return [4, distance_x];
            // cl("向右滑动");
        } else if (distance_y < distance_x && touchmove_x < touchstart_x) {
            return [3, distance_x];
            // cl("手和图片都向左滑动，方向是一致的！");
        } else {
            return [0, 0];
            // cl("无滑动");
        }
    }
    // 产生随机整数[m~n]
function rand(m, n) {
    var a = Math.random();
    a *= (n - m + 1);
    var b = Math.floor(a + m);
    return b;
}
// 从transform中获取translate-x和translate-y
function get_translate(transform_value){
    if(transform_value==="none"){
        return [0,0];
    }else{
        transform_value=transform_value.substring(7);
        transform_value=transform_value.split(",");
        var x=parseFloat(transform_value[4]);
        var y=parseFloat(transform_value[5]);
        return [x,y];
    }
}