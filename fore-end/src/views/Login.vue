<template>
  <div class="login-box">
    <div class="logo">
      <img src="../images/login.png" alt="">
    </div>
    <dir class="login">
      <div class="phone-box">
        <input type="text" placeholder="手机号" class="input-style" v-model="inputVal">
      </div>
      <div class="code-box">
        <input type="text" placeholder="验证码" class="input-style" v-model="codeVal">
      </div>
      <div class="btn-box">
        <input type="button" value="登录" class="input-style btn-style" @click="toLogin" :disabled="isDisable">
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
    &[disabled] {
      background: #eee;
    }
  }
</style>
