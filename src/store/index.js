import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  mode: null,
  keyword: "",
  list: {
    current: [],
    index: [],
    categories: {},
    tags: {},
  },
  categories: [],
  tags: [],
  post:{},
  tmp: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production'
    // ? [createLogger()]
    ? []
    : []
})
