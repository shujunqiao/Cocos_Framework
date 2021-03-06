/*
 * @Author: mengjl
 * @Date: 2019-12-23 17:31:34
 * @LastEditTime : 2020-01-13 15:48:31
 * @LastEditors  : mengjl
 * @Description: 
 * @FilePath: \client\assets\Scripts\Frameworks\tool\UtilMgr.js
 */

String.prototype.format = function(args) { 
    if (arguments.length>0) { 
        var result = this; 
        if (arguments.length == 1 && typeof (args) == "object") { 
            for (var key in args) { 
                var reg=new RegExp ("({"+key+"})","g"); 
                result = result.replace(reg, args[key]); 
            } 
        } 
        else { 
            for (var i = 0; i < arguments.length; i++) { 
                if(arguments[i]==undefined) { 
                    return ""; 
                } 
                else { 
                    var reg=new RegExp ("({["+i+"]})","g"); 
                    result = result.replace(reg, arguments[i]); 
                } 
            } 
        } 
        return result; 
    } 
    else { 
        return this;
    } 
};

cc.Node.prototype.setId = function (id) {
    this.m_id = id;
}

cc.Node.prototype.getId = function () {
    return this.m_id;
}

module.exports = {

    findNodeById(id, node)
    {
        if (node == null) {
            if (cc.isValid(cc.director.getScene())) {
                node = cc.director.getScene().getChildByName('Canvas');
            }
            else
            {
                return null;
            }
        }
        if (node.m_id && node.m_id == id) {
            return node;
        }

        for (let index = node.children.length - 1; index >= 0; index--) {
            const child = node.children[index];
            var find_node = this.findNodeById(id, child);
            if (find_node) {
                return find_node;
            }
        }

        return null;
    },

    random2Int(min, max){
        return Math.round(Math.random() * (max - min) + min);
    },

    createUUID()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    createUID()
    {
        return 'xxxxxxxxxxxxxxxx4xxxyxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    setItem(key, value)
    {
        cc.sys.localStorage.setItem(key, value);
    },

    getItem(key, value)
    {
        var val = cc.sys.localStorage.getItem(key);
        if (val == null || val == undefined || val == 'undefined') {
            return value;
        }
        return val;
    },

    removeItem(key)
    {
        cc.sys.localStorage.removeItem(key);
    },

    timestampToTime(timestamp)
    {
        var date = new Date(timestamp * 1000);    // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },

    timeToString(date, format)
    {
        var _date = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in _date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? _date[k] : ("00" + _date[k]).substr(("" + _date[k]).length));
            }
        }
        return format;
    },

    getEasyNum(num, save = 2)
    {
        return this.getEasyNumHaveDecimal(num, save);
    },

    getEasyNumHaveDecimal(num, decimal = 2) {
        let str = "";
        if (num >= 100000000) {   // 亿
            str = this.formatDecimal(num / 100000000, decimal) + '亿';
        }
        else if (num >= 10000) {
            // str = (num / 10000).toFixed(decimal) + "万";
            str = this.formatDecimal(num / 10000, decimal) + '万';
        }
        else {
            str = num;
        }
    
        return str;
    },

    formatDecimal(num, decimal) {
        num = num.toString()
        let index = num.indexOf('.')
        if (index !== -1) {
          num = num.substring(0, decimal + index + 1)
        } else {
          num = num.substring(0)
        }
        return parseFloat(num).toFixed(decimal)
    },

    timeToHMS(timestamp, tag = 'en') {
        var h = Math.floor(timestamp / 3600);
        var m = Math.floor((timestamp - h * 3600) / 60).toString().padStart(2, '0');
        var s = Math.floor((timestamp - h * 3600 - 60 * m)).toString().padStart(2, '0');
    
        if (tag == 'en') {
            return h + ':' + m + ':' + s;
        }
        if (tag == 'cn') {
            return h + '时' + m + '分' + s + '秒';
        }
    },

    deepCloneObj(obj) {
        var i;
        var o = Array.isArray(obj) ? [] : {};
        for (i in obj) {
            o[i] = typeof obj[i] === "Object" ? this.deepCloneObj(obj[i]) : obj[i];
        }
        return o;
    }
};