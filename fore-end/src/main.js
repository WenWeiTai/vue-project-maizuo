// 整个前端项目的入口js文件
// 引入Vue模块
import Vue from 'vue'
import App from './App'

// 去除vue 开发时，浏览器的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#main',
  // components局部组件
  components: {
    // 局部注册组件
    App: App
  },
  // 直接传入组件内容，覆盖index.html的<div id="main"></div>
  template: '<App/>'
})
