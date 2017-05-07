<template lang="pug">
  div.search
    form(action="/" method="post")
      input(type="text" name="name" value="" v-model="$store.state.keyword" placeholder="Search")
      button(type="submit" name="button" @click="sendMessage") 検索
</template>

<script>
import { mapGetters } from 'vuex'
export default {

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
    sendMessage (e) {
      e.preventDefault()

      console.log("clickd");
      console.log(this.kw)
      console.log(this.$store.state.keyword)
      this.$router.push({ path: '/', query: { s: this.$store.state.keyword }})
    }
  }
}
</script>

<style scoped>

.search {

  position: relative;
  margin-bottom: 1rem;
  & input {
    border: 1px solid #fff;
    padding: .5rem;
    width: 100%;
    background: transparent;
    color: #fff;
    &:focus {
      outline: none;
    }
    &:placeholder-shown {
        color: #e3d4d5;
    }

    /* Google Chrome, Safari, Opera 15+, Android, iOS */
    &::-webkit-input-placeholder {
        color: #e3d4d5;
    }

    /* Firefox 18- */
    &:-moz-placeholder {
        color: #e3d4d5; opacity: 1;
    }

    /* Firefox 19+ */
    &::-moz-placeholder {
        color: #e3d4d5; opacity: 1;
    }

    /* IE 10+ */
    &:-ms-input-placeholder {
        color: #e3d4d5;
    }
  }
  & button {
    position: absolute;
    right: 0;
    padding: .5rem;
    border: 1px solid #fff;
    background: transparent;
    color: #fff;
    cursor: pointer;
  }
}


</style>
