<template>
  <div class="cinema-search-box">
    <div class="cinema-search">
      <div class="search-input">
        <i class="iconfont">&#xe64d;</i>
        <input type="text" placeholder="输入影城名称" v-model="inputVal">
      </div>
      <span class="cancel" @click="goBack">取消</span>
    </div>
    <ul class="cinema-seach-ul">
      <li
        v-for="(item, index) in seachCinema"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "CinemaSeach",
  data () {
    return {
      cinemaDate: [],
      inputVal: ''
    };
  },
  computed: {
    ...mapState(["cityName"]),
    /**
     *
     *  搜索当前城市影城
     */
    seachCinema () {
      var result = [];
      this.cinemaDate.forEach(item => {
        if (item.name.indexOf(this.inputVal) !== -1 && this.inputVal) {
          result.push(item.name)
        }
      })
      return result;
    }
  },
  methods: {
    /**
     *
     *  城市列表返回上一层
     */
    goBack () {
      this.$router.go(-1);
    }
  },
  created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'triple-bounce'
    });
    axios.get('/api/cinema/list', {
      params: {
        cityName: this.$store.state.cityName
      }
    }).then(res => {
      Indicator.close();
      if (res.data.code === 0) {
        this.cinemaDate = res.data.data;
      } else {
        alert(res.msg)
      }
    })
  }
}
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";
.cinema-search-box {
  display: flex;
}
.cinema-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;
  padding: px2rem(9.5) px2rem(15);
  background: #f4f4f4;
  width: 100%;
  .search-input {
    flex: 8;
    background: #fff;
    height: px2rem(30);
    position: relative;
    border-radius: px2rem(3);
    color: #797d82;
    i {
      position: absolute;
      left: px2rem(8);
      top: 0;
      line-height: px2rem(30);
      font-size: px2rem(18);
    }
    input {
      position: absolute;
      left: px2rem(34);
      top: 0;
      height: px2rem(30);
      font-size: px2rem(12);
      border: 0;
      outline: 0;
      width: 80%;
    }
    span {
      position: absolute;
      right: 0;
      line-height: px2rem(35);
    }
  }
  .cancel {
    flex: 1;
    text-align: center;
    font-size: px2rem(12);
  }
}
.cinema-seach-ul {
  width: 100%;
  position: absolute;
  top: px2rem(50);
  padding: 0 px2rem(17);
  li {
    line-height: px2rem(40);
    border-bottom: px2rem(1) solid rgb(248, 246, 246);
    font-size: 14px;
    color: #646464;
  }
}
</style>
