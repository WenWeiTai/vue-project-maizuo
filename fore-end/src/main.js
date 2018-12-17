// 整个前端项目的入口js文件
// 引入Vue模块
import Vue from 'vue'
import router from './router'
// 引入 vuex
import store from './store'
import App from './App'

// 去除vue 开发时，浏览器的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#main',
  // 引入路由
  router,
  store,
  // components局部组件
  components: {
    // 局部注册组件
    App
  },
  // 直接传入组件内容，覆盖index.html的<div id="main"></div>
  template: '<App/>'
})
