<template>
  <div class="login-box">
    <div class="logo">
      <img src="../images/login.png" alt="">
    </div>
    <dir class="login">
      <div class="input-box">
        <input type="text" placeholder="手机号" v-model="inputVal">
      </div>
      <div class="input-box">
        <input type="text" placeholder="验证码" v-model="codeVal">
      </div>
      <div class="input-box btn-box">
        <input type="button" value="登录" class="btn-style" @click="toLogin" :disabled="isDisable">
      </div>
    </dir>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "login",
  data () {
    return {
      inputVal: '',
      codeVal: ''
    }
  },

  methods: {
    /**
     *
     *  登录验证
     */
    toLogin () {
      axios.get('/static/api/user.json', {
        params: {
          phone: this.inputVal,
          code: this.codeVal
        }
      }).then((res) => {
        if (this.inputVal === res.data[0].phone && this.codeVal === res.data[0].code) {
          console.log('登录成功');
          localStorage.setItem('phone', '15899850664');
          let redirect = this.$route.query.redirect;
          this.$router.replace(redirect);
        } else {
          alert('账号或密码错误')
        }
      })
    }
  },

  computed: {
    /**
     *
     *  监听文本框是否为空，控制按钮是否可点
     */
    isDisable () {
      if (this.inputVal && this.codeVal) {
        return false;
      } else {
        return true;
      }
    }
  }

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
    width: 100%;
    position: relative;
  }
  dir {
    padding-inline-start: 0;
  }
  .input-box {
    line-height: px2rem(50);
    margin: 0 px2rem(25);
    position: relative;
    border-bottom: px2rem(1) solid #eee;
    input {
      height: px2rem(15);
      line-height: px2rem(15);
      width: 100%;
      padding: px2rem(20) 0;
      font-size: px2rem(16);
      color: #191a1b;
      border: 0;
      outline-width: 0;
    }
  }
  .btn-box {
    border-bottom: none;
    margin-top: px2rem(70);
    .btn-style {
      display: inline-block;
      height: px2rem(50);
      border-radius: px2rem(3);
      text-align: center;
      background-color: #ff5f16;
      color: #fff;
      &[disabled] {
        opacity: .5;
      }
    }
  }

</style>
