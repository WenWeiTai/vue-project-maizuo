<template>
  <div class="myCard-div">
    <center-top>卖座卡</center-top>
    <div class="myCard">
      <img src="../images/card-bg.png">
      <p class="msg">你还没有卖座卡哦～</p>
      <div class="btn">激活新卡</div>
    </div>
  </div>
</template>

<script>
import CenterTop from '../components/CenterTop/Top'
export default {
  name: 'card',
  components: {
    CenterTop
  }
}
</script>

<style lang="scss">
 @import '@/styles/common/px2rem.scss';
 .myCard-div {
   display: flex;
   flex-direction: column;
   height: 100%;
 }

 .myCard {
   flex: 1;
   padding-top: 28vh;
   img {
     width: px2rem(95);
     height: px2rem(95);
     display: block;
     margin: 0 auto;
   }
   .msg {
     margin: px2rem(11) 0 px2rem(20);
      font-size: px2rem(14);
      width: 100%;
      text-align: center;
      color: #bdc0c5;
   }
   .btn {
      border: px2rem(1) solid #ff5f16;
      color: #ff5f16;
      border-radius: px2rem(3);
      width: px2rem(150);
      height: px2rem(33);
      line-height: px2rem(33);
      text-align: center;
      font-size: px2rem(14);
      margin: 0 auto;
   }
 }
</style>
