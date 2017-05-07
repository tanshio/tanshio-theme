<template>
  <time v-bind:datatime="createYmd.replace(/\./g,'-')">{{createYmd}}</time>
</template>

<script>

export default {
  props: ["time"],
  computed: {
    createYmd() {
      const date  = new Date(this.time)
      return `${date.getFullYear()}.${("0"+(date.getMonth()+1)).slice(-2)}.${("0"+date.getDate()).slice(-2)}`
    }
  }
}


</script>
