import "babel-polyfill"
import Vue from 'vue'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueResource)
Vue.use(VueRouter)

import store from './store'

import App from 'App.vue'

import Home from 'Home.vue'
import Post from 'Post.vue'

import Categories from 'Categories.vue'
import Tags from 'Tags.vue'


import Lists from 'components/modules/TaxList.vue'
import Search from 'components/modules/Search.vue'

import Content from 'components/layouts/Content.vue'
import List from 'components/layouts/List.vue'
import Item from 'components/layouts/Item.vue'


Vue.component('search', Search)
Vue.component('list', List)
Vue.component('item', Item)
Vue.component('article-content', Content)
Vue.component('cat-list',Lists)

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/:slug', name: 'post', component: Post},
    { path: '/category/:slug', name: 'categories', component: Categories },
    { path: '/tags/:slug', name: 'tags', component: Tags }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// window.router = router;
