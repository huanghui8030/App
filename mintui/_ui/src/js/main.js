import Vue from 'vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

require('es6-promise').polyfill();

Vue.use(Mint);

window.Vue = Vue;

//兼容Ie
if (window.HTMLElement) {
    if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
        Object.defineProperty(HTMLElement.prototype, 'dataset', {
            get: function () {
                var attributes = this.attributes; //获取节点的所有属性
                var name = [],
                    value = []; //定义两个数组保存属性名和属性值
                var obj = {}; //定义一个空对象
                for (var i = 0; i < attributes.length; i++) { //遍历节点的所有属性
                    if (attributes[i].nodeName.slice(0, 5) == 'data-') { //如果属性名的前面5个字符符合"data-"
                        // 取出属性名的"data-"的后面的字符串放入name数组中
                        name.push(attributes[i].nodeName.slice(5));
                        //取出对应的属性值放入value数组中
                        value.push(attributes[i].nodeValue);
                    }
                }
                for (var j = 0; j < name.length; j++) { //遍历name和value数组
                    obj[name[j]] = value[j]; //将属性名和属性值保存到obj中
                }
                return obj; //返回对象
            }
        });
    }
}