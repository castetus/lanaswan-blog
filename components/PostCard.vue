<template>
<v-col cols="12" sm="6" md="4">
  <v-card
   class="mx-auto"
    max-width="320">
    <v-skeleton-loader
        v-if="!isLoaded"
      class="mx-auto"
      type="image" />
      <v-img  
        v-else
        :src="imgUrl"
        height="200px">
        <v-card-title class="v-card__title_white">
            {{ post.title }}
        </v-card-title>
    </v-img>
      <v-card-text v-html="post.excerpt" />
      <v-card-actions>
          <nuxt-link :to="`/posts/${post.slug}`">
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
    data (){
        return {
            imgUrl: '',
            isLoaded: false,
        }
    },
    props: ['post'],
    async fetch (){
        try {
            const ref = await this.$fireStorage.ref('postImgs/' + this.post.id)
            const url = await ref.getDownloadURL()
            this.imgUrl = url
            this.isLoaded = true
        } catch (error) {
            console.log('3' + error)
        }
    },
    fetchOnServer: false,
}
// dummy comment
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
