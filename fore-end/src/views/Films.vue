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
      <span>{{ cityName }}</span>
      <i class="iconfont iconfont-arr_D"></i>
    </div>
    <!-- /城市定位 -->

    <!-- tab-bar -->
    <div class="headerNavBox">
      <ul class="headerNavUl">
        <li :class="{'active': $route.path === '/films/nowPlaying'}" class="li-hot" @click="tabBarClick('now')">正在热映</li>
        <li class="li-coming" @click="tabBarClick('coming')" :class="{'active': $route.path === '/films/comingSoon'}">即将上映</li>
      </ul>
      <!-- <div class="bottom-line">
        <span></span>
      </div> -->
    </div>
    <!-- /tab-bar -->

    <!-- list -->
    <router-view></router-view>
    <!-- /list -->

  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
// 引入store
import store from "../store";
console.log(store);
export default {
  name: "Films",
  data () {
    return {
      // 定位城市
      cityName: ''
    }
  },
  methods: {
    // 定位当前城市名称
    /* eslint-disable */
    getCityName () {
      var myCity = new BMap.LocalCity();
      myCity.get((result) => {
        this.cityName = result.name;
      })
    },

    // 切换 正在热映 | 即将上映 的路由——编程式导航
    tabBarClick(type) {
      if (type === 'now') {
        this.$router.push({
          name: 'nowPlaying'
        })
      } else {
        this.$router.push({
          name: 'comingSoon'
        })
      }
    }
  },

  created () {
    this.getCityName();
  },

  mounted () {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    })
  }
}
</script>

<style lang="scss">
// 脚手架配置了别名 src 的目录用 @
@import "@/styles/common/px2rem.scss";
// 引入swiper样式
@import "swiper/dist/css/swiper.min.css";
.films-list {
  position: relative;
  flex: 1;
  overflow-y: auto;
}
.swiper-container {
  height: px2rem(210);
  .swiper-pagination-bullet {
    height: px2rem(10);
    width: px2rem(10);
  }
  .swiper-pagination-bullet-active {
    background: rgba(101, 245, 5, 0.8);
  }
}
.city-fixed {
  position: absolute;
  top: px2rem(18);
  left: px2rem(8);
  z-index: 1;
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
  position: sticky;
  z-index: 999;
  top: px2rem(0);
  height: px2rem(49);
  line-height: px2rem(49);
  background: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: px2rem(1) solid #eee;
    li {
      flex: 1;
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

.mainWrapBox {
  .mainBox {
    margin-left: px2rem(15);
    overflow: auto;

    .mainItemBox {
      padding: px2rem(15) px2rem(15) px2rem(15) 0;
      border-bottom: px2rem(1) solid #eee;
      a {
        display: flex;
        align-items: center;
        // box-sizing: border-box;
        .filmImg {
          img {
            width: px2rem(66);
            height: px2rem(94);
            display: block;
          }
        }
        .filmInfo {
          padding: 0 px2rem(10);
          font-size: px2rem(13);
          width: px2rem(209);

          .filmName {
            width: 100%;
            span {
              color: #191a1b;
              font-size: px2rem(16);
            }
            i {
              font-size: px2rem(12);
              color: #fff;
              background-color: #d2d6dc;
              height: px2rem(14);
              line-height: px2rem(14);
              padding: 0 px2rem(2);
              border-radius: px2rem(2);
            }
          }
          .grade {
            i {
              color: #ffb232;
              font-size: px2rem(14);
            }
          }
          .info {
            width: 100%;
          }
        }
        .buy {
          line-height: px2rem(25);
          height: px2rem(25);
          width: px2rem(50);
          color: #ff5f16;
          font-size: px2rem(13);
          text-align: center;
          border-radius: px2rem(2);
          position: relative;
          border: px2rem(1) solid #ff5f16;
        }
      }
    }
  }
}

.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.distance {
  font-size: px2rem(13);
  line-height: px2rem(20);
}
</style>
