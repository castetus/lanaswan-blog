<template>
  <div class="add-comment">
        <div 
            v-if="!currentUser">
                Для комментирования необходимо
                <a @click.prevent="loginForm=true">
                    войти или зарегистрироваться
                </a>
        </div>
      <v-form v-else>
          <v-textarea 
            placeholder="Ваш комментарий"
            v-model="text" />
            <v-btn
                @click="saveComment"
                text>
                Отправить    
            </v-btn>
      </v-form>
        <v-dialog v-model="loginForm" max-width="400">
            <login-form @close-login="loginForm = false" />
        </v-dialog>
  </div>
</template>

<script>
export default {
    name: 'add-comment',
    props: ['postId'],
    data (){
        return {
            text: '',
            loginForm: false,
        }
    },
    computed: {
        currentUser (){
            return this.$store.getters['auth/currentUser']
        }
    },
    methods: {
        async saveComment (){
            if (this.text === ''){
                return
            }
            const options = {
                year: 'numeric', 
                month: 'numeric', 
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }
            const date = new Intl.DateTimeFormat('ru', options).format(new Date())
            const data = {
                postId: this.postId,
                date: date,
                text: this.text
            }
            await this.$store.dispatch('posts/saveComment', data)
            this.text = ''
        },
    }
}
</script>

<style>

</style>
