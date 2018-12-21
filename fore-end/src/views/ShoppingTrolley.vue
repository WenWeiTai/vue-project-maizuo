<template>
  <div class="shoppingTrolley-box">
    <i class="iconfont iconfont-zuojiantou goback" @click="goBack"></i>
    <h2 class="list-title"><i class="iconfont iconfont-gouwucheman"></i>购物清单</h2>
    <ul class="list-ul">
      <li class="list-info">
        <span class="filmname">影片名称</span>
        <span class="price">单价</span>
        <span class="change-film-num">数量</span>
      </li>
      <li v-for="(item, index) in filmCardDate"
        :key="index"
      >
        <span class="filmname">{{ item.filmName }}</span>
        <span class="price">￥<i>{{ item.filmPrice }}</i></span>
        <span class="change-film-num">
          <i class="reduce-film" @click="reduceTicket(item)">-</i>
          <span class="film-num">{{ item.filmNum }}</span>
          <i class="add-film" @click="addTicket(item)">+</i></span>
      </li>
    </ul>
    <div class="buy">
      <p>合计：<i>{{ priceTotal }}</i>元</p>
      <p>结算</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'shoppingTrolley',
  data () {
    return {
      localStorageDate: ''
    }
  },
  methods: {
    /**
     *
     *  添加 | 减少电影票
     */
    ...mapMutations([
      'addTicket',
      'reduceTicket'
    ]),
    /**
     *
     *  返回上一层
     */
    goBack () {
      this.$router.go(-1);
    }
  },
  computed: {
    /**
     *
     *  获取仓库状态
     */
    ...mapState([
      'filmCardDate'
    ]),

    priceTotal () {
      var total = 0;
      this.filmCardDate.filter(item => {
        total += item.filmPrice * item.filmNum
      })
      return total
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";
.shoppingTrolley-box {
  .goback {
    height: px2rem(30);
    width: px2rem(30);
    position: absolute;
    top: px2rem(5);
    left: px2rem(5);
    background: #cecece8a;
    border-radius: 50%;
    line-height: px2rem(30);
    text-align: center;
    font-size: px2rem(20);
    color: rgba(0, 0, 0, 0.527)
  }
  .list-title {
    padding-top: px2rem(20);
    text-align: center;
    i {
      font-size: px2rem(24);
      padding-right: px2rem(10);
      color: #ff5f16;
    }
  }
  .list-ul {
    height: 100%;
    overflow-y: auto;
    padding: px2rem(15);
    li {
      padding: px2rem(10) 0;
      display: flex;
      border-bottom: px2rem(1) solid #eee;
      .filmname {
        flex: 5.5;
      }
      .price {
        flex: 2.5;
        color: #ff5f16;
        text-align: center;
      }
      .change-film-num {
        flex: 3;
        text-align: right;
      }
    }
    .list-info {
      font-size: px2rem(18);
      span {
        &:nth-child(2) {
          color: #000;
        }
      }
    }
  }
  .add-film,.reduce-film {
    width: px2rem(20);
    height: px2rem(20);
    background: #26a2ff;
    color: #fff;
    display: inline-block;
    text-align: center;
    line-height: px2rem(20);
    border-radius: 50%;
    font-size: px2rem(20);
    font-weight: bold;
  }

  .film-num {
    text-align: center;
    width: px2rem(30);
    display: inline-block;
  }

  .buy {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: px2rem(50);
    border-top: 1px solid rgb(224, 224, 224);
    display: flex;
    align-items: center;
    background: #fff;
    p {
      flex: 1;
      padding: 0 px2rem(20);
      &:nth-child(1){
        i {
          color: #ff5f16;
          font-size: px2rem(18);
          padding: 0 px2rem(10);
        }
      }
      &:nth-child(2){
        text-align: right;
        color: #ff5f16;
      }
    }
  }
}

</style>
