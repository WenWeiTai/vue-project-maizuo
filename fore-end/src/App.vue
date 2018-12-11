<template>
  <div id="app">
    <!-- 首页 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <NavBar></NavBar>
  </div>
</template>

<script>
// 引入组件
import NavBar from './components/NavBar/index';

export default {
  name: 'appMain',
  // 注册组件
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  @import './styles/base';
</style>
