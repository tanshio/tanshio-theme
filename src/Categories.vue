<template>
  <article-content></article-content>
</template>

<script>

import Button from './components/modules/Button.vue'
import API from './settings/API.js'

export default {
  computed: {

  },
  beforeRouteEnter (route, redirect, next) {
    next(vm => {
      vm.$store.commit('MODE_CHANGE',`category-${route.params.slug}`)
      vm.fetchData(route.params.slug)
    })

  },
  beforeRouteLeave (route, redirect, next) {
    next()
  },
  watch : {
      // ルートが変更されたらこのメソッドを再び呼び出します
      '$route' (to, from) {
        console.log("category-init")

        this.$store.state.mode = `category-${to.params.slug}`

        const params = {
          filter: {
            "category": to.params.slug
          }

        }
         this.fetchData(params)
    }
  },
  methods: {
    fetchData:function(params) {
      const slug = this.$route.params.slug
      this.$http.get(
        `${API.POSTS_CATEGORY}${slug}?_embed`
      ).then((response) => {
        console.log(response)
        this.$store.state.list.categories[slug] = response['body']
        this.$store.state.list.current =  this.$store.state.list.categories[slug]
      })
    }
  }

}
</script>

