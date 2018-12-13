<template>
  <div class="login-box">
    <div class="logo">
      <img src="../images/login.png" alt="">
    </div>
    <dir class="login">
      <div class="phone-box">
        <input type="text" placeholder="手机号" class="input-style">
      </div>
      <div class="code-box">
        <input type="text" placeholder="验证码" class="input-style">
      </div>
      <div class="btn-box">
        <input type="button" value="登录" class="input-style btn-style">
      </div>
    </dir>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @import '@/styles/common/px2rem.scss';
  .logo {
    margin: px2rem(79) auto px2rem(40);
    text-align: center;
    height: px2rem(60);
    line-height: px2rem(60);
    img {
      width: px2rem(60);
      height: px2rem(60);
    }
  }
  .login {
    line-height: px2rem(55);
    margin: 0 px2rem(25);
  }

  .input-style {
    height: px2rem(15);
    line-height: px2rem(15);
    width: 100%;
    font-size: px2rem(15);
    color: #191a1b;
    border: 0;
    outline-width: 0;
  }

  .btn-style {
    line-height: px2rem(45);
    font-size: px2rem(16);
    margin: px2rem(70) px2rem(0) 0;
    border-radius: px2rem(3);
    text-align: center;
    background-color: #ff5f16;
    height: px2rem(44);
    color: #fff;
    border: none;
  }
</style>
