<template>
  <div id="app">
    <!-- 一级路由 -->
    <transition
      mode="out-in"
      :duration="200"
      appear
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOutDownBig"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import './styles/base';
</style>
