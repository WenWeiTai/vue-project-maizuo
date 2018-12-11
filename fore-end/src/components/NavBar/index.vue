// NavBar 组件
<template>
  <ul class="footer">
    <router-link
      v-for="(item,index) in bars"
      :key="index"
      :to="{ name: item.id }"
      tag="li"
      active-class="active"
      :class="item.id">
      <i class="img"></i>
      <span v-text="item.name"></span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "NavBar",
  data () {
    return {
      bars: [
        {
          id: 'films',
          name: '电影'
        },
        {
          id: 'cinema',
          name: '影院'
        },
        {
          id: 'center',
          name: '我的'
        }
      ]
    }
  }
};
</script>

// scoped 只针对当前的样式生效
<style lang="scss">
@import "../../styles/common/px2rem";
.footer {
  font-size: px2rem(12);
  display: flex;
  width: 100%;
  text-align: center;
  border-top: px2rem(1) solid #eee;
  background: #fff;
  li {
    flex: 1;
    text-align: center;
    height: px2rem(49);
    display: block;
    display: flex;
    flex-direction: column;
    align-items: center;

    .img {
      width: px2rem(21);
      height: px2rem(21);
      margin-top: px2rem(6);
      margin-bottom: px2rem(2);
    }

    &.films {
      .img {
        background-image: url('./image/dy.png');
      }
      &.active .img {
        background-image: url('./image/dy1.png');
      }
    }

    &.cinema {
      .img {
        background-image: url('./image/dyy.png');
      }
      &.active .img {
        background-image: url('./image/dyy1.png');
      }
    }

    &.center {
      .img {
        background-image: url('./image/wd.png');
      }
      &.active .img {
        background-image: url('./image/wd1.png');
      }
    }

    // 点击高亮
    &.active {
      color: #ff5f16;
    }
  }
}
</style>
