<template>
  <div class="film-detail">
    <div class="film-header">
      <router-link tag="i" class="iconfont iconfont-zuojiantou goback" to="/"></router-link>
      <!-- <span class="filem-title">{{detailsDate && detailsDate.name}}</span> -->
    </div>

    <div class="film-poster">
      <img :src="detailsDate && detailsDate.poster">
    </div>

    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{detailsDate && detailsDate.name}}</span>
          <span class="item">{{detailsDate && detailsDate.item && detailsDate.item.name}}</span>
        </div>
        <div class="film-grade">
          <span class="grade">{{detailsDate && detailsDate.grade}}</span>
          <span class="grade-text">分</span>
        </div>
      </div>

      <div class="film-category grey-text">{{detailsDate && detailsDate.category}}</div>
      <div class="film-premiere-time grey-text">
        {{detailsDate && detailsDate.premiereAt}}上映
      </div>
      <div class="film-nation-runtime grey-text">
        {{detailsDate && detailsDate.nation}} | {{detailsDate && detailsDate.runtime}}分钟
      </div>
      <div class="film-synopsis grey-text">
        {{detailsDate && detailsDate.synopsis}}
      </div>
      <div class="toggle">
        <i class="iconfont icon-xiala"></i>
      </div>
    </div>

    <div class="film-actors film-box">
      <div class="title"><span>演职人员</span></div>
      <ul class="film-ul">
        <li class="actors-info"
        v-for="(item,index) in detailsDate.actors"
        :key="index">
          <img :src="item.avatarAddress">
          <p>{{ item.name }}</p>
          <p>{{ item.role }}</p>
        </li>
      </ul>
    </div>
    <div class="film-photo film-box">
      <div class="title"><span>剧照</span></div>
      <ul class="film-ul photo-ul">
        <li class="photo-info"
        v-for="(item,index) in detailsDate.photos"
        :key="index">
          <img :src="item">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swiper from 'swiper';
export default {
  name: 'filmDetail',
  data () {
    return {
      detailsDate: {}
    }
  },

  created () {
    // console.log(this.$route.params.filmId);
    axios.get('/api/film/details', {
      params: {
        filmId: this.$route.params.filmId
      }
    }).then((res) => {
      var result = res.data
      if (result.code === 1) {
        this.detailsDate = result.data[0]
        console.log(this.detailsDate)
      } else {
        alert(result.msg)
      }
    });
  },

  mounted () {
    /**
     *
     *  演员轮播
     */
    new Swiper('.swiper-container', {

    });
  }
}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';
@import 'swiper/dist/css/swiper.min.css';
.film-detail {
  position: relative;
  background: #eee;
  // height: 100%;
  flex: 1;
  overflow-y: auto;

  .film-poster {
    height: px2rem(210);
    img {
      width: 100%;
      height: 100%;
    }
  }

  .film-detail {
    padding: px2rem(15);
    padding-top: px2rem(12);
    background-color: #fff;

    .col {
      display: flex;
      align-items: center;
    }

    .film-name {
      flex: 1;
      display: flex;
      align-items: center;

      .name {
        color: #191a1b;
        font-size: px2rem(18);
        height: px2rem(24);
        line-height: px2rem(24);
        margin-right: px2rem(8);
      }

      .item {
        font-size: px2rem(12);
        color: #fff;
        background-color: #d2d6dc;
        height: px2rem(14);
        line-height: px2rem(14);
        padding: 0 px2rem(2);
        border-radius: px2rem(2);
        display: inline-block;
      }
    }

    .film-grade {
      flex-shrink: 0;
      width: px2rem(100);
      text-align: right;
      color: #ffb232;
      font-size: px2rem(12);

      .grade {
        font-size: px2rem(18);
        font-style: italic;
      }
    }

    .grey-text {
      font-size: px2rem(13);
      line-height: px2rem(20);
      color: #797d82;
      margin-top: px2rem(4);
    }

    .film-synopsis {
      margin-top: px2rem(8);
      overflow: hidden;
      &.hide {
        height: px2rem(40);
      }
    }

    .toggle {
      text-align: center;
      &.hide {
        i {
          transform: translate(180deg);
        }
      }
    }
  }
}

.film-header {
  position: fixed;
  .goback {
    height: px2rem(30);
    width: px2rem(30);
    position: absolute;
    top: px2rem(5);
    left: px2rem(5);
    background: rgba(255,255,255,.5);
    border-radius: 50%;
    line-height: px2rem(30);
    text-align: center;
    font-size: px2rem(20);
  }
}

.film-box {
  margin-top: px2rem(10);
  background: #fff;
  .title {
    padding: px2rem(15);
  }
}

.film-ul {
  padding-left: px2rem(15);
  display: flex;
  overflow-y: auto;
}

.actors-info {
  width: px2rem(85);
  margin-right: px2rem(10);
  font-size: px2rem(12);
  text-align: center;
  padding-bottom: px2rem(10);
  img {
    width: px2rem(85);
  }
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.photo-ul {
  height: px2rem(115);
  display: flex;
  justify-content: flex-start;
  overflow-y: hidden;
  margin-bottom: px2rem(10);
}

.photo-info {
  width: px2rem(150);
  margin-right: px2rem(10);
  img {
    width: px2rem(150);
  }
}

// .film-header {
//   position: sticky;
//   top: 0;
//   z-index: 999;
//   background: #f00;
// }
</style>
