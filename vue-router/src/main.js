import Vue from 'vue'
import App from './App'
/*import router from './router'*/

Vue.config.productionTip = false


var myheader = {
    template:'<h1>header</h1>'
}
var myfooter = {
    template:'<div>footer</div>'
}

var layout = {
    template:'<div><my-header></my-header><my-footer></my-footer></div>',
    components:{
        'my-header':myheader,
        'my-footer':myfooter
    }
}

new Vue({
  el: '#app',
/*  router,*/
  template: '<App/>',
  components: { App}
})
