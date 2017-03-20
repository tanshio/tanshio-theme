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

        const params = {
          filter: {
            "tag": to.params.slug
          }

        }
         this.fetchData(params)
      }
    },
    methods: {
      fetchData:function(params) {
        const slug = this.$route.params.slug
        this.$http.get(
          `${API.POSTS_TAG}${slug}?_embed`
        ).then((response) => {
          this.$store.state.list.tags[slug] = response['body']
          this.$store.state.list.current =  this.$store.state.list.tags[slug]
        })
      }
    }

  }
</script>
