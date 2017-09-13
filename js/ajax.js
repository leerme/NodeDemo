/**
 * Created by jjs on 2017/9/12.
 */
~function () {
    function creatXHR() {
        var xhr = null,
            flag = false,
            ary = [
                function () {
                    return new XMLHttpRequest;
                },
                function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml3.XMLHTTP");
                }
            ];

        for (var i = 0, len = ary.length; i < len; i++) {
            var curFn = ary[i];
            try {
                xhr = curFn();
                creatXHR = curFn;
                flag = true;
                break;
            } catch (e) {

            }
        }

        if (!flag) {
            throw new Error("your browser is not support ajax,please change you broser,try again");
        }

        return xhr;
    }

    function ajax(option) {
        var _default = {
            url: "",
            type: "get",
            dataType: "json",
            async: true,
            data: null,
            getHead: null,
            success: null
        };
        for (var key in option) {
            if (option.hasOwnProperty(key)) {
                _default[key] = option[key];
            }
        }
        //解决缓存问题
        if (_default.type === "get") {
            _default.url.indexOf("?") >= 0 ? _default.url += "&" : _default.url += "?";
            _default.url += "_=" + Math.random();
        }

        var xhr = creatXHR();
        xhr.open(_default.type, _default.url, _default.async);
        xhr.onreadystatechange = function () {
            if (/^2\d{2}$/.test(xhr.status)) {
                if (xhr.readyState === 2) {
                    if (typeof _default.getHead === "function") {
                        _default.getHead.call(xhr);
                    }
                }
                if (xhr.readyState === 4) {
                    var val = xhr.responseText;
                    if (_default.dataType === "json") {
                        val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
                    }
                    _default.success && _default.success.call(xhr, val);
                }
            }
        };
        xhr.send(_default.data);
    }
    window.ajax = ajax;
}();