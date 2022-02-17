import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuNavBar: [],
    listData: [],
  },
  getters: {
    getMenuNavBar: function (state) {
      return state.menuNavBar;
    },
    getListData: function (state) {
      return state.listData;
    },
  },
  mutations: {
    updateMenuNavBar: (state, payload) => {
      state.menuNavBar = payload
    },
    updateListData: (state, payload) => {
      state.listData = payload
    },
  },
  actions: {
    saveMenuNavBar: ({ commit }, payload) => {
      commit("updateMenuNavBar", payload)
    },
    saveListData: ({ commit }, payload) => {
      commit("updateListData", payload)
    },
  },
  modules: {
  }
})
