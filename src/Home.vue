<template>
  <article-content v-if="checkSearch"></article-content>
  <div v-else>
    <span>Home</span>
  </div>
</template>

<script>

import Button from './components/modules/Button.vue'

export default {
  computed: {
    checkSearch() {
      return this.$route.query.s && this.$store.state.post.id
    }
  },
  beforeRouteEnter (route, redirect, next) {
    next(vm=>{
      if(route.query.s) {
        vm.$store.commit('MODE_CHANGE',`search`)
        vm.$store.dispatch('recieveSearchPosts',route.query.s)
      }else {

        vm.$store.commit('MODE_CHANGE',`index`)
        if(vm.$store.state.list.index.length>0){
          vm.$store.state.list.current = vm.$store.state.list.index
        }else{
          vm.$store.dispatch('recieveLatestPosts')
        }
      }
    })
  },
  beforeRouteLeave (route, redirect, next) {
    next()
  },
  watch : {
      // 検索用
      '$route' (to, from) {
        if(to.query.s) {
          console.log("query")
          this.$store.commit('MODE_CHANGE',`search`)
          this.$store.dispatch('recieveSearchPosts',to.query.s)
        }else {
          console.log('not query')
        }
    }
  },
}
</script>

