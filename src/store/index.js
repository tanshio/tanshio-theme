import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
// document.title = ''
Vue.use(Vuex)

const state = {
  mode: null,
  keyword: '',
  list: {
    current: [],
    index: [],
    categories: {},
    tags: {}
  },
  count: {
    index: 1,
    categories: {

    },
    tags: {

    }
  },
  categories: [],
  tags: [],
  post: {},
  tmp: {},
  scroll: true
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
