<template>
  <article-content></article-content>
</template>

<script>
import {isSM,isMid} from './settings/utils.js'

export default {
  watch : {
    '$route': 'fetchData',
    title: function() {
      this.$emit('updateHead')
    }
  },
  computed: {
    post () {
      return this.$store.getters.post
    },
    title() {
      return this.post["title"] ? this.post["title"]["rendered"] : ""
    },
  },

  beforeRouteEnter (route, redirect, next) {
    next(vm => {
      vm.$store.dispatch('init',route)
      if (!vm.$store.state.mode) {
        vm.$store.state.mode = 'index'
      }
    })
  },
  beforeRouteLeave (route, redirect, next) {
    next()
  },

  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    title: function () {
      return {
        inner: this.title
      }
    },
    meta: [
      { name: 'description', content: 'My description', id: 'desc' }
    ]
  },

  methods: {
    back: ()=> {
      history.back()
    },

    move: function(index,e){
      e.preventDefault()
      const pos = document.querySelectorAll('.content h2')[index].offsetTop;
      if(isSM()||isMid()) {
        if(document.querySelector('.view')){
          document.querySelector('.view').scrollTop = pos
        }
      }else{
        if(document.querySelector('.content')){
          document.querySelector('.content').scrollTop = pos
        }
      }

    },
    fetchData:function() {

      const tmp = this.$store.state.tmp
      console.log(this.$route.params.slug)

      if(tmp[this.$route.params.slug]){
        console.log('ある')
        console.log(tmp[this.$route.params.slug])
        this.$store.state.post = tmp[this.$route.params.slug]
        this.$emit('updateHead')
      }else {
        console.log('ない')
        let that = this
        this.$store.dispatch('recievePost',this.$route.params.slug).then(()=> {
          console.log('finished')


        })
      }

    }

  }
}
</script>

<style scoped>


pre {
  white-space: pre-wrap;
}

.topic h1 {
  background: -webkit-linear-gradient(-62deg, rgb(179, 86, 98) 0%, rgb(191, 160, 163) 50%, rgb(234, 182, 182) 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}


.view {
  color: #564b4b;
  line-height: 1.8;
  p {
    text-align: justify;
    &+p {
      margin-top: 1.6rem
    }
    & + h1,
    & + h2,
    & + h3,
    & + h4 {
      margin-top: 4rem
    }
  }

  h1{
    line-height: 1.5
  }

  h1,
  h2,
  h3,
  h4 {
    letter-spacing: -.05em
  }

  img {
    max-width: 100%;
    height: auto;
  }
  a {
    color: var(--g-color);
  }
}

.topicList {
  display: none;
  @media screen and (min-width: 780px) {
    display: block;
  }
}

.back {
  display: block;
  @media screen and (min-width: 780px) {
    display: none;
  }
}


</style>
