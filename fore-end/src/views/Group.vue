<template>
  <div class="group-div">
    <div
      class="group-item"
      v-for="(item, index) in groupDate"
      :key="index"
    >
      <img class="item-img" :src="item.activeBannerUrl">
      <div class="item-info">
        <p class="msg">{{ item.masterTitle }}</p>
        <span class="title">{{ item.slaveTitle }}</span>
        <div class="buy-div">
          <div class="price-div">
            <span class="price">￥{{ item.price / 100 }}</span>
            <del class="del">原价￥{{ item.marketPrice / 100 }}</del>
            <div class="imgs">
              <img
                v-for="(userListItem, userListIndex) in item.userList"
                :key="userListIndex"
                :src="userListItem.icon"
              >
            </div>
          </div>
          <div class="buy-button">去拼单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'group',
  data () {
    return {
      groupDate: []
    }
  },
  created () {
    axios.get('/static/api/group.json').then((res) => {
      this.groupDate = res.data;
    })
  }
}
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";
.group-div {
  background: #f4f4f4;
  flex: 1;
  overflow-y: auto;
}

.group-item {
  margin-bottom: px2rem(10);
  background-color: #fff;
  padding-bottom: px2rem(15);
  .item-img {
    width: 100%;
  }
  .item-info {
    min-height: px2rem(85);
    margin: px2rem(15);
    margin-bottom: 0;
    .msg {
      font-size: px2rem(15);
      height: px2rem(21);
      line-height: px2rem(21);
      color: #191a1b;
    }
    .title {
      font-size: px2rem(13);
      height: px2rem(19);
      line-height: px2rem(19);
      color: #797d82;
    }
  }
}

.buy-div {
  display: flex;
  justify-content: space-between;
  height: px2rem(33);
  margin-top: px2rem(10);
  .price-div {
    flex: 1;
    display: flex;
    align-items: center;
    .price {
      font-size: px2rem(20);
      line-height: px2rem(20);
      color: #c03131;
    }
    .del {
      margin-left: px2rem(3);
      font-size: px2rem(11);
      color: #bdc0c5;
    }
    .imgs{
      flex: 1;
      text-align: right;
      margin-right: px2rem(20);
      img {
        width: px2rem(30);
        height: px2rem(30);
        border-radius: 50%;
        border: 0;
        border: px2rem(1) solid #fff;
        &:nth-child(1){
          margin-right: px2rem(-15);
          z-index: 10;
        }
      }
    }
  }
  .buy-button {
    width: px2rem(90);
    height: px2rem(33);
    font-size: px2rem(14);
    color: #fff;
    border-radius:  px2rem(3);
    background-color: rgb(192, 49, 49);
    line-height: px2rem(33);
    text-align: center;
  }
}
</style>
