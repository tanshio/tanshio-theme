<template lang="pug">
  .search
    form(action="/" method="post")
      label(:class="isAnim?'is-use':''")
        input(type="text" name="name" value="" @focus="focus" @blur="blur" autocomplete="off" v-model="$store.state.keyword")
        span Search
      button(type="submit" name="button" @click="sendQuery") 検索
</template>

<script>
export default {

  computed: {
    isAnim: function() {
      if(this.isFocus || this.$store.state.keyword) {
        return true
      }
      return false
    }
  },
  data() {
    return {
      isFocus: false,
    }
  },

  // getters: {
  //   keyword: keyword(this.$store.state)
  // },

  // props: ['kw'],
  //
  // computed: {
  //   ...mapGetters([
  //     'keyword',
  //     // ...
  //   ])
  // },

  methods: {
    sendQuery (e) {
      e.preventDefault()

      console.log("clickd");
      console.log(this.kw)
      console.log(this.$store.state.keyword)
      this.$router.push({ path: '/', query: { s: this.$store.state.keyword }})
    },
    focus () {
      this.isFocus = true
    },
    blur () {
      this.isFocus = false
    }
  }
}
</script>

<style scoped>

.search {

  position: relative;
  margin-bottom: 1rem;
  & label {
    position: relative;
    display: block;
    height: 2rem;
    & span {
      display: inline-block;
      position: absolute;
      /* top: 500%; */
      left: 10px;
      color: #e3d4d5;
      pointer-events: none;
      transform: translateY(-58%) translateY(1rem);
      transition: all .7s cubic-bezier(0.86, 0, 0.07, 1);
      line-height: 1;
    }
    &.is-use {
      & span {
        top: 0;
        transform: translateY(-.5rem) translateY(-75%) translateX(-15px) scale(.7);
      }
    }
  }
  & input {
    border: 1px solid #fff;
    padding: .5rem;
    width: 100%;
    background: transparent;
    color: #fff;
    border-radius: 0;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
  & button {
    position: absolute;
    top: 0;
    right: 0;
    padding: .5rem;
    border: 1px solid #fff;
    background: transparent;
    color: #fff;
    cursor: pointer;
    height: 100%;
    line-height: 0;
  }
}


</style>
