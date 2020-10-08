<template>
<div class="category">
        <h1 class="post-title" v-if="category && category.name">
          {{category.name}}
        </h1>
    <v-row v-if="posts">
        <post-card 
            v-for="post in posts"
            :key="post.id" 
            :postContent="post"/>
    </v-row>
</div>

</template>

<script>
import {mapGetters} from 'vuex'
import PostCard from '../../components/PostCard'
export default {
    name: 'category',
    components: {
        PostCard
    },
    computed: {
      ...mapGetters('categories', [
        'loadedCategories'
      ]),
      ...mapGetters('posts', [
          'loadedPosts'
      ]),
      category(){
        return this.loadedCategories.find(category => category.slug == this.$route.params.category)
      },
      posts(){
          return this.loadedPosts.filter(post => post.categories.indexOf(this.category.id) !== -1)
      }
    },
}
</script>

<style>
  .category{
    width: 100%;
  }
</style>