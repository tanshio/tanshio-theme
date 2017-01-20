<template>
  <transition name="fade">
    <div>
      <div class="topic">
        <div @click="back" class="back">
          <svg width="24px" viewBox="1009 111 55 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <desc>back</desc>
              <path d="M1026.03125,112.8125 C1026.96875,111.875 1028.11458,111.40625 1029.46875,111.40625 C1030.82292,111.40625 1031.96875,111.875 1032.90625,112.8125 C1033.84375,113.75 1034.3125,114.94791 1034.3125,116.40625 C1034.3125,117.86459 1033.84375,119.0625 1032.90625,120 L1025.25,127.8125 L1059.15625,127.8125 C1060.51042,127.8125 1061.65625,128.30729 1062.59375,129.29687 C1063.53125,130.28646 1064,131.45833 1064,132.8125 C1064,134.16667 1063.53125,135.33854 1062.59375,136.32813 C1061.65625,137.31771 1060.51042,137.8125 1059.15625,137.8125 L1025.25,137.8125 L1032.75,145.625 C1033.6875,146.562505 1034.15625,147.760409 1034.15625,149.21875 C1034.15625,150.677091 1033.6875,151.874995 1032.75,152.8125 C1031.8125,153.750005 1030.69271,154.21875 1029.39062,154.21875 C1028.08854,154.21875 1026.96875,153.750005 1026.03125,152.8125 L1010.40625,136.25 C1009.46875,135.3125 1009,134.16667 1009,132.8125 C1009,131.35416 1009.46875,130.15625 1010.40625,129.21875 L1026.03125,112.8125 Z" stroke="none" fill="#ad9b9e" fill-rule="evenodd"></path>
          </svg>
        </div>

        <h1 v-if="title">{{title}}</h1>

        <template v-if="post['_embedded']"><cat-list :list="post['_embedded']['wp:term'][0]" type="categories" link="true" class="cat"></cat-list><cat-list :list="post['_embedded']['wp:term'][1]" type="tags" link="true" class="tag"></cat-list></template>

        <ul>
          <li v-for='(topic,index) in topics'>
            <a @click="move(index,$event)" v-bind:href="'#toc'+index">{{topic}}</a>
          </li>
        </ul>

      </div>
      <div class="content">
        <template v-if="content">
          <div v-html="content"></div>
        </template>
      </div>
    </div>

  </transition>
</template>

<script>
import {isSM,isMid} from './settings/utils.js'

export default {
  computed: {
    post () {
      return this.$store.state.post
    },
    title() {
      return this.$store.state.post["title"] ? this.$store.state.post["title"]["rendered"] : ""
    },
    content() {
      return this.$store.state.post["content"] ? this.$store.state.post["content"]["rendered"] : ""
    },
    topics() {
      return this.$store.state.post["posts"] ? this.$store.state.post["posts"] : ""
    },
    width() {
      return isSM() ? true : false;
    }

  },

  data () {
    return {
        topicsList: null
    }
  },

  watch : {
      // ルートが変更されたらこのメソッドを再び呼び出します
      '$route': 'fetchData',
      'post': 'createToc'

  },
  beforeRouteEnter (route, redirect, next) {
    next(vm => {
      vm.$store.dispatch('init',route)
    })

  },
  beforeRouteLeave (route, redirect, next) {
    next()
  },
  methods: {
    back: ()=> {
      history.back()
    },
    createToc: function(){

        var that = this;
        that.topicsList = null;
        setTimeout(()=>{
          that.topicsList = [...document.querySelectorAll('.content h2')]
          setTimeout(()=>{
            Array.from(document.querySelectorAll('.content h2')).forEach((e,i) => {
              e.setAttribute('id','toc'+i)
            })
          },0)
        },0)

    },
    move: function(index,e){
      e.preventDefault()
      const pos = document.querySelectorAll('.content h2')[index].offsetTop;
      if(isSM()||isMid()) {
        document.querySelectorAll('.view')[0].scrollTop = pos
      }else{
        document.querySelectorAll('.content')[0].scrollTop = pos
      }

    },
    fetchData:function() {

      const tmp = this.$store.state.tmp

      if(tmp[this.$route.params.slug]){
        this.$store.state.post = tmp[this.$route.params.slug]
        return;
      }
      this.$store.dispatch('recievePost',this.$route.params.slug)
    }

  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

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
    max-width: 100%
  }
}



.back {
  display: block;
  @media screen and (min-width: 780px) {
    display: none;
  }
}


</style>
