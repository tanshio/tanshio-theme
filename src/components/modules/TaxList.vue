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

  // },
  data () {
    return {

    }
  },
  mount(){
  }
}
</script>

<style scoped>
@import "../../styles/_var.css";

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  &.cat {
    display: inline;
    & li {
      background: var(--g-color);
      box-shadow: 0px 1px 5px 1px #d2cece;
      margin-bottom: .5em;
      border: 0;
    }
  }
  &.tag {
    display: inline;
    & li {
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
  border-radius: 50px;
  line-height: 0;
  border: 1px solid #b8747d;
  color: #fff;
  & a {
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
  padding: .5em 1.5em;
  line-height: 1;
  transition: color .2s ease-in-out, border-color .2s ease-in-out;
}

</style>
