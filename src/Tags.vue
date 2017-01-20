<template>
  <transition name="fade">
    <div>
      <h1>categories</h1>
    </div>
  </transition>
</template>

<script>

import Button from './components/modules/Button.vue'

export default {
  computed: {
    post () {
      // return this.$store.state.post
    }
  },
  methods: {
    test() {
      console.log("cat")
    }
  },
  // components: {
  //   'btn': Button
  // },
  // data () {
  //   return {
  //
  //   }
  // },

  beforeRouteEnter (route, redirect, next) {

    const params = {
      filter: {
        "tag": route.params.slug
      }

    }

    next(vm => {
      vm.$http.get(
        "http://tanshio.net/wp-json/wp/v2/posts?_embed",
        {
          params:params
        }
      ).then((response) => {
        console.log(response)
        vm.$store.state.list = response['body']
        // console.log(vm.$store.state.list)

        next()
        // th
      })


    })

    console.log("vefore2")
  // called before the route that renders this component is confirmed.
  // does NOT have access to `this` component instance,
  // because it has not been created yet when this guard is called!
  },
  beforeRouteLeave (route, redirect, next) {
    console.log("home")
    next()
  // called when the route that renders this component is about to
  // be navigated away from.
  // has access to `this` component instance.
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
