/**
 * Created by jjs on 2017/9/12.
 */

//->获取URL地址栏的问号后面的参数值  http://old.zhufengpeixun.cn/jishuziliao/javaScriptzhuanti/2016-07-02/482.html

String.prototype.queryURLParameter = function () {
    var obj = {},
        reg = /([^?=&#]+)=([^?=&#]+)/g;
    this.replace(reg, function () {
        var key = arguments[1],
            value = arguments[2];
        obj[key] = value;
    });
    return obj;
};

var userName = document.getElementById("userName"),
    userAge = document.getElementById("userAge"),
    userPhone = document.getElementById("userPhone"),
    userAddress = document.getElementById("userAddress"),
    submit = document.getElementById("submit");


var urlObj = window.location.href.queryURLParameter(),
    customId = urlObj["id"],
    isFlag = typeof customId === "undefined" ? false : true;

if (isFlag) {
    ajax({
        url: "/getInfo?id=" + customId,
        success: function (jsonData) {
            var data = jsonData["data"];
            userName.value = data["name"];
            userAge.value = data["age"];
            userPhone.value = data["phone"];
            userAddress.value = data["address"];
        }
    });
}

submit.onclick = function () {
    var obj = {
        name: userName.value,
        age: userAge.value,
        phone: userPhone.value,
        address: userAddress.value
    };

    if (isFlag) {
        obj.id = customId;
        ajax({
            url: "/updateInfo",
            type: "post",
            data:JSON.stringify(obj),
            success:function (jsonData) {
                if (jsonData && jsonData.code == 0){
                    window.location.href = "index.html";
                    return;
                }
                alert(jsonData.msg);
            }
        });
        return;
    }

    ajax({
        url:"/addInfo",
        type:"post",
        data:JSON.stringify(obj),
        success:function (jsonData) {
            if(jsonData && jsonData.code == 0){
                window.location.href = "index.html";
                return;
            }
            alert(jsonData.msg);
        }

    })
};

