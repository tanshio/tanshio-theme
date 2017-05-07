import { set } from 'vue'
import * as types from './mutation-types'

export default {

  [types.INIT2] (state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('init2')
        resolve()
      }, 1000)
    })
  },
  [types.RECEIVE_POST] (state, post) {
    set(state, 'post', post)
  },
  [types.RECEIVE_LATEST_POSTS] (state, list) {
    set(state.list, 'index', list)
    set(state.list, 'current', state.list.index)
    list.forEach((item) => {
      state.tmp[item.slug] = item
    })
  },
  [types.RECEIVE_SEARCH_POSTS] (state, list) {
    set(state.list, 'current', list)
  },
  [types.MODE_CHANGE] (state, value) {
    state.mode = value
  },
  [types.INCREMENT_PAGES] (state, value) {

  }
}
