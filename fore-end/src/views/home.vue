<template>
    <div class="home">
      <!-- 二级路由 -->
      <transition
        mode="out-in"
        :duration="200"
        appear
        enter-active-class="animated fadeInUpBig"
        leave-active-class="animated fadeOutDownBig"
      >
        <router-view></router-view>
      </transition>
      <!-- 底部导航 -->
      <NavBar></NavBar>
    </div>
</template>

<script>
  // 引入电影页底部导航组件
  import NavBar from '../components/NavBar/index';
  export default {
    name: 'home',
    // 注册电影页底部导航组件
    components: {
      NavBar
    }
  }
</script>

<style lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
