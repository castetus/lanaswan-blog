<template>
  <div class="add-comment">
      <v-form>
          <v-btn 
            @click="googleLogin">
              Войти с аккаунтом Google
          </v-btn>
      </v-form>
      <v-form>
          <v-textarea 
            placeholder="Ваш комментарий"
            v-model="comment.text" />
            <v-btn
                @click="saveComment"
                text>
                Отправить    
            </v-btn>
      </v-form>
  </div>
</template>

<script>
export default {
    name: 'add-comment',
    props: ['postId'],
    data (){
        return {
            comment: {
                text: ''
            },
        }
    },
    methods: {
        async saveComment (){
            if (this.comment.text === ''){
                return
            }
            const data = {
                postId: this.postId,
                comment: this.comment
            }
            await this.$store.dispatch('posts/saveComment', data)
            this.comment.text = ''
        },
        async googleLogin (){
            try {
                await this.$store.dispatch('auth/googleLogin')
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>
