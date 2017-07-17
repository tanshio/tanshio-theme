import { set } from 'vue'
import * as types from './mutation-types'

import {getTax} from '../settings/utils.js'

export default {

  [types.RECEIVE_POST] (state, post) {
    set(state, 'post', post)
  },
  [types.RECEIVE_LATEST_POSTS] (state, list) {
    if (state.mode === 'index') {
      set(state.list, 'index', [...state.list.index, ...list])
      set(state.list, 'current', state.list.index)
    } else {
      let name = getTax(state).name
      let term = getTax(state).term
      set(state.list[name], term, [...state.list[name][term], ...list])
      set(state.list, 'current', state.list[name][term])
    }

    list.forEach((item) => {
      state.tmp[item.slug] = item
    })
    setTimeout(() => { state.scroll = true }, 1000)
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
