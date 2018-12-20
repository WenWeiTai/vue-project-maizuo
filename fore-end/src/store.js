import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    filmCardDate: localStorage.getItem("filmDate") ? JSON.parse(localStorage.getItem("filmDate")) : [],
    cityName: '定位失败'
  },

  mutations: {
    /**
     *
     *  状态改变成百度获取的定位城市
     */
    setCityName (state, name) {
      state.cityName = name;
    },

    replaceCityName (state, payload) {
      state.cityName = payload
    },
    /**
     *
     *  添加电影票
     *  payload 传递的是整条数据
     *  @param {Object}
     *    filmId
     *    filmName
     *    filmPrice
     *    filmNum
     */
    addTicket (state, payload) {
      // console.log(payload)
      var index = -1;
      var filmId = payload.filmId;
      var hasId = state.filmCardDate.some((item, i) => {
        if (filmId === item.filmId) {
          index = i;
          return true
        } else {
          return false
        }
      })

      if (hasId) {
        // 状态已存在此ID的数据，数量添加
        state.filmCardDate[index].filmNum++
      } else {
        // 不存在则添加新数据
        state.filmCardDate.push({
          filmId: payload.filmId,
          filmName: payload.name,
          filmPrice: parseInt(30 + Math.random() * 60),
          filmNum: 1
        })
      }
      // 存入localStorage
      localStorage.setItem("filmDate", JSON.stringify(state.filmCardDate));
    },

    /**
     *
     *  减少电影票
     *  payload 传递的是整条数据
     *  @param {Object}
     *    filmId
     *    filmName
     *    filmPrice
     *    filmNum
     */
    reduceTicket (state, payload) {
      let index = -1;
      state.filmCardDate.forEach((item, i) => {
        if (item.filmId === payload.filmId) {
          index = i;
        }
      })

      if (index > -1) {
        let film = state.filmCardDate[index]
        if (film.filmNum > 1) {
          film.filmNum--
        } else {
          state.filmCardDate.splice(index, 1);
        }
      }
      // 存入localStorage
      localStorage.setItem("filmDate", JSON.stringify(state.filmCardDate));
    }
  },

  actions: {
    /**
     *
     *  定位当前城市，百度接口
     *
     */
    /* eslint-disable */
    getCityName (context) {
      var myCity = new BMap.LocalCity();
      myCity.get((result) => {
        let name = result.name.substr(0, result.name.length - 1);
        context.commit('setCityName', name);
      })
    },
  }
});

export default store;
