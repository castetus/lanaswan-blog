<template>
  <v-container>
    <v-row>
      <post-card 
        v-for="post in posts" 
        :key="post.id"
        :post="post"/>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from '../components/PostCard'
export default {
  components: {
    PostCard,
  },
  data (){
    return {

    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('posts/loadAllPosts')
  },
  computed: {
    posts (){
      return this.$store.getters['posts/allPosts'].filter(post => post.type !== 'page')
    }
  }
}
</script>

<style>

</style>
