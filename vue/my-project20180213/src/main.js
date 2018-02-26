import Vue from 'vue'
import App from './App'
import Tab from './Tab'
import Cart from './Cart'
import Task from './Task'
import router from './router'

Vue.config.productionTip = false

/* list列表 */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

//选项卡
new Vue({
  el: '#app2',
  router,
  components: { Tab },
  template: '<Tab/>'
})

//购物车实例
new Vue({
  el: '#app3',
  router,
  components: { Cart },
  template: '<Cart/>'
})

//任务列表
new Vue({
  el: '#app4',
  router,
  components: { Task },
  template: '<Task/>'
})
