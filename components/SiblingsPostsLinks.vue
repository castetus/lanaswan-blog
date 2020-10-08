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
import {mapGetters} from 'vuex'
export default {
    name: 'siblings-posts-links',
    props: [
        'id'
    ],
    computed: {
        ...mapGetters('posts', [
        'loadedPosts'
        ]),
        currentPostIndex(){
            return this.loadedPosts.findIndex(post => post.id === this.id)
        },
        nextPostSlug(){
            let nextPost = this.loadedPosts[this.currentPostIndex + 1]
            if (nextPost){
                return nextPost.slug
            }
        },
        prevPostSlug(){
            let prevPost = this.loadedPosts[this.currentPostIndex - 1]
            if (prevPost){
                return prevPost.slug
            }
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