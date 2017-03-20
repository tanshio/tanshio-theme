<template>
  <div>
    <span>Home</span>
  </div>
</template>

<script>

import Button from './components/modules/Button.vue'

export default {
  beforeRouteEnter (route, redirect, next) {

    next(vm=>{
      if(route.query.s) {
        vm.$store.dispatch('recieveSearchPosts',route.query.s)
      }else {
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
      // ルートが変更されたらこのメソッドを再び呼び出します
      '$route' (to, from) {
        if(to.query.s) {
          console.log("query")
          this.$store.dispatch('recieveSearchPosts',to.query.s)
        }
    }

  },
}
</script>

