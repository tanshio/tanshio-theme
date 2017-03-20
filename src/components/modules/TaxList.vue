<template>
  <ul>
    <li v-for="item in list">
      <template v-if="link ==='true'"><router-link :to="{ name: type, params: { slug: item.slug }}">{{item.name}}</router-link></template>
      <template v-else>{{item.name}}</template>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['list','type','link'],
  // computed: {
  //   lists() {
  //     if(this.list) {
  //
  //       console.log(this.type)
  //
  //       let taxs = this.$store.state[this.type];
  //
  //       console.log(taxs)
  //       let arr = [];
  //
  //       const list = this.list;
  //
  //       arr = taxs.filter((cat)=>{
  //         return list.includes(cat.id)
  //       })
  //
  //       return arr;
  //     }else {
  //       return null;
  //     }
  //   }
  // },
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

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;

  &.cat {
    display: inline;

    li {
      background: #adb0d2;
      box-shadow: 0px 1px 5px 1px #d2cece;
      margin-bottom: .5em;
      border: 0;
    }
  }
  &.tag {
    display: inline;

    li {
      background: #c2b2b3;
      box-shadow: 0px 1px 5px 1px #d2cece;
      margin-bottom: .5em;
      border: 0;
    }
  }
}

li {
  font-size: .8rem;
  display: inline-block;
  margin-right: .5em;
  border-radius: 3px;
  line-height: 0;
  /*padding: 1em 1em;*/
  /*background: -webkit-linear-gradient(-62deg, rgb(179, 86, 98) 0%, rgb(191, 160, 163) 50%, rgb(234, 182, 182) 100%);*/
  border: 1px solid #b8747d;
  /*background-color: rgb(179, 86, 98);*/
  /*color: rgb(179, 86, 98);/*/
  /*color: #b8747d;*/

  color: #fff;
  a {
    padding: 1em 1em;
    display: block;
    text-decoration: none;
    color: #fff;
  }

}

.menu-list li{
  color: #fff;
  border-color: #fff;
  font-size: .45rem;
  padding: .75em 1em;
}




</style>
