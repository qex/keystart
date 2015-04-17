if ( 'OVER' != getCookie("FIRSTTIME") ) {
    setCookie("_B", "http://www.baidu.com");
    setCookie("_G", "http://www.google.com");
    setCookie("_Q", "http://www.qq.com");
    setCookie("_T", "http://www.taobao.com");
    setCookie("_V", "http://www.v2ex.com");    
    setCookie("_W", "http://www.weibo.com");
    setCookie("_Y", "http://www.youku.com");
    setCookie("FIRSTTIME", "OVER");
};

var urlcache = {};

for (var i = 48; i <= 90; i++) {
    var code = String.fromCharCode(i);
    var v = getCookie("_" + code);
    if (v != null && v != '' && typeof(v) != 'undefined') {
        urlcache[code] = v;
        $("#LI_" + code).prepend('<img id="' + code + '" class="fav" src="' + getico(v) + '" align="center">')
    }
};

$(document).keyup(function(ev) {
    if (ev.ctrlKey) return false;
    var code = String.fromCharCode(ev.keyCode);
    $("#LI_" + code).addClass("active");
    setTimeout('$("#LI_' + code + '").removeClass("active");', 300);
    if (urlcache[code] == '' || typeof(urlcache[code]) == 'undefined') {
        $("#message").html('找不到这个按键的配置,注意切换您的输入法哦~~~');
        setTimeout('$("#message").html("");', 2000)
    } else window.location.href = urlcache[code];
});

$("#main li").mouseenter(function() {
    $("#tempdate").val($(this).attr('id').replace("LI_", ""));
    $(this).append('<div class="oper"><span><a onclick="return del()" class="del" title="删除"><img src="images/delete-icon.png"></a></span><span><a onclick="return update()" class="edit" title="编辑"><img src="images/edit-icon.png"></a></span></div>')
}).mouseleave(function() {
    $("#tempdate").val('');
    $(".oper").remove()
});

$("#main li").click(function() {
    var code = $(this).attr('id').replace('LI_', '');
    if (urlcache[code] != '' && typeof(urlcache[code]) != 'undefined') {
        window.location.href = urlcache[code];
    }
});

function del() {
    var code = $("#tempdate").val();
    urlcache[code] = '';
    $("#" + code).remove();
    deleteCookie("_" + code);
    return false;
};

function update() {
    var code = $("#tempdate").val();
    $("#LI_" + code).css('background', '#ccf');
    var u = window.prompt("请输入键位 [" + code + "] 对应的网站地址", "");
    $("#LI_" + code).css('background', '#fff');
    if (u.indexOf('http://') == -1 && u.indexOf('https://') == -1) {
        u = 'http://' + u
    };
    if (!IsURL(u)) {
        alert('网站地址输入错误!请核对');
        return false;
    };
    urlcache[code] = u;
    $("#" + code).remove();
    $("#LI_" + code).prepend('<img id="' + code + '" class="fav" src="' + getico(u) + '" align="center">');
    setCookie("_" + code, u);
    return true;
};

function getico(url) {
    var s = url.indexOf("//");
    temp = url.substring(s + 2);
    var s1 = temp.indexOf("/");
    if (s1 == -1) {
        s1 = temp.length
    };
    return url.substring(0, s1 + s + 2) + '/favicon.ico'
};

function setCookie(name, value, path, domain, secure) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + (100 * 365 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + escape(value) + ((expdate) ? "; expires=" + expdate.toGMTString() : "") + "; path=/";
};

function deleteCookie(name) {
    expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000));
    setCookie(name, "", expdate)
};

function getCookie(name) {
    var bikky = document.cookie;
    name += "=";
    var i = 0;
    while (i < bikky.length) {
        var offset = i + name.length;
        if (bikky.substring(i, offset) == name) {
            var endstr = bikky.indexOf(";", offset);
            if (endstr == -1) endstr = bikky.length;
            return decodeURIComponent(bikky.substring(offset, endstr))
        };
        i = bikky.indexOf(" ", i) + 1;
        if (i == 0) break
    };
    return
};

function IsURL(str_url) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return !!re.test(str_url);
};
