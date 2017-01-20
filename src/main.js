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
import List from 'components/layouts/List.vue'
import Item from 'components/layouts/Item.vue'

Vue.component('list', List)
Vue.component('item', Item)
Vue.component('search', Search)

Vue.component('cat-list',Lists)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
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
