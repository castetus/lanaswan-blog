<template>
<v-col cols="12" sm="6" md="4">
  <v-card
   class="mx-auto"
    max-width="320">
    <div class="card-heading-wrapper">
    <v-skeleton-loader
        v-if="!isLoaded"
      class="mx-auto"
      type="image" />
      <v-img  
        v-else
        :src="imgUrl"
        height="200px" />
        <v-card-title 
            class="v-card__title_white">
            {{ post.title }}
        </v-card-title>
        </div>
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
            const ref = await this.$firebase.storage().ref('postImgs/' + this.post.id)
            const url = await ref.getDownloadURL()
            this.imgUrl = url
            this.isLoaded = true
        } catch (error) {
            console.log('3' + error.code)
        }
    },
    fetchOnServer: false,
}

</script>

<style>
.v-card{
  height: 100%;
}
    .v-card__text{
        text-align: justify;
    }
    .v-card__title_white{
        text-align: right;
        word-break: normal;
        color: #fff;
        align-items: flex-end;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .v-responsive__content{
        display: flex;
    }
    .card-heading-wrapper{
        position: relative;
    }
</style>
