<template>
  <div class="films-list">
    <h1>我是电影页面</h1>
  </div>
</template>

<script>
export default {
  name: "Films"
};
</script>

<style lang="scss">
// 脚手架配置了别名 src 的目录用 @
@import "@/styles/common/px2rem.scss";
.films-list {
  flex: 1;
}
</style>
