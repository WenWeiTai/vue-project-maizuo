<template>
  <div class="head">
    <router-link tag="i" class="iconfont iconfont-shouye" to="/"></router-link>
    <slot class="center-title"></slot>
  </div>
</template>

<script>
export default {
  name: 'centerTop'
}
</script>

<style lang="scss">
  @import '@/styles/common/px2rem.scss';
  .head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
    line-height: px2rem(44);
    overflow: hidden;
    margin: 0;
    padding: 0;
    border-bottom: px2rem(1) solid #eee;
    font-size: px2rem(16);
    background: #fff;
    overflow-y: auto;
    text-align: center;
    // display: flex;
    i {
      font-size: px2rem(30);
      text-align: left;
      // display: flex;
    }
  }
</style>
