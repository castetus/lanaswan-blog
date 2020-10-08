<template>
  <v-app>
    <div class="wrapper">
    <ls-header></ls-header>
    <client-only>
      <scroller />
    </client-only>
      <v-container>
      <nuxt/>
    </v-container>
    <ls-footer/>
    </div>
  </v-app>
</template>

<script>
import LsHeader from '../components/Header'
import LsFooter from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import Scroller from '../components/Scroller'
  export default{
    components: {
      LsHeader,
      LsFooter,
      Breadcrumbs,
      Scroller
    },
    async fetch(){
      const { data } = await this.$axios.get(`wp/v2/posts?_fields=id,excerpt,title,slug,featured_media,categories,date`)
      this.$store.dispatch('posts/setAllPosts', data)
    },
  }

</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
.post-title{
  margin: 2rem auto;
}
.wrapper{
  margin-bottom: 200px;
}
</style>

