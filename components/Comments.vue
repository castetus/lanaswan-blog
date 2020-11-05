<template>
  <div class="comments">
      <v-list>
        <v-subheader>
            Комментарии
        </v-subheader>
        <v-divider />
        <template>
        <v-list-item
            v-for="(comment, index) in comments"
            :key="index">
          <v-list-item-avatar>
            <v-img :src="comment.avatarUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
                {{ comment.userName }} - {{ comment.date }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ comment.text }}
              </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
    name: 'comments',
    props: ['postId'],
    computed: {
      comments (){
        return this.$store.getters['posts/getPostComments']
      }
    },
}
</script>

<style>
  .comments{
    width: 100%;
  }
</style>
