<template>
  <div class="c-article">

    <item v-for='list in lists' :key='list.id' >
      <div class="" v-on:click.capture="test(list,$event)">
        <transition name="fade">
          <router-link :to="{ name: 'post', params: { slug: list.slug }}" @click="test(list)">
            <div class="list-inner__bg">
              <span>
                <svg version="1.1"
                	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                	 x="0px" y="0px" width="55px" height="54.7px" viewBox="0 0 55 54.7" style="enable-background:new 0 0 55 54.7;"
                	 xml:space="preserve">
                <defs>
                </defs>
                <path d="M19.5,53.9c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.1,0.1,0.1,0.1,0.1c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.2,0.1,0.2,0.1
                	c0.3,0.1,0.5,0.2,0.6,0.3c0.2,0,0.4,0,0.6,0c0.3,0.1,0.6,0.1,0.8,0c0.1,0,0.2,0,0.3,0c0.4-0.1,0.8-0.3,1.1-0.5c0,0,0.1-0.1,0.2-0.2
                	c0.3-0.2,0.5-0.3,0.5-0.4c0.1-0.1,0.1-0.1,0.2-0.2c0.1-0.1,0.1-0.2,0.1-0.2L54.5,5.4c0.5-0.8,0.7-1.7,0.5-2.7s-0.7-1.7-1.5-2.2
                	c-0.8-0.5-1.6-0.7-2.6-0.5s-1.7,0.7-2.2,1.4L21,45.7L5.9,30.9c-0.7-0.6-1.6-0.9-2.5-0.9S1.6,30.3,0.9,31S0,32.6,0,33.6
                	c0.1,1,0.4,1.8,1.2,2.4L19.5,53.9C19.5,53.8,19.5,53.9,19.5,53.9z"/>
                </svg>
              </span>
            </div>
            <div class="list-inner">

              <time>{{list.date}}</time>
              <template v-if="list['_embedded']">
                <cat-list class="menu-list" :list="list['_embedded']['wp:term'][0]" type="categories"></cat-list>
                <!-- <cat-list :list="post['_embedded']['wp:term'][1]" type="tags" class="tag"></cat-list> -->
              </template>
              <!-- <cat-list class="menu-list" :list="list.categories" type="categories"></cat-list> -->
              <h1>{{list.title.rendered}}</h1>

            </div>
          </router-link>
        </transition>
      </div>
    </item>
  </div>
</template>

<script>

import TweenMax from 'gsap'
import CubicBezier from '../../settings/CubicBezier.js'

export default {
  props: ['lists'],
  data () {
    return {

    }
  },
  methods: {
    test(index,event) {
      console.log(event)
      console.log(index.title.rendered);
      this.$store.state.tmp[index.slug] = index
      this.$store.state.post = index

      document.body.scrollTop = 0

      // var timeline = new TimelineMax();
      //
      // timeline.to('.logo', .6, {
      //   opacity: .2,
      //   delay  : .5,
      // 	ease: CubicBezier.config(0.72, 0, 0.41, 0.9),
      // 	onComplete: function(){
      //       console.log('end-right')
      //   }
      // });
    }
  }
}
</script>

<style scoped>

.list-inner__bg {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all .2s ease-in-out;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  mix-blend-mode: lighten;
  backface-visibility: hidden;
  font-size: 200px;
  /*background-color: currentColor;*/
}

.list-inner__bg svg {
  display: block;
  max-width: 100%;
  width:100%;
  height: auto;
}

.list-inner__bg span{
  position: absolute;
  bottom: 0;
  right: 0%;
  width: 20%;
  opacity: .4
}


.list-inner {
  position: relative;
  height: 100%;
  padding: 1.5rem;
  z-index: 2;
  backface-visibility: hidden;
}


.c-article {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (min-width: 780px) and (max-width: 1979px){
    display: block;
  }
}

.c-article
  h1 {
    font-size: 14px;
  }

.c-article a {
  text-decoration: none;
}

time {
  display: block;
  margin-bottom: .6rem
}

.item {
  display: block;
  border:1px solid #fff;
  width: 49%;
  /*height: 400px;*/
  padding-bottom: 49%;
  color: #fff;
  position: relative;
  margin-bottom: 1rem;
  @media screen and (min-width: 320px) and (max-width: 640px) {

    width: 100%;
    padding-bottom: 100%;
    /*margin-bottom: 0;*/
  }
  @media screen and (min-width: 780px) {
    width: 100%;
    padding-bottom: 100%;
    margin-bottom: 0;
  }

  @media screen and (min-width: 1979px) {
    width: 48%;
    padding-bottom: 50%;
    margin-bottom: 1rem;
  }
}


.item time {
  font-size: 12px;
}

.item a {
  color: #fff;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all .2s ease-in-out;
  /*padding: 1.5rem;*/
  &:hover {
    color: #ae8388;
    box-shadow: 2px 2px 10px 0 rgb(171, 127, 132);

    .list-inner__bg {
      background: #fff;
    }

    .menu-list li {
      color: #ae8388;
      border-color: #ae8388;
    }
  }
}


/*.item a:visited {
  color: #fff
}*/



/*.item a:visited .list-inner {
  color: #ae8388;
}

.item a:visited .list-inner__bg {
  background: currentColor;
}*/



.item a.router-link-active {
  color: #ae8388;
  box-shadow: 2px 2px 10px 0 rgb(171, 127, 132);
  .menu-list li {
    color: #ae8388;
    border-color: #ae8388;
  }
}

.item a.router-link-active .list-inner__bg {
  background: #fff;
  color: #000;
}


.item + .item{
  @media screen and (min-width: 780px) and (max-width: 1979px){
    margin-top: 1.5rem
  }

}





</style>
