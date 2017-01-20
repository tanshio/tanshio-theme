<template>
  <transition name="fade">
    <div>
      <h1>categories</h1>
    </div>
  </transition>
</template>

<script>

import Button from './components/modules/Button.vue'
import API from './settings/API.js'

export default {
  computed: {

  },
  beforeRouteEnter (route, redirect, next) {

    // const params = {
    //   "category_name":
    // }


    next(vm => {
      vm.fetchData(route.params.slug)
    })

  },
  beforeRouteLeave (route, redirect, next) {
    next()
  },
  watch : {
      // ルートが変更されたらこのメソッドを再び呼び出します
      '$route' (to, from) {
        console.log(to)
        console.log("qqq")

        const params = {
          filter: {
            "category": to.params.slug
          }

        }
        // this.fetchData(params)
    }
  },
  methods: {
    fetchData:function(params) {


      console.log(params)
      console.log(this.$store.state.categories)

      this.$http.get(
        `${API.POSTS_CATEGORY}${this.$route.params.slug}?_embed`
      ).then((response) => {
        console.log(response)
        this.$store.state.list = response['body']
      })
    }
  }

}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
