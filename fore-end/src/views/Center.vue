<template>
  <div class="center-list">
    <router-link tag="div" class="my-card" :to="{ name: 'card' }">
      <span>卖座卡</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Center"
};
</script>

<style lang="scss">
// 脚手架配置了别名 src 的目录用 @
@import "@/styles/common/px2rem.scss";
.center-list {
  flex: 1;
}
</style>
