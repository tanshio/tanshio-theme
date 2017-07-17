<template>
  <div>
    <ul :class="type?type:'social-link'">
      <li class="social-link__fb">
        <a :href="type?'https://www.facebook.com/shota.tanno.75':'https://www.facebook.com/sharer/sharer.php?u='+url" target="_blank" rel="noopener">
          <svg class="social__icon social__icon--fb" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 156 300">
            <path class="fb" d="M101.000,300.000 C101.000,300.000 101.000,163.000 101.000,163.000 C101.000,163.000 147.000,163.000 147.000,163.000 C147.000,163.000 154.000,110.000 154.000,110.000 C154.000,110.000 101.000,110.000 101.000,110.000 C101.000,110.000 101.000,76.000 101.000,76.000 C101.000,60.552 105.857,50.000 128.000,50.000 C128.000,50.000 156.000,50.000 156.000,50.000 C156.000,50.000 156.000,2.000 156.000,2.000 C151.113,1.351 134.503,-0.000 115.000,-0.000 C74.282,-0.000 46.000,25.336 46.000,71.000 C46.000,71.000 46.000,110.000 46.000,110.000 C46.000,110.000 0.000,110.000 0.000,110.000 C0.000,110.000 0.000,163.000 0.000,163.000 C0.000,163.000 46.000,163.000 46.000,163.000 C46.000,163.000 46.000,300.000 46.000,300.000 C46.000,300.000 101.000,300.000 101.000,300.000 Z"/>
          </svg>
        </a>
      </li>
      <li class="social-link__tw">
        <a :href="type?'https://twitter.com/_tanshio':`https://twitter.com/intent/tweet?url=${url}&text=${title}`" target="_blank" rel="noopener">
          <div v-html="twitter"></div>
        </a>
      </li>
      <li v-if="type!=='home-icon'">
        <a :href="type?'https://github.com/tanshio':''" target="_blank" rel="noopener">
          <div v-html="github"></div>
        </a>
      </li>
      <li v-if="type!=='home-icon'" class="social-link__pocket">
        <a :href="type?'':`http://getpocket.com/edit?url=${url}&title=${title}`" target="_blank" rel="noopener">
          <div v-html="pocket"></div>
        </a>
      </li>
    </ul>
    <div v-if="!type && title">
      <input type="text" :value="`${title} | ${url}`" @click="copy">
    </div>
  </div>
</template>

<script>
  // import paths from 'microicon';
  export default {
    methods: {
      copy: function(e) {
        e.target.setSelectionRange(0, e.target.value.length);
      }

    },
    props: ['type'],
    computed: {
      title: function() {
        return this.$store.state.post.title ? this.$store.state.post.title['rendered'] : ""
      },
      url: function() {
        return this.$store.state.post.link ? this.$store.state.post.link : ""
      },
      github: function() {
        return `
<svg class="social__icon" viewBox='0 0 16 16'
  width='32'
  height='32'
  fill='currentcolor'>
  <path d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.09-.202-.36-1.015.07-2.117 0 0 .67-.215 2.2.82.64-.178 1.32-.266 2-.27.68.004 1.36.092 2 .27 1.52-1.035 2.19-.82 2.19-.82.43 1.102.16 1.915.08 2.117.51.56.82 1.274.82 2.147 0 3.073-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38C13.71 14.53 16 11.53 16 8c0-4.418-3.582-8-8-8 " />
</svg>
        `
      },

      twitter: function() {
        return `
<svg class="social__icon"viewBox='0 0 16 16'
  width='32'
  height='32'
  fill='currentcolor'>
  <path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.37-1.337.64-2.085.79-.598-.64-1.45-1.04-2.396-1.04-1.812 0-3.282 1.47-3.282 3.28 0 .26.03.51.085.75-2.728-.13-5.147-1.44-6.766-3.42C.83 2.58.67 3.14.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.41-.02-.61-.058.42 1.304 1.63 2.253 3.07 2.28-1.12.88-2.54 1.404-4.07 1.404-.26 0-.52-.015-.78-.045 1.46.93 3.18 1.474 5.04 1.474 6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42.64-.46 1.2-1.04 1.64-1.7z " />
</svg>
        `
      },
      pocket: function() {
        return `
<svg class="social__icon" viewBox='0 0 16 16'
  width='32'
  height='32'
  fill='currentcolor'>
  <path d="M12.533 6.84L8.77 10.45c-.213.204-.486.306-.76.306-.273 0-.547-.102-.76-.306L3.488 6.84c-.437-.418-.45-1.113-.032-1.55.42-.438 1.114-.452 1.55-.033l3.005 2.88 3.01-2.88c.44-.42 1.13-.405 1.55.032.42.43.41 1.13-.03 1.55zm3.388-5.028c-.2-.572-.75-.956-1.36-.956H1.45c-.6 0-1.144.376-1.357.936-.063.166-.095.34-.095.515v4.828l.055.96c.232 2.184 1.365 4.092 3.12 5.423.03.024.063.047.095.07l.02.015c.94.687 1.992 1.152 3.128 1.382.524.105 1.06.16 1.592.16.492 0 .986-.046 1.472-.136.058-.02.116-.03.175-.04.016 0 .033-.01.05-.02 1.088-.24 2.098-.69 3.004-1.35l.02-.02.09-.07c1.75-1.33 2.88-3.24 3.12-5.43l.05-.96V2.3c0-.167-.02-.333-.08-.495z " />
</svg>
        `
      }

    }
  }
</script>
<style>
.home-icon {

  & li {
    & a {
      color: #b45e69;
      transition: all .6s ease-in-out !important;
      &:hover {
        opacity: .6;
        transform: translateY(-25%);
      }
      & svg {
        fill: #b45e69;
      }
    }
  }

  & .social__icon {
    width: 22px;
    height: 22px;
  }
}
</style>
<style scoped>

.social-link {
  & li {
    position: relative;
    width: 56px;
    height: 56px;
    /* background-color: #ccc; */
    border-radius: 50%;
    & svg {
      position: absolute;
      fill: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    & a {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      & div {

      }
    }
  }
  & &__fb {
    background-color: #4f5f80;
  }
  & &__tw {
    background-color: #67a1c4;
  }
  & &__pocket {
    background-color: #c4616d;
  }
}


input {
  padding: .5rem;
  width: 100%;
  max-width: 400px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  & li {
    display: inline-block;
    margin-right: .5rem;
    & a {
      display: block;
    }
  }
}

</style>
