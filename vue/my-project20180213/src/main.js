// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Tab from './Tab'
import router from './router'

Vue.config.productionTip = false

/* todo的list列表 */
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
