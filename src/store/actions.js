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

  const $data = document.getElementById('data-list')
  if ($data) {
    commit(types.RECEIVE_POST, JSON.parse($data.textContent)[0])
    document.body.removeChild($data)
  } else {
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
}

export const infinityScroll = ({state, commit}) => {
  if (state.scroll) {
    state.scroll = false
    let url = ''
    let page
    if (state.mode === 'index') {
      state.count.index++
      url = API.POSTS
      page = state.count.index
    } else if (/category-/.test(state.mode)) {
      state.count.categories[state.mode.replace('category-', '')]++
      url = API.POSTS_CATEGORY+state.mode.replace('category-', '')+'?_embed'
      page = state.count.categories[state.mode.replace('category-', '')]
      console.log(page)
      console.log(state.mode.replace('category-', ''))
      console.log("⇡")
    } else {
      state.count.tags[state.mode.replace('tag-', '')]++
      url = API.POSTS_TAG+state.mode.replace('tag-', '')+'?_embed'
      page = state.count.tags[state.mode.replace('tag-')]
    }

    console.log('scrolled!')

    Vue.http.get(
      url,
      {
        params: {
          per_page: API.PER_PAGE,
          page: page
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

// export const getAllMessages = ({ commit }) => {
//   console.log(commit)
//   // api.getAllMessages(messages => {
//   //   commit(types.RECEIVE_ALL, {
//   //     messages
//   //   })
//   // })
// }
//
