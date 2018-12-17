import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    curCity: '汕尾市',
    projectName: '卖座网',
    likeFilms: [
      {
        fimlsName: '猫王',
        isLike: true
      },
      {
        fimlsName: '狗王',
        isLike: true
      },
      {
        fimlsName: '猪王',
        isLike: true
      }
    ],
    maxNum: 1
  },

  getters: {
    filtLike (state, getters) {
      var arr = state.likeFilms.filter((item) => {
        console.log(item.isLike)
        return item.isLike
      })
      return arr.splice(0, getters.maxLikeNum)
    },

    maxLikeNum (state) {
      return state.maxNum * 2
    }
  },

  mutations: {
    changeStateCurCity (state, payload) {
      state.curCity = payload.city + '' + payload.district
    }
  },

  actions: {

  },

  modules: {

  }
});

export default store;
