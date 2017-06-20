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
    if (state.mode === 'index') {
      set(state.list, 'index', [...state.list.index, ...list])
      set(state.list, 'current', state.list.index)
    } else if (/category-/.test(state.mode)) {
      set(state.list.categories, state.mode.replace('category-', ''), [...state.list.categories[state.mode.replace('category-', '')], ...list])
      set(state.list, 'current', state.list.categories[state.mode.replace('category-', '')])
    } else {
      set(state.list.tags, state.mode.replace('tags-', ''), [...state.list.tags[state.mode.replace('tags-', '')], ...list])
      set(state.list, 'current', state.list.tags[state.mode.replace('tags-', '')])
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
