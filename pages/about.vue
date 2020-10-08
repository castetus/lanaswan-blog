<template>
  <div class="about">
      <h1 class="post-title">{{title}}</h1>
      <div v-html="content"></div>
  </div>
</template>

<script>
export default {
    name: 'about',
    data(){
        return{
            title: '',
            content: ''
        }
    },
    async created(){
        const { data } = await this.$axios.get(`http://lanaswan.ru/wp-json/wp/v2/pages/7`)
        this.title = data.title.rendered
        this.content = data.content.rendered
    }
}
</script>

<style>

</style>