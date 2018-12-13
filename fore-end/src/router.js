// 路由相关的代码

// 引入模块
// vue 引入多次，用的是缓存
import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入路由组件
// 电影页
import Films from './views/Films';
// 引入 正在热映 | 即将上映 组件
import nowPlaying from './components/nowPlaying';
import comingSoon from './components/comingSoon';

import Cinema from './views/Cinema';
import Center from './views/Center';
// 引入详情页
import FilmDetail from './views/FilmDetail';
// 引入首页
import Home from './views/home';

// npm引入模块的方式，需要用Vue.use()
// 插件安装
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            // 首页
            path: '/',
            component: Home,
            children: [
                {
                    // 电影页
                    path: 'films',
                    alias: '/',
                    component: Films,
                    children: [
                        {
                            path: 'nowPlaying',
                            name: 'nowPlaying',
                            alias: 'films',
                            component: nowPlaying
                        },
                        {
                            path: 'comingSoon',
                            name: 'comingSoon',
                            component: comingSoon
                        }
                    ]
                },
                {
                    // 影院页
                    path: 'cinema',
                    name: 'cinema',
                    component: Cinema
                },
                {
                    // 个人中心页
                    path: 'center',
                    name: 'center',
                    component: Center
                }
            ]
        },
        {
            // 详情页
            path: '/films/:filmId',
            name: 'filmDetail',
            component: FilmDetail
        },
        {
            // 默认
            path: '*',
            redirect: '/films/nowPlaying'
        }
    ]
})
// 暴露路由
export default router;
