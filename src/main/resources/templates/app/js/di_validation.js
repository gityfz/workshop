/**
 * Created by tim_song on 2017/7/12.
 * 这个脚本用来包含一些有效性验证的通用方法,以供DI前端项目中调用.
 */

var validation = function() {
    console.log('1111');
};

$.extend(validation, {
    prototype: {
        length: function(content, min, max) {
            if ((typeof content) === "string") {
                var len = content.length;
                return  (len >= min && len <= max)
            } else {
                return false
            }
        },
        objlength: function(content, maxLen) {
            if ((typeof content) === "string") {
                var list = content.split(',');
                var len = list.length;
                return (len <= maxLen)
            } else {
                return false
            }
        },
        username: function(content) {
            var len = content.length;
            var res = (len >= 3 && len <= 20);
            if (res) {
                var reg = /^[0-9a-zA-z-_]+$/;
                res = reg.test(content);
            }
            return res
        },
        password: function(password, confirm) {
            return (password === confirm)
        },
        ip: function(content) {
            var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            return reg.test(content);
        },
		ipmask:function(content){
            var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/([0-9]|[12][0-9]|3[012])$/;
            return reg.test(content);
        },
        time:function(content){
            var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
            return reg.test(content);
        },
        date:function(content){
            var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
            return reg.test(content);
        },
        port: function(content) {
            var reg = /^(\d{1,4}|[1-5]\d\d\d\d|6[0-4]\d\d\d|65[0-4]\d\d|655[0-2]\d|6553[0-5])$/;
            return reg.test(content);
            // var num = parseInt(content);
            // return (num > 0 && num <= 65535)
        }
    }
});

var test = "0x12";
var va = new validation();
console.log(va.port(test));