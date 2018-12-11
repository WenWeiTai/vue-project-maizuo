// 路由相关的代码

// 引入模块
// vue 引入多次，用的是缓存
import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入路由组件
import Films from './views/Films';
import Cinema from './views/Cinema';
import Center from './views/Center';

// npm引入模块的方式，需要用Vue.use()
// 插件安装
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            // 首页
            path: '/films',
            component: Films
        },
        {
            // 影院页
            path: '/cinema',
            component: Cinema
        },
        {
            // 个人中心页
            path: '/center',
            component: Center
        },
        {
            // 默认
            path: '*',
            redirect: '/films'
        }
    ]
})
// 暴露路由
export default router;
