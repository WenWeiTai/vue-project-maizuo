<template>
  <div class="city-lits-box">
    <div class="header">
      <div class="close" @click="goBack">
        <i class="iconfont">&#xe617;</i>
      </div>
      <div class="title">当前城市 -</div>
    </div>
    <div class="search-city">
      <div class="search-input">
        <i class="iconfont">&#xe64d;</i>
        <input type="text" placeholder="输入城市名或拼音" v-model="inputVal">
        <!-- <span class="cancel" @click="showList">取消</span> -->
      </div>
    </div>
    <ul class="seach-ul">
      <li
        v-show="!isShowList"
        v-for="(item, index) in searchResult"
        :key="index"
        @click="repCityName(item.name)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="city-list" v-show="isShowList">
      <ul class="list">
        <div class="recommend-city">
          <div class="gprs-city">
            <p class="city-title">GPS定位你所在城市</p>
            <div class="city-item">
              <p class="city-item-text">{{ cityName }}</p>
            </div>
          </div>
          <div class="hot-city">
            <p class="city-title">热门城市</p>
            <div class="city-item">
              <p class="city-item-text"
                v-for="(item, index) in hotCity"
                :key="index"
                @click="repCityName(item.name)"
              >{{ item.name }}</p>
            </div>
          </div>
        </div>

        <li class="list-section"
          v-for="(item, index) in cityList"
          :key="index"
        >
          <p class="section-title">{{ item.initial }}</p>
          <ul>
            <li
              v-for="(itemList,listIndex) in item.list"
              :key="listIndex"
              @click="repCityName(itemList.name)"
              >
              <p>{{ itemList.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-nav">
        <ul
          class="nav-index"
          v-for="(item,index) in cityList"
          :key="index"
        >
          <li>{{ item.initial }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
import { Indicator } from 'mint-ui';
export default {
  name: "CityList",
  data () {
    return {
      cityDate: [],
      cityList: [],
      hotCity: [],
      inputVal: ''
    };
  },

  methods: {
    ...mapActions([
      'getCityName'
    ]),

    ...mapMutations([
      'replaceCityName'
    ]),

    /**
     *
     *  更改当前城市
     */
    repCityName (newName) {
      this.$store.commit('replaceCityName', newName)
      this.$router.go(-1)
    },

    /**
     *
     *  数组按照字母拼音排序
     *
     */
    compare (obj1, obj2) {
      var val1 = obj1.initial;
      var val2 = obj2.initial;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    },

    /**
     *
     * 获取热门城市
     */
    getHotCity () {
      this.cityList.forEach(item => {
        // console.log(item.list)
        item.list.forEach(listItem => {
          if (listItem.isHot) {
            // console.log(listItem)
            this.hotCity.push(listItem)
          }
        })
      })
    },

    /**
     *
     *  城市列表返回上一层
     */
    goBack () {
      this.$router.go(-1);
    }
  },

  computed: {
    ...mapState([
      'cityName'
    ]),

    /**
     *
     *  搜索框输入, 城市列表隐藏
     */
    isShowList () {
      if (this.inputVal) return false;
      return true;
    },
    /**
     *
     *  搜索结果筛选
     */
    searchResult () {
      var arr = [];
      this.cityDate.forEach(item => {
        if (item.pinyin.indexOf(this.inputVal) !== -1 || item.name.indexOf(this.inputVal) !== -1) {
          arr.push(item)
        }
      })
      return arr;
    }
  },

  created () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'triple-bounce'
    });
    /**
     *  页面未加载前获取城市列表数据
     */
    axios.get("/static/api/cityList.json").then(res => {
      console.log(res.data);
      this.cityDate = res.data;
      var listItem = {}; // 记录某个拼音首字母是否存在
      var index = 0; // 记录某个拼音字母下标
      var data = res.data; // 请求的数据

      data.forEach(item => {
        Indicator.close();
        let initial = item.pinyin.slice(0, 1).toUpperCase();
        // console.log(initial)
        if (listItem[initial]) {
          this.cityList[listItem[initial] - 1].list.push(item);
        } else {
          listItem[initial] = ++index;
          this.cityList.push({
            initial,
            list: [item]
          });
        }
      });
      this.cityList = this.cityList.sort(this.compare)
      this.getHotCity()
    });
    // 定位城市
    this.getCityName()
  }
};
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";

html,
body {
  background: #fff;
  color: #2c3e50;
  font-size: px2rem(14);
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: px2rem(44);
  border-bottom: px2rem(1) solid #ededed;
  display: flex;
  line-height: px2rem(44);
  background: #fff;
  .close {
    width: 14%;
    i {
      font-size: px2rem(35);
      margin-left: px2rem(10);
    }
  }
  .title {
    font-size: px2rem(17);
    width: 72%;
    text-align: center;
  }
}

.search-city {
  position: fixed;
  top: px2rem(44);
  z-index: 2;
  padding: px2rem(9.5) px2rem(15);
  background: #f4f4f4;
  width: 100%;
  .search-input {
    width: 93%;
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
}
.seach-ul {
  width: 100%;
  position: absolute;
  top: px2rem(94);
  padding: 0 px2rem(17);
  li {
    line-height: px2rem(40);
    border-bottom: px2rem(1) solid rgb(248, 246, 246);
  }
}

.city-list {
  padding-top: px2rem(94);
  display: flex;
  .list {
    overflow-y: auto;
    margin-right: px2rem(17);
    width: 100%;
    .recommend-city {
      background-color: #fff;
      padding-left: px2rem(15);
      padding-top: px2rem(15);
    }
    .list-section {
      ul {
        padding: 0 0 0 px2rem(15);
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        li {
          color: #191a1b;
          width: 33%;
          p {
            height: 100%;
            line-height: px2rem(48);
            font-size: px2rem(14);
            border-bottom: px2rem(1) solid #ededed;
            text-align: center;
          }
        }
      }
    }
  }
  .list-nav {
    border: 0;
    position: fixed;
    right: 0;
    width: px2rem(17);
    margin-top: px2rem(94);
    .nav-index {
      width: px2rem(17);
      li {
        font-size: px2rem(12);
        padding: 0 px2rem(6);
        color: #191a1b;
      }
    }
  }
}
.city-title {
  font-size: px2rem(13);
  color: #797d82;
  margin-bottom: px2rem(10);
}

.city-item {
  display: flex;
  width: 100%;
  text-align: center;

  flex-wrap: wrap;
  justify-content: space-between;
  p {
    width: 25%;
  }
}

.city-item-text {
  height: px2rem(30);
  background-color: #f4f4f4;
  line-height: px2rem(30);
  border-radius: px2rem(3);
  box-sizing: border-box;
  margin: 0 px2rem(7.5);
  font-size: px2rem(14);
  color: #191a1b;
  margin-bottom: px2rem(15);
}

.section-title {
  color: #797d82;
  padding: 0 0 0 px2rem(15);
  line-height: px2rem(30);
  font-size: px2rem(12);
  background-color: #f4f4f4;
}
</style>
