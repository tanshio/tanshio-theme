<template>
  <div class="menu">
    <router-link to="/">
      <logo></logo>
    </router-link>
    <search></search>
    <!-- <ul class="list&#45;car"> -->
    <!--   <li class="list&#45;cat" @mouseover="hover"> -->
    <!--     <span>Category</span> -->
    <!--     <ul class="list&#45;cat__child"> -->
    <!--       <li>aaaa</li> -->
    <!--       <li>aaaa2</li> -->
    <!--     </ul> -->
    <!--   </li> -->
    <!--   <li class="list&#45;tag">Tag</li> -->
    <!-- </ul> -->
    <list :lists="lists"></list>
    <div class="m-loading is-loading"></div>
  </div>
</template>
<style>
@import "../../styles/_var.css";
.list-cat {
  background-color: var(--g-color);
}

.menu {
  width: 100%;
  padding: 0 2rem;
  padding-bottom: 2rem;
  position: fixed;
  top:0;
  left:0;
  height: 100vh;
  background: -webkit-linear-gradient(-62deg, rgb(169, 123, 129) 0%, rgb(210, 192, 189) 75%, rgb(193, 177, 179) 100%) rgb(175, 149, 145);
  overflow-y: auto;
  /* backface-visibility: hidden; */
  -webkit-overflow-scrolling: touch;

  @media (--v-md) {
    display: block;
    min-width: 300px;
    max-width: 300px;
    background: -webkit-linear-gradient(-62deg, rgb(169, 123, 129) 0%, rgb(210, 192, 189) 50%, rgb(193, 177, 179) 100%) rgb(175, 149, 145);
  }

}

.menu .logo {
  backface-visibility: hidden;
  text-align: center;
  background-blend-mode: screen;
  margin: 30px 0 30px;
  padding-bottom: 10%;
  height: 0;
  position: relative;
  /* margin: 0; */
  -webkit-filter: drop-shadow(2px 1px 1px #9a7b7b);
  & svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.menu a {
  text-decoration: none;
}

.menu h1 svg {
  height: auto;
  width: 100%;
  max-width: 300px;
}

.menu h1 svg path {
  fill: #ececec;
}

.m-loading {
  height: 20px;
  overflow: hidden;
  position: absolute;
  left: 30px;
  width: calc(100% - 60px);
  &.is-loading {
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

</style>
<script>
import intersectionObserver from 'intersection-observer'

export default {
  computed: {
    lists() {
      return this.$store.state.list.current
    },
    categories() {
      return this.$store.state.categories
    },
    tags() {
      return this.$store.state.tags
    },
    classObject() {
      let obj = {}
      obj[this.$route.name] = true
      return obj
    }
  },
  methods: {
    hover() {
      console.log("hover")
    },
    message() {
      console.log("scroll")
    }
  },
  mounted() {
    console.log("menu-created")
    console.log(this);
    const observer = new IntersectionObserver((changes) => {
      this.$store.dispatch('infinityScroll')
    }, {
      root: document.querySelector('.menu'),
      threshold: [0],
      rootMargin: '600px',
    });

    observer.observe(document.querySelector('.m-loading'));
  }
}

</script>
