<template>
  <article class="item">
    <slot>aaa</slot>
  </article>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {

    }
  },
  mount(){
    console.log(this.list)
  }
}
</script>

<style scoped>

</style>
