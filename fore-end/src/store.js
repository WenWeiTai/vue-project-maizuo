import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    filmCardDate: []
  },

  mutations: {
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
    }
  }
});

export default store;
