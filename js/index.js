/**
 * Created by jjs on 2017/9/12.
 */

var olist = document.getElementById("list");

var customModule = (function () {

    function removeCustom() {
        olist.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement,
                tarTag = tar.tagName.toUpperCase();

            if (tarTag === "A" && tar.innerHTML === "删除"){
                var customId = tar.getAttribute("customId"),
                    flag = window.confirm("确定要删除的编号为["+customId+"]的客户吗？");
                if (flag){
                    ajax({
                        url:"/removeInfo?id=" + customId,
                        success:function (jsonData) {
                            if (jsonData && jsonData.code === 0){
                                olist.removeChild(tar.parentNode.parentNode);
                                return;
                            }
                            alert(jsonData.msg);
                        }
                    });
                }
            }
        };
    }

//    BIND HTML
    function bindHTML(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str +=  '<li>';
            str +=  '<span class="w50">'+curData["id"]+'</span>';
            str +=  '<span class="w150">'+curData["name"]+'</span>';
            str +=  '<span class="w50">'+curData["age"]+'</span>';
            str +=  '<span class="w200">'+curData["phone"]+'</span>';
            str +=  '<span class="w200">'+curData["address"]+'</span>';
            str += '<span class="w150 control">';
            str += '<a href="add.html?id=' + curData["id"] + '">修改</a>';
            str += '<a href="javascript:;" customId="' + curData["id"] + '">删除</a>';
            str += '</span>';
            str += '</li>';
        }
        olist.innerHTML = str;
    }

    function init() {
        ajax({
            url:"/getList",
            success:function (jsonData) {
                if (jsonData && jsonData.code == 0){
                    var data = jsonData["data"];
                    bindHTML(data);
                    removeCustom();
                }
            }
        })
    }

    return {
        init :init
    };


})();

customModule.init();