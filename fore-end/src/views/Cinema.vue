<template>
  <div class="cinema-list">
    <mt-header title="影院">
      <router-link to="/" slot="left">
        <mt-button>

        </mt-button>
      </router-link>
      <mt-button slot="right">
          <i class="iconfont iconfont-magnifier"></i>
      </mt-button>
    </mt-header>
  </div>
</template>

<script>
import { Header, Button } from "mint-ui";
export default {
  name: "Cinema",
  components: {
    "mt-header": Header,
    "mt-button": Button
  }
};
</script>

<style lang="scss">
// 脚手架配置了别名 src 的目录用 @
@import "@/styles/common/px2rem.scss";
.cinema-list {
  flex: 1;
}
</style>
