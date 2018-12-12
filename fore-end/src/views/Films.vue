<template>
  <div class="films-list">
    <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../images/pic-1.jpg">
          </div>
          <div class="swiper-slide">
            <img src="../images/pic-2.jpg">
          </div>
          <div class="swiper-slide">
            <img src="../images/pic-3.jpg">
          </div>
          <div class="swiper-slide">
            <img src="../images/pic-4.jpg">
          </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- /轮播图 -->

    <!-- 城市定位 -->
    <div class="city-fixed">
      <span>深圳</span>
      <i class="iconfont iconfont-arr_D"></i>
    </div>
    <!-- /城市定位 -->

    <!-- tab-bar -->
    <div class="headerNavBox">
        <ul class="headerNavUl">
            <li class="li-hot active">正在热映</li>
            <li class="li-coming">即将上映</li>
        </ul>
        <div class="bottom-line">
            <span></span>
        </div>
    </div>
    <!-- /tab-bar -->
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper'
export default {
  name: "Films",

  mounted () {
    new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      autoplay: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
};
</script>

<style lang="scss">
// 脚手架配置了别名 src 的目录用 @
@import "@/styles/common/px2rem.scss";
// 引入swiper样式
@import "swiper/dist/css/swiper.min.css";
.films-list {
  flex: 1;
}
.swiper-container {
  height: px2rem(210);
  .swiper-pagination-bullet {
    height: px2rem(10);
    width: px2rem(10);
  }
  .swiper-pagination-bullet-active {
    background: rgba(101, 245, 5, 0.8)
  }
}
.city-fixed {
  position: absolute;
  top: px2rem(18);
  left: px2rem(8);
  z-index: 999;
  height: px2rem(25);
  line-height: px2rem(25);
  font-size: px2rem(14);
  color: #fff;
  border-radius: px2rem(10);
  text-align: center;
  padding: 0 px2rem(5);
  background: rgba(0, 0, 0, 0.2);
}

.headerNavBox {
    display: flex;
    flex-direction: column;
    height: px2rem(49);
    ul{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-bottom: px2rem(1) solid #eee;
        li {
            width: 50%;
            text-align: center;
            font-size: px2rem(14);
        }
    }
}
.bottom-line {
    width: 50%;
    display: flex;
    justify-content: center;
    span {
        width: px2rem(56);
        height: px2rem(1);
        background: #ff5f16;
        display: block;
    }
}
.active {
    color: #ff5f16;
}
</style>
