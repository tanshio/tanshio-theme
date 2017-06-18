// import * as api from '../api'
import Vue from 'vue'
import { set } from 'vue'
import * as types from './mutation-types'

import API from '../settings/API.js'

const TERM_LIMIT = 100

function initCategories () {
  return Vue.http.get(
    API.CATEGORIES,
    {
      params: {per_page: TERM_LIMIT}
    }
  )
}

function initTags () {
  return Vue.http.get(
    API.TAGS,
    {
      params: {per_page: TERM_LIMIT}
    }
  )
}

// async function initTaxonomies(state){
//   await Promise.all([
//     initCategories().then((response) => {
//     console.log(response)
//       set(state, 'categories', response['body'])
//       console.log("__cat")
//     }),
//     initTags().then((response) => {
//       console.log(response)
//       set(state, 'tags', response['body'])
//       console.log("__tag")
//     })
//   ])
// }

export const recieveLatestPosts = ({state, commit}) => {
  console.log('recieveLatestPosts')
  Vue.http.get(
    API.POSTS
  ).then((response) => {
    console.log('recieveLatestPosts-end')
    commit(types.RECEIVE_LATEST_POSTS,response['body'])
  })
}

export const recieveSearchPosts = ({ state, commit},query) => {
  console.log('recieveSearchPosts')
  Vue.http.get(
    API.POSTS,
    {
      params: {
        search:query,
      }
    }
  ).then((response) => {
    console.log('recieveSearchPosts-end')
    console.log(response['body'])
    commit(types.RECEIVE_SEARCH_POSTS, response['body'])
  })
}

export const recievePost = ({state, commit}, slug) => {
  console.log('recievePost')
  Vue.http.get(
    API.POSTS,
    {
      params: {
        slug: slug
      }
    }
  ).then((response) => {
    console.log('recievePost-end')
    console.log(response)
    commit(types.RECEIVE_POST, response['body'][0])
  })
}

export const infinityScroll = ({state, commit}) => {
  if (state.scroll && state.mode === 'index') {
    state.scroll = false

    console.log('scrolled!')

    state.count.index++

    Vue.http.get(
      API.POSTS,
      {
        params: {
          per_page: API.PER_PAGE,
          page: state.count.index
        }
      }
    ).then((response) => {
      console.log('recieveLatestPosts-end')
      commit(types.RECEIVE_LATEST_POSTS, response['body'])
    })
  }
}

export const init = async ({state, dispatch, commit}, route) => {
  if (!state.list.current.length > 0) {
    // await initTaxonomies(state)
    dispatch('recieveLatestPosts')
  }

  dispatch('recievePost', route.params.slug)

  // commit(types.INIT2,await test2())
}

export const getAllMessages = ({ commit }) => {
  console.log(commit)
  // api.getAllMessages(messages => {
  //   commit(types.RECEIVE_ALL, {
  //     messages
  //   })
  // })
}

// export const sendMessage = ({ commit }, payload) => {
//   api.createMessage(payload, message => {
//     commit(types.RECEIVE_MESSAGE, {
//       message
//     })
//   })
// }
//
// export const switchThread = ({ commit }, payload) => {
//   commit(types.SWITCH_THREAD, payload)
// }
