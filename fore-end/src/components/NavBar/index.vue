// NavBar 组件
<template>
  <ul class="footer">
    <li>
      <a class="active" href="javascript:;">
        <img src="./image/dy1.png">
        <span>电影</span>
      </a>
    </li>
    <li>
      <a href="javascript:;">
        <img src="./image/dyy.png">
        <span>影院</span>
      </a>
    </li>
    <li>
      <a href="javascript:;">
        <img src="./image/tg.png">
        <span>9.9拼团</span>
      </a>
    </li>
    <li>
      <a href="javascript:;">
        <img src="./image/wd.png">
        <span>我的</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "NavBar"
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
    width: 25%;
    text-align: center;
    a {
      height: px2rem(49);
      display: block;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        padding-top: px2rem(8);
        width: px2rem(21);
        height: px2rem(21);
      }
    }
  }
}
</style>
