<template>
  <article-content v-if="checkSearch"></article-content>
  <div v-else tabindex="0" class="l-wrapper home">
    <div>
      <h1>ABOUT</h1>
      <h2>たんしお / 丹野 翔太について</h2>
      <p>仙台でフリーのWebデザイナーとして働いています。なんでもやる感じです。<br>mail:rakuburomail@gmail.com</p>
      <social type="home-icon"></social>
    </div>
  </div>
</template>

<script>

import Button from './components/modules/Button.vue'

export default {

  metaInfo() {
    return {
      // To use "this" in the component, it is necessary to return the object through a function
      title: `たんしおどっとねっと | なんでもやる感じです`
    }
  },
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
h1 {
  margin-top: 0;
  font-size: 3rem;
}
.home {
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
