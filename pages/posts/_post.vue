<template>
<v-container>
  <v-row>
  <div class="post">
      <h1 class="post-title" v-if="post && post.title">{{ post.title }}</h1>
      <div 
        v-if="post.type === 'post'"
        class="post-data">
        <div class="categories-list">
          <h4>Категории: </h4>
          <nuxt-link
            v-for="category in postCategories"
            :key="category.id"
            :to="`/categories/${category.slug}`">
            {{ category.name }}
          </nuxt-link>
        </div>
        <div class="post-date">
          {{ post.date }}
        </div>
      </div>

      <div class="post-content" v-if="post && post.content" v-html="post.content"></div>
  </div>
  <siblings-posts-links 
    v-if="post.type === 'post'"
    :id="post.id"/>
</v-row>
    <v-tooltip v-if="admin" top>
      <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        @click="editPost"
        v-on="on"
        class="edit-post-button"
        fab
        dark
        fixed
        bottom
        left>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      </template>
      <span>Редактировать пост</span>
    </v-tooltip>
    <v-row>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Добавить комментарий
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <add-comment 
            :postId="post.id" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
      <comments 
        :postId="post.id" />
    </v-row>
</v-container>
</template>

<script>
import SiblingsPostsLinks from '../../components/SiblingsPostsLinks'
import Comments from '../../components/Comments'
import AddComment from '../../components/AddComment'
export default {
    name: 'post',
    components: {
      SiblingsPostsLinks,
      Comments,
      AddComment
    },
    data (){
        return {

        }
    },
    computed: {
        admin (){
          return this.$store.state.auth.admin
        },
        postSlug (){
            return this.$route.params.post
        },
        postId (){
            return this.$store.getters['posts/allPosts'].find(post => post.slug === this.postSlug).id
        },
        post (){
            return this.$store.getters['posts/currentPost']
        },
        postCategories (){
            return this.post.categories ? this.$store.getters['categories/allCategories'].filter(cat => this.post.categories.includes(cat.id)) : []
        }
    },
    
    async fetch (){
        await this.$store.dispatch('posts/loadSinglePost', this.postId)
    },
    head () { 
      return {
        title: this.post.metaTitle,
        meta: [
          { hid: 'description', name: 'description', content: this.post.metaDescription }
        ]
      }
    },
    methods: {
      editPost (){
        this.$router.push({path: '/posteditor', query: {id: this.post.id}})
      },
    }
}
</script>

<style lang="scss">
  .edit-post-button{
    bottom: 195px !important;
  }
  .categories-list a{
    color: $base-color;
  }
</style>
