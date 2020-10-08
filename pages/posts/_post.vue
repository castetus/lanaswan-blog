<template>
<v-row>
  <div class="post">
      <h1 class="post-title" v-if="post && post.title">{{post.title.rendered}}</h1>
      <div class="post-data">
        <div class="categories-list">
          <h4>Категории: </h4>
          <nuxt-link
            v-for="category in postCategories"
            :key="category.id"
            :to="`/categories/${category.slug}`"
            >{{category.name}}
          </nuxt-link>
        </div>
        <div class="post-date">
          {{postDate}}
        </div>
      </div>

      <div class="post-content" v-if="post && postContent" v-html="postContent"></div>
  </div>
  <siblings-posts-links :id="post.id"/>
</v-row>
</template>

<script>
import {mapGetters} from 'vuex'
import SiblingsPostsLinks from '../../components/SiblingsPostsLinks'
export default {
    name: 'post',
    components: {
      SiblingsPostsLinks,
    },
    data(){
      return{
        postContent: null
      }
    },
    computed: {
      ...mapGetters('posts', [
        'loadedPosts'
      ]),
      ...mapGetters('categories', [
        'loadedCategories'
      ]),
      postSlug(){
        return this.$route.params.post
      },
      post(){
        return this.loadedPosts.find(post => post.slug == this.postSlug)
      },
      postCategories(){
        const categories = Object.values(this.post.categories)

        return this.loadedCategories.filter(category => 
          categories.indexOf(category.id) !== -1
        )
      },
      postDate(){
        const date = new Date(this.post.date)
        const formatter = new Intl.DateTimeFormat("ru");
        return formatter.format(date)
      }
    },
    async created(){
      let postId = this.post.id
      const { data } = await this.$axios.get(`wp/v2/posts/${postId}`)
      this.postContent = data.content.rendered
    }
}
</script>

<style lang="scss">
  .post-content{
    text-align: justify;
  }
  .categories-list{
    padding-bottom: 2rem;
    display: flex;
  }
  .categories-list a{
    color: $base-color;
    padding-right: 1rem;
  }
  .categories-list h4{
    padding-right: 1rem;
  }
  .post-data{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>