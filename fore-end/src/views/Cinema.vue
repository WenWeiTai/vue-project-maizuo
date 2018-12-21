<template>
  <div class="cinema-list">
    <mt-header title="影院">
      <router-link :to="{ name: 'city' }" slot="left">
        <mt-button>
          {{ cityName }}
          <i class="iconfont iconfont-arr_D"></i>
        </mt-button>
      </router-link>
      <mt-button slot="right">
        <router-link tag="i" :to="{ name: 'cinemasearch' }" class="iconfont iconfont-magnifier"></router-link>
      </mt-button>
    </mt-header>
    <ul class="filter-ul">
      <li class="filter-city" @click="isCheckBoxShow = !isCheckBoxShow">全城
        <i class="iconfont iconfont-arr_D"></i>
      </li>
      <li class="lately-city">最近去过
        <i class="iconfont iconfont-arr_D"></i>
      </li>
    </ul>
    <mt-popup position="top" v-model="isCheckBoxShow">
      <ul class="city-area">
        <li
          class="city-area-item"
          :class="{'active': isActive}"
          v-for="(item, index) in districtNameList"
          :key="index"
        >
          {{ item }}</li>
      </ul>
    </mt-popup>
    <ul class="cinema-ul">
      <li class="cinema-item"
        v-for="(item,index) in cinemaDate"
        :key="index"
      >
        <div class="item-left">
          <p>{{ item.name }}</p>
          <p>{{ item.address }}</p>
        </div>
        <div class="item-right">
          <p>￥{{ item.lowPrice / 100 }}起</p>
          <p>距离未知</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Header, Button, Popup, Indicator } from "mint-ui";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Cinema",
  data () {
    return {
      isCheckBoxShow: false,
      cinemaDate: [],
      districtNameList: [],
      isActive: false
    };
  },

  components: {
    "mt-header": Header,
    "mt-button": Button,
    "mt-popup": Popup
  },

  methods: {
    getCinemaDate () {
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
          // 拿到全城数据后，根据不同区域分配数据
          var obj = {};
          this.cinemaDate.forEach(item => {
            var districtName = item.districtName;
            obj[districtName] = obj[districtName] || [];
            obj[districtName].push(item);
          });
          console.log(Object.keys(obj));
          this.districtNameList = Object.keys(obj);
        } else {
          alert(res.msg)
        }
      })
    }
  },

  computed: {
    ...mapState(["cityName"])
  },

  watch: {
    cityName: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          this.getCinemaDate()
        }
      },
      immediate: true
    }
  },

  created () {
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'triple-bounce'
    // });
    // axios.get('/api/cinema/list', {
    //   params: {
    //     cityName: this.$store.state.cityName
    //   }
    // }).then(res => {
    //   Indicator.close();
    //   if (res.data.code === 0) {
    //     this.cinemaDate = res.data.data;
    //     // 拿到全城数据后，根据不同区域分配数据
    //     var obj = {};
    //     this.cinemaDate.forEach(item => {
    //       var districtName = item.districtName;
    //       obj[districtName] = obj[districtName] || [];
    //       obj[districtName].push(item);
    //     });
    //     console.log(Object.keys(obj));
    //     this.districtNameList = Object.keys(obj);
    //   } else {
    //     alert(res.msg)
    //   }
    // })
  }
};
</script>

<style lang="scss">
// 脚手架配置了别名 src 的目录用 @
@import "@/styles/common/px2rem.scss";
.cinema-list {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mint-header {
  z-index: 3000;
  flex-shrink: 0;
  background: #fff;
  border-bottom: px2rem(1) solid #f6f1f1;
  color: #000;
  .mint-header-title {
    font-size: px2rem(18);
  }
}
.iconfont-arr_D {
  font-size: px2rem(12);
}
.iconfont-magnifier {
  font-size: px2rem(20);
}

.filter-ul {
  display: flex;
  flex-shrink: 0;
  height: px2rem(50);
  align-items: center;
  border-bottom: px2rem(1) solid #f6f1f1;
  background: #fff;
  z-index: 3000;
  li {
    flex: 1;
    text-align: center;
    font-size: px2rem(14);
    i {
      padding-left: px2rem(5);
    }
  }
}

.city-area {
  padding: px2rem(10);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-align: center;
  .city-area-item {
    width: 23%;
    border: px2rem(1) solid #eee;
    line-height: px2rem(30);
    display: inline-block;
    margin: px2rem(5) 1%;
    border-radius: 5%;
    color: #797d82;
    font-size: px2rem(12);
  }
  .active {
    color: #ff5f16;
    border: px2rem(1) solid#ff5f16;
  }
}

.mint-popup-top {
  top: 90px;
  width: 100%;
}
// .v-modal {
//   top: 90px;
// }

.cinema-ul {
  overflow-y: auto;
  .cinema-item {
    padding: px2rem(10);
    display: flex;
    border-bottom: px2rem(1) solid #f6f1f1;
    .item-left {
      width: 77%;
      p {
        &:nth-child(1) {
          font-size: px2rem(15);
          color: #191a1b;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:nth-child(2) {
          font-size: px2rem(12);
          color: #797d82;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          margin-top: px2rem(10);
        }
      }
    }
    .item-right {
      flex: 3;
      text-align: right;
      p {
        &:nth-child(1) {
          font-size: px2rem(15);
          color: #ff5f16;
        }
        &:nth-child(2) {
          font-size: px2rem(12);
          color: #797d82;
          display: block;
          margin-top: px2rem(10);
        }
      }
    }
  }
}
</style>
