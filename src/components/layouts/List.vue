<template>
  <div class="c-article">

    <item v-for='list in lists' :key='list.id' >
      <div v-on:click.capture="setPost(list,$event)">
        <transition name="fade">
          <router-link :to="{ name: 'post', params: { slug: list.slug }}">
            <div class="list-inner">
              <ymd :time="list.date"></ymd>
              <template v-if="list['_embedded']">
                <cat-list class="menu-list" :list="list['_embedded']['wp:term'][0]" type="categories"></cat-list>
              </template>
              <h1>{{list.title.rendered}}</h1>
            </div>
          </router-link>
        </transition>
      </div>
    </item>
  </div>
</template>

<script>

import {isSM,isMid} from '../../settings/utils'

export default {
  props: ['lists'],
  methods: {
    setPost(index,event) {

      document.querySelector('.l-wrapper').focus()

      this.$store.state.tmp[index.slug] = index
      this.$store.state.post = index

      if(isMid()){
        if(document.querySelector('.view')){
          document.querySelector('.view').scrollTop = 0
        }
      }else if(isSM()){
        document.body.scrollTop = 0
      }else {
        if(document.querySelector('.content')){
          document.querySelector('.content').scrollTop = 0
        }

      }
    }
  }
}
</script>

<style>

.list-inner {
  position: relative;
  height: 100%;
  padding: 1.5rem;
  z-index: 2;
  /* backface-visibility: hidden; */
  transition: background-color .5s ease-in-out;
}

.c-article {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 1rem;
  @media screen and (min-width: 780px) and (max-width: 1979px){
    display: block;
  }
  & h1 {
    font-size: 14px;
  }

  & a {
    text-decoration: none;
  }
}

.item {
  display: block;
  border:1px solid #fff;
  width: 100%;
  padding-bottom: 75%;
  color: #fff;
  position: relative;
  margin-bottom: 1rem;
  @media screen and (min-width: 320px) and (max-width: 640px) {
    width: 100%;
    padding-bottom: 75%;
  }
  @media screen and (min-width: 780px) {
    width: 100%;
    padding-bottom: 100%;
    margin-bottom: 0;
  }

  & time {
    display: block;
    font-size: 12px;
    margin-bottom: .6rem
  }
  & a {
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
      & .list-inner {
        background: #fff;
      }
      & .menu-list {
        & li {
          color: #ae8388;
          border-color: #ae8388;
        }
      }
    }
  }
  & .router-link-active {
    color: #ae8388;
    box-shadow: 2px 2px 10px 0 rgb(171, 127, 132);
    & .list-inner {
      background-color: #fff;
    }
    & .menu-list {
      & li {
        color: #ae8388;
        border-color: #ae8388;
      }
    }
  }

  & + & {
    @media screen and (min-width: 780px){
      margin-top: 1.5rem
    }
  }
}
</style>
