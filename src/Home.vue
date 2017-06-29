<template>
  <article-content v-if="checkSearch"></article-content>
  <div v-else tabindex="0" class="l-wrapper">
    <div>
      <h1>ABOUT</h1>
      <h2>たんしお / 丹野 翔太について</h2>
      <p>仙台でフリーのWebデザイナーとして働いています。<br>色々やっていたらアプリやサーバーやデータベースや広告運用など浅く広い感じになりました。</p>
      <ul>
        <li>TWITTER</li>
        <li>GITHUB</li>
      </ul>
    </div>
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
<style scoped>
.l-wrapper {
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: #ece8e8;
  & div {
    position: relative;
    z-index: 2;
    & h1, & h2 {
      background: -webkit-linear-gradient(-62deg, rgb(179, 86, 98) 0%, rgb(191, 160, 163) 50%, rgb(234, 182, 182) 100%);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      /* text-shadow: 0 0 0 #000; */
    }
    & p {
      line-height: 1.8;
    }


  }
}
</style>
