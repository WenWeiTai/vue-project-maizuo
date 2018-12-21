<template>
    <!-- list -->
    <div class="mainWrapBox">
      <ul class="mainBox">
        <li class="mainItemBox"
          v-for="(item,index) in films"
          :key="index"
          @click="goDetail(item.filmId)"
        >
          <a href="javascript:;">
            <div class="filmImg fl">
              <img :src="item.poster">
            </div>
            <div class="filmInfo fl">
              <div class="filmName omit">
                <span class="distance" v-text="item.name"></span>
                <i class="distance" v-text="item.filmType.name"></i>
              </div>
              <div class="grade omit">
                <span class="distance">观众评分</span>
                <i class="distance" v-text="item.grade"></i>
              </div>
              <div class="info omit">
                <span class="distance">主演：{{ getActors(item.actors) }}</span>
              </div>
              <div class="filmFrom omit">
                <span class="distance">{{ item.nation }} | {{ item.runtime }}分钟</span>
              </div>
            </div>
            <div class="fr buy">预购</div>
          </a>
        </li>
      </ul>
      <div class="load-more" @click="moreDate()">{{ loadText }}</div>
    </div>
    <!-- /list -->
</template>

<script>
  // 引入axios
  import axios from "axios";
  import { Indicator } from 'mint-ui';
  export default {
    name: 'comingSoon',
    data () {
      return {
        // 存放请求的影片
        films: [],
        // 当前页
        pageNum: 1,
        // 页条数
        pageSize: 5,
        // 总页数
        tatalPage: 0,
        // 总数据条数
        tatal: 0,
        // 加载更多
        loadText: '加载更多'
      }
    },

    methods: {
      // 请求后台数据
      getFilmsDate () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'triple-bounce'
        });
        axios.get('/api/film/list', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            type: 2
          }
        })
          .then((res) => {
            Indicator.close();
            var result = res.data;
            if (result.code === 0) {
              console.log(result)
              this.tatal = res.data.data.tatal
              this.films.push(...result.data.film);
            } else {
              alert(res.msg);
            }
          })
      },

      // 主演获取
      getActors (actors) {
        var arr = [];
        // 有主演名单才遍历筛选
        if (actors) {
          arr = actors.map(function (item) {
            return item.name;
          })
        }
        return arr.join(' ');
      },

      // 详情页传递filmId
      goDetail (id) {
        this.$router.push({
          // 用 name , $route 里边 看不path 路径 和 parms 参数
          // name: 'filmDetail'
          path: `/films/${id}`
        })
      },

      // 加载更多数据
      moreDate () {
        // 计算页数
        this.tatalPage = Math.ceil(this.tatal / this.pageSize);
        this.pageNum++;
        // console.log(this.tatalPage, this.pageNum)
        if (this.pageNum < this.tatalPage) {
          this.getFilmsDate();
        } else {
          this.loadText = '已全部加载'
        }
      }
    },

    created () {
      this.getFilmsDate();
    }
  }
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";
.mainWrapBox {
  .mainBox {
    margin-left: px2rem(15);
    overflow: auto;

    .mainItemBox {
      padding: px2rem(15) px2rem(15) px2rem(15) 0;
      border-bottom: px2rem(1) solid #eee;
      a {
        display: flex;
        align-items: center;
        // box-sizing: border-box;
        .filmImg {
          img {
            width: px2rem(66);
            height: px2rem(94);
            display: block;
          }
        }
        .filmInfo {
          padding: 0 px2rem(10);
          font-size: px2rem(13);
          width: px2rem(209);

          .filmName {
            width: 100%;
            span {
              color: #191a1b;
              font-size: px2rem(16);
            }
            i {
              font-size: px2rem(12);
              color: #fff;
              background-color: #d2d6dc;
              height: px2rem(14);
              line-height: px2rem(14);
              padding: 0 px2rem(2);
              border-radius: px2rem(2);
            }
          }
          .grade {
            i {
              color: #ffb232;
              font-size: px2rem(14);
            }
          }
          .info {
            width: 100%;
          }
        }
        .buy {
          line-height: px2rem(25);
          height: px2rem(25);
          width: px2rem(50);
          color: #ff5f16;
          font-size: px2rem(13);
          text-align: center;
          border-radius: px2rem(2);
          position: relative;
          border: px2rem(1) solid #ff5f16;
        }
      }
    }
  }
}

.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.distance {
  font-size: px2rem(13);
  line-height: px2rem(20);
}

.load-more {
  text-align: center;
  line-height: px2rem(30);
  font-size: px2rem(14);
  color: #776a67;
}
</style>
