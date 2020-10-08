<template>
  <section class="container">
    <v-row>
        <post-card 
          v-for="post in posts" 
        :key="post.id"
        :postContent="post"/>
    </v-row>
    
  </section>
</template>

<script>

import PostCard from '../components/PostCard'

import {mapGetters} from 'vuex'
export default {
  components: {
    PostCard,
  },
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters('posts', [
      'loadedPosts'
    ]),
    posts(){
      return this.loadedPosts
    }
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

