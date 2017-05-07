<template>
    <div tabindex="0" class="l-wrapper">
      <div class="topic">

        <div @click="back" class="back">
          <svg width="24px" viewBox="1009 111 55 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <desc>back</desc>
              <path d="M1026.03125,112.8125 C1026.96875,111.875 1028.11458,111.40625 1029.46875,111.40625 C1030.82292,111.40625 1031.96875,111.875 1032.90625,112.8125 C1033.84375,113.75 1034.3125,114.94791 1034.3125,116.40625 C1034.3125,117.86459 1033.84375,119.0625 1032.90625,120 L1025.25,127.8125 L1059.15625,127.8125 C1060.51042,127.8125 1061.65625,128.30729 1062.59375,129.29687 C1063.53125,130.28646 1064,131.45833 1064,132.8125 C1064,134.16667 1063.53125,135.33854 1062.59375,136.32813 C1061.65625,137.31771 1060.51042,137.8125 1059.15625,137.8125 L1025.25,137.8125 L1032.75,145.625 C1033.6875,146.562505 1034.15625,147.760409 1034.15625,149.21875 C1034.15625,150.677091 1033.6875,151.874995 1032.75,152.8125 C1031.8125,153.750005 1030.69271,154.21875 1029.39062,154.21875 C1028.08854,154.21875 1026.96875,153.750005 1026.03125,152.8125 L1010.40625,136.25 C1009.46875,135.3125 1009,134.16667 1009,132.8125 C1009,131.35416 1009.46875,130.15625 1010.40625,129.21875 L1026.03125,112.8125 Z" stroke="none" fill="#ad9b9e" fill-rule="evenodd"></path>
          </svg>
        </div>
        <transition name="slide-fade" mode="out-in">
          <h1 v-if="title" key="active">{{title}}</h1>
          <h1 v-else class="is-loading" key="disable">ロード中</h1>
        </transition>
        <div v-if="post.date" class="article__ymd">
          <ymd :time="post.date"></ymd>
        </div>

        <template v-if="post['_embedded']"><cat-list :list="post['_embedded']['wp:term'][0]" type="categories" link="true" class="cat"></cat-list><cat-list :list="post['_embedded']['wp:term'][1]" type="tags" link="true" class="tag"></cat-list></template>
        <div v-if="topics">
          <h2>目次</h2>
          <ul class="topicList">
            <li v-for='(topic,index) in topics'>
              <a @click="move(index,$event)" v-bind:href="'#toc'+index">{{topic}}</a>
            </li>
          </ul>
        </div>

      </div>

      <div class="content">
        <template v-if="content">
          <div v-html="content"></div>
        </template>
      </div>
    </div>
</template>

<script>
import {isSM,isMid} from '.,/../settings/utils.js'

export default {
  computed: {
    post () {
      return this.$store.getters.post
    },
    title() {
      return this.post["title"] ? this.post["title"]["rendered"] : ""
    },
    content() {
      return this.post["content"] ? this.post["content"]["rendered"] : ""
    },
    topics() {
      return this.post["toc"] ? this.post["toc"] : ""
    },
  },
  methods: {
    back: ()=> {
      history.back()
    },
    move: function(index,e){
      e.preventDefault()
      const pos = document.querySelectorAll('.content h2')[index].offsetTop;
      if(isSM()||isMid()) {
        document.querySelectorAll('.view')[0].scrollTop = pos
      }else{
        document.querySelectorAll('.content')[0].scrollTop = pos
      }

    }

  }
}
</script>

<style>

.l-wrapper {
  &:focus {
    outline: none;
    box-shadow: 0 0 14px #ac8085;
  }
  & a {
    transition: opacity .2s ease-in-out;
    &:hover {
      opacity: .7;
    }
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for <2.1.8 */ {
  /*transform: translateX(10px);*/
  opacity: 0;
}

pre {
  white-space: pre-wrap;
}

.topic {
  & time {
    display: block;
    font-size: .8rem;
    font-weight: bold;
    color: #c2b2b3;
    margin-bottom: 1rem;
  }
  & h2 {
    font-size: 1.2rem;
  }
}

.topic h1 {
  margin-bottom: 0;
  background: -webkit-linear-gradient(-62deg, rgb(179, 86, 98) 0%, rgb(191, 160, 163) 50%, rgb(234, 182, 182) 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  &.is-loading {
    position: relative;
    -webkit-background-clip: border-box;
    background-image: -webkit-linear-gradient(-62deg, rgb(179, 86, 98) 0%, rgb(191, 160, 163) 50%, rgb(234, 182, 182) 100%);
    background-size: 200% 200%;
    opacity: .7;
    transform: scaleY(.8);
    &:before {
       content:"";
       display: block;
       background-color: rgba(255,255,255,.1);
       position: absolute;
       width:100%;
       height:100%;
       top: 0;
       left: -100%;
      /*-webkit-filter: blur(10px);*/
       animation: bgAnim 2.4s linear infinite;
     }
   }
}

@keyframes bgAnim {
  0% {
    transform:  translateX(0);
  }
  100% {
    transform:  translateX(250%);
  }
}

.view {
  color: #564b4b;
  line-height: 1.8;
  & p {
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

  & h1{
    line-height: 1.5;

  }

  & h1,
  & h2,
  & h3,
  & h4 {
    letter-spacing: -.05em
  }

  & img {
    max-width: 100%;
    height: auto;
  }
}

.topicList {
  display: none;
  @media screen and (min-width: 780px) {
    display: block;
  }
  & a {
    color: #636dd7;
    &:hover {
      opacity: .7;
    }
  }
}

.back {
  display: block;
  @media screen and (min-width: 780px) {
    display: none;
  }
}

.content {
  & a {
    color: #636dd7;
    &:hover {
      opacity: .7;
    }
  }
}
</style>
