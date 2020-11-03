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
import PostCard from '../../components/PostCard'
export default {
    components: {
        PostCard,
    },
    name: 'category',
    computed: {
      catId (){
        return this.$store.getters['categories/allCategories'].find(cat => cat.slug === this.$route.params.category).id
      },
      posts (){
        return this.$store.getters['posts/allPosts'].filter(post => post.categories.includes(this.catId) && post.type === 'post')
      },
      category (){
        return this.$store.getters['categories/allCategories'].find(cat => cat.id === this.catId)
      }
    },
    head () { 
      return {
        title: this.category.name,
        meta: [
          { hid: 'description', name: 'description', content: this.category.name }
        ]
      }
    },
}
</script>

<style>

</style>
