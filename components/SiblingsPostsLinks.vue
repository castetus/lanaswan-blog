<template>
        <div class="siblings-posts-links">
            <nuxt-link 
                :event="prevPostSlug ? 'click' : ''" 
                :class="{disabled : !prevPostSlug}" 
                :to="`/posts/${prevPostSlug}`">
                <v-icon
                    class="siblings-posts-links_icon">
                    mdi-arrow-left
                </v-icon>
                Предыдущий пост
            </nuxt-link>
            <nuxt-link 
                :event="nextPostSlug ? 'click' : ''" 
                :class="{disabled : !nextPostSlug}" 
                :to="`/posts/${nextPostSlug}`">
                Следующий пост
                <v-icon 
                    class="siblings-posts-links_icon">
                    mdi-arrow-right
                </v-icon>
            </nuxt-link>
        </div>
</template>

<script>
export default {
    name: 'siblings-posts-links',
    props: [
        'id'
    ],
    computed: {
        posts (){
            return this.$store.getters['posts/allPosts']
        },
        currentPostIndex (){
            return this.posts.findIndex(post => post.id === this.id)
        },
        nextPostSlug (){
            let slug = null
            const nextPost = this.posts[this.currentPostIndex + 1]
            if (nextPost){
               slug = nextPost.slug
            }
            return slug
        },
        prevPostSlug (){
            let slug = null
            const prevPost = this.posts[this.currentPostIndex - 1]
            if (prevPost){
                slug = prevPost.slug
            }
            return slug
        }
    },
}
</script>

<style lang="scss">
    .siblings-posts-links{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .siblings-posts-links a{
        color: $base-color;
    }
    .siblings-posts-links .disabled{
        color: grey;
        cursor: default;
    }
    .siblings-posts-links_icon{
        color: inherit !important;
    }
</style>
