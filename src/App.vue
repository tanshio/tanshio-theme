<template>
  <div id="app">

    <div class="main" v-bind:class="classObject">
      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>
    </div>
    <layout-menu></layout-menu>

  </div>
</template>

<script>

import Button from './components/modules/Button.vue'
import API from './settings/API.js'

export default {
  computed: {
    classObject() {
      let obj = {}
      obj[this.$route.name] = true
      return obj
    }
  },
  methods: {
    hover() {
      console.log("hover")
    }
  },
  data () {
    return {

    }
  },

  mounted(){

    console.log("app.vue")

    async function test(that){

        await Promise.all([
          that.$http.get(
            API.CATEGORIES,
          ).then((response) => {
            that.$store.state.categories = response['body']
            console.log("cat")
          }),
          that.$http.get(
            API.TAGS,
            {
              params:{ per_page:100}
            }
          ).then((response) => {
            that.$store.state.tags = response['body']
            console.log("tag")
          })
        ])

        console.log("async終わり")
    }

    test(this).then(()=>{
        // 全てresolveが呼ばれた場合、この関数が実行される
        console.log("全部成功したよ！");
    }).catch(()=>{
        // 途中1回でもreject関数が呼ばれた場合、この関数が実行される
        console.log("途中で失敗したみたい…");
    });

  },

}
</script>

<style>
@import "normalize.css/normalize.css";
@import "./styles/_var.css";
* {
  box-sizing: border-box;
}

body {
  font-family:  "YakuHanJP", apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, "source-han-sans-japanese", "Yu Gothic", YuGothic, Verdana, Meiryo, sans-serif;
  margin: 0;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
}
/* ul li{ */
/*   font-family: "futura-pt",sans-serif */
/* } */


img {
  max-width: 100%;
  vertical-align: bottom;
  height: auto;
}

#app {
  display: block;
  @media screen and (min-width: 780px) {
    display: flex;
    flex-direction: row;
  }
}

.main {
  display: block;
  width:100%;
  background: #fff;
  /*display: none;*/
  position: fixed;
  z-index: 9999;
  top:0;
  left: 0;
  height: 100%;
  /*overflow-y: auto;
  -webkit-overflow-scrolling: touch;*/
  backface-visibility: hidden;
  /*padding: 2rem;*/
  @media screen and (min-width: 780px) {
    width: calc(100% - 300px);
    margin-left: 300px;
    /*position:static;*/
    display: block;
  }

  &.categories,&.tags {}

  &.home {

  }

  &.post {

  }
}



.view {
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  @media screen and (min-width: 1600px) {
    display: flex;
    width: 100%;
  }

}

.topic {
  width: 100%;
  padding: 2rem;
  background-color: #ece8e8;
  @media screen and (min-width: 780px) {
    padding: 3rem;
  }

  @media screen and (min-width: 1600px) {
    width: 50%;
  }
}

.content {
  width: 100%;
  padding: 2rem;
  @media screen and (min-width: 780px) {
    padding: 3rem;
  }

  @media screen and (min-width: 1600px) {
    width: 50%;
    height: 100%;
    overflow-y: scroll;
  }
}

pre {
  overflow: scroll;
}

.list-cat {
  background: #adb0d2;
  position: relative;

  &:hover {
    .list-cat__child {
      visibility: visible;
    }
  }
}

.list-cat__child {
  position: absolute;
  visibility: hidden;
}

.list-tag {
  background: #c2b2b3;
}

.list-car {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  margin-bottom: 3rem;
  li {
    position: relative;
    flex: 1;
    text-align: center;
    margin-right: 0;
    padding: .8em;
    color: #fff;
    font-size: .8rem;
    &:first-of-type {
      margin-right: 1rem
    }



  }

}

</style>
