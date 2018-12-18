// 路由相关的代码

// 引入模块
// vue 引入多次，用的是缓存
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 引入路由组件
// 电影页
// import Films from './views/Films';
// 引入 正在热映 | 即将上映 组件
// import nowPlaying from './components/nowPlaying';
// import comingSoon from './components/comingSoon';

// import Cinema from './views/Cinema';
// import Center from './views/Center';
// 引入详情页
// import FilmDetail from './views/FilmDetail';
// 引入首页
// import Home from './views/home';

// npm引入模块的方式，需要用Vue.use()
// 插件安装
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      // 首页
      path: '/',
      // component: Home,
      // 异步路由懒加载
      component: () => import('./views/Home'),
      children: [
        {
          path: '',
          redirect: '/films/nowPlaying'
        },
        {
          path: '/films',
          redirect: '/films/nowPlaying'
        },
        {
          // 电影页
          path: 'films',
          component: () => import('./views/Films'),
          children: [
            {
              path: 'nowPlaying',
              name: 'nowPlaying',
              component: () => import('./components/nowPlaying')
            },
            {
              path: 'comingSoon',
              name: 'comingSoon',
              component: () => import('./components/comingSoon')
            }
          ]
        },
        {
          // 影院页
          path: 'cinema',
          name: 'cinema',
          component: () => import('./views/Cinema')
        },
        {
          // 9.9拼团
          path: 'group',
          name: 'group',
          component: () => import('./views/Group.vue')
        },
        {
          // 个人中心页
          path: 'center',
          name: 'center',
          component: () => import('./views/Center')
        }
      ]
    },
    {
      // 详情页
      path: '/films/:filmId',
      name: 'filmDetail',
      component: () => import('./views/FilmDetail')
    },
    {
      // 登录页
      path: '/login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/user',
      component: () => import('./views/User.vue'),
      beforeEnter: (to, from, next) => {
        // 路由独享守卫——拦截,判断是否有登录
        if (localStorage.getItem('phone')) {
          next()
        } else {
          console.log(to.fullPath)
          next({
            path: '/login',
            // 设置重定向的地址，成功登录后跳转
            query: {
              redirect: to.fullPath
            }
          })
        }
      },
      children: [
        {
          // 卖座卡
          path: 'card',
          name: 'card',
          component: () => import('./views/Card.vue')
        }
      ]
    },
    {
      // 默认
      path: '*',
      redirect: '/films/nowPlaying'
    }
  ]
})

// 进度条
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  NProgress.start();
  next();
})

router.afterEach((to, from) => {
  // console.log(to, from)
  NProgress.done()
})

// 暴露路由
export default router;
