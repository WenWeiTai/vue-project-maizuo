<template>
  <div class="login-box">
    <div class="logo">
      <img src="../images/login.png" alt="">
    </div>
    <dir class="login">
      <div class="input-box">
        <input type="text" placeholder="手机号" v-model="inputVal" @blur="checkPhone">
      </div>
      <div class="input-box">
        <input type="text" placeholder="验证码" v-model="codeVal">
      </div>
      <div class="input-box btn-box">
        <input type="button" value="注册" class="btn-style" @click="toRegister" :disabled="isDisable">
      </div>
      <div class="other input-box">
        <router-link tag="span" to="/">返回首页</router-link>
        <router-link tag="span" :to="{ name: 'login' }" class="goRegister">返回登录</router-link>
      </div>
    </dir>
  </div>
</template>

<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';
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
    toRegister () {
      axios.post('/api/user/register', {
        params: {
          phone: this.inputVal,
          code: this.codeVal
        }
      }).then((res) => {
        if (res.data.code === 0) {
          MessageBox('恭喜您，返回登录', res.data.msg);
          this.$router.replace('/login')
        } else {
          alert(res.data.msg)
        }
      })
    },
    /**
     *
     * 校验手机号正确性 /^1[3-8]\d{9}$/
     *
     */
    checkPhone () {
      var reg = /^1[3-8]\d{9}$/;
      if (!reg.test(this.inputVal)) {
        alert('手机号格式不正确，请重新输入')
      }
    }
  },

  computed: {
    /**
     *
     *  监听文本框是否为空，控制按钮是否可点
     */
    isDisable () {
      var reg = /^1[3-8]\d{9}$/;
      if (this.inputVal && this.codeVal && reg.test(this.inputVal)) {
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

  .other {
    display: flex;
    border-bottom: 0;
    span {
      flex: 1;
      font-size: px2rem(14);
      color: rgb(85, 85, 85);
    }
    .goRegister {
      text-align: right;
    }
  }
</style>
