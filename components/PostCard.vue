<template>
<v-col cols="12" sm="6" md="4" >
  <v-card
   class="mx-auto"
    max-width="320">
    <v-progress-circular
      indeterminate
      color="green"
      v-if="loading"
    ></v-progress-circular>
      <v-img  
        v-else
        :src="imgUrl"
        height="200px">
        <v-card-title class="v-card__title_white">
            {{postContent.title.rendered}}
        </v-card-title>
        </v-img>

      <v-card-text v-html="trancatedPost">
      </v-card-text>
      <v-card-actions>
            
                <nuxt-link :to="`/posts/${postContent.slug}`">
                <v-btn text>
                    Читать далее
                    </v-btn>
                </nuxt-link>
            
      </v-card-actions>
  </v-card>
  </v-col>
</template>

<script>
export default {
    name: 'post-card',
    data(){
        return{
            imgUrl: '',
            loading: true
        }
    },
    props: [
        'postContent'
    ],
    computed: {
        trancatedPost(){
        let excerpt = this.postContent.excerpt.rendered
        let maxLength = 100;
        if (excerpt.length > maxLength){
            
            return excerpt.split('').slice(0, maxLength).join('') + '...';
        }
            return excerpt;
        },
        imgId(){
            return this.postContent.featured_media
        }
    },
    async created(){
        let id = this.imgId
        try {
            const { data } = await this.$axios.get(`wp/v2/media/${id}`)
            this.imgUrl = data.source_url
            this.loading = false
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<style>
    .v-card__text{
        text-align: justify;
    }
    .v-card__title_white{
        text-align: right;
        word-break: normal;
        color: #fff;
        align-items: flex-end;
    }
    .v-responsive__content{
        display: flex;
    }
</style>