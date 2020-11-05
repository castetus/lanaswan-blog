<template>
  <div class="register">
      <v-card>
          <v-form @submit.prevent="onSubmit">
            <v-card-text>
                <v-text-field 
                    v-model.trim="name"
                    label="Имя"
                    required />
                <v-file-input 
                    accept="image/png, image/jpeg, image/bmp"
                    v-model="avatar" 
                    label="Аватар"
                    prepend-icon="mdi-camera" />
                <v-text-field 
                    v-model.trim="email"
                    label="E-mail"
                    required />
                <v-text-field 
                    v-model.trim="password"
                    type="password"
                    label="Пароль"
                    required />
                <v-text-field 
                    v-model.trim="repeatedPassword"
                    label="Повторите пароль"
                    type="password"
                    required />
            </v-card-text>
            <v-card-actions>
                <v-btn
                    text
                    @click="register">
                    Регистрация
                </v-btn>
                <v-btn
                    @click="$emit('close-register')"
                    text>
                    Отмена
                </v-btn>
            </v-card-actions>
          </v-form>
      </v-card>
  </div>
</template>

<script>
export default {
    name: 'register-form',
    data (){
        return {
            email: '',
            password: '',
            repeatedPassword: '',
            name: '',
            avatar: null
        }
    },
    methods: {
        async register (){
            const email = this.email
            const password = this.password
            const repeatedPassword = this.repeatedPassword
            const name = this.name 
            const avatar = this.avatar 
            if (password !== repeatedPassword){
                return
            }
            try {
                await this.$store.dispatch('auth/emailRegister', {email, password, name, avatar})
                this.$emit('close-login')
            } catch (error) {
                // const type = 'error'
                // const message = error.code
                // this.$store.dispatch('alert/showAlert', {type, message})
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>
