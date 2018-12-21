<template>
  <div class="center-view">
    <header id="header">
      <div class="islogin-div"></div>
      <h2>
        <router-link tag="a" :to="{ name: 'login' }" href="javascript:;">{{ phone }}</router-link>
        <span v-if="isquit" @click="clsLocalStorage"><i class="iconfont iconfont-icon4"></i>退出</span>
      </h2>
    </header>
    <main id="main">
      <div class="order-div">
        <router-link tag="h3" :to="{ name: 'shoppingTrolley' }">
          <i class="iconfont iconfont-piaofang" style="color: orange;"></i>
          <span>电影订单</span>
        </router-link>
        <h3>
          <i class="iconfont iconfont-pintuanzhuanqu" style="color: greenyellow;;"></i>
          <span>拼团订单</span>
        </h3>
      </div>
      <div class="ul">
        <router-link tag="div" class="card" :to="{ name: 'card' }">
          <div class="list">
            <i style="color: rgb(245, 89, 89);" class="iconfont iconfont-qiapian"></i>
            <span>卖座卡</span>
          </div>
          <div class="list1">
            <i class="iconfont iconfont-arr_R"></i>
          </div>
        </router-link>
        <router-link tag="div" :to="{ name: 'card' }" class="balace">
          <div class="list">
            <i style="color: red;" class="iconfont iconfont-yue"></i>
            <span>余额</span>
          </div>
          <div class="list1">
            <p>￥0</p>
            <i class="iconfont iconfont-arr_R"></i>
          </div>
        </router-link>
        <router-link tag="div" :to="{ name: 'card' }" class="set">
          <div class="list">
            <i style="color: rgb(15, 235, 52);" class="iconfont iconfont-shezhi2"></i>
            <span>设置</span>
          </div>
          <div class="list1">
            <i class="iconfont iconfont-arr_R"></i>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data () {
    return {
      phone: '',
      isquit: null
    }
  },
  methods: {
    clsLocalStorage () {
      localStorage.setItem("phone", "");
      this.phone = '立即登录';
      this.isquit = false;
    }
  },
  created () {
    if (localStorage.getItem('phone')) {
      this.phone = localStorage.getItem('phone');
      this.isquit = true;
    } else {
      this.phone = '立即登录';
      this.isquit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/common/px2rem.scss";

.center-view {
  flex: 1;
}

#header {
  height: px2rem(160);
  background: url('~@/images/center-bg.png');
  background-size: 100%;
  display: flex;
  .islogin-div {
    height: px2rem(67);
    width: px2rem(67);
    border: px2rem(2) solid white;
    border-radius: 50%;
    align-self: center;
    margin-left: px2rem(20);
    background: url('~@/images/head-portrait.png');
    background-size: 100%;
    flex-shrink: 0;
  }
  h2 {
    font-size: px2rem(16);
    align-self: center;
    margin-left: px2rem(20);
    display: flex;
    justify-content: space-between;
    width: 100%;
    a {
      color: white;
      flex: 1;
    }
    span {
      color: #fff;
      flex: 1;
      text-align: center;
      i {
        padding-right: px2rem(5);
      }
    }
  }
}
#main {
  flex: 1;
  display: flex;
  background: #f4f4f4;
  flex-direction: column;
  .order-div {
    display: flex;
    height: px2rem(80);
    h3 {
      background: white;
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      i {
        font-size: px2rem(30);
        margin: px2rem(10) 0;
      }
      span {
        font-size: px2rem(12);
        color: #797d82;
      }
    }
  }
  .ul {
    display: flex;
    flex: 1;
    border-top: px2rem(10) solid #f4f4f4;
    flex-direction: column;
    .card,
    .balace,
    .set {
      padding: 0 px2rem(15);
      background: white;
      height: px2rem(50);
      border-bottom: px2rem(1) solid #f4f4f4;
      display: flex;
      .list {
        flex: 1;
        display: flex;
        align-items: center;
        i {
          font-size: px2rem(20);
        }
        span {
          font-size: px2rem(16);
          margin-left: px2rem(10);
        }
      }
      .list1 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
          font-size: px2rem(14);
          color: rgb(177, 175, 175);
        }
        p {
          font-size: px2rem(14);
          color: #797d82;
          padding-right: px2rem(6);
        }
      }
    }
  }
}
</style>
