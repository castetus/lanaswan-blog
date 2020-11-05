<template>
  <v-card>
    <v-form>
      <v-card-text>
      <v-text-field 
        v-model="email"
        label="E-mail"
        required />
      <v-text-field 
        v-model="password"
        label="Пароль"
        type="password"
        required />
      </v-card-text>
      <v-card-actions>
      <v-btn
        text
        @click="login">
        Вход
      </v-btn>
      <v-btn
        @click="$emit('close-form')"
        text>
        Отмена
      </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
    name: 'login-email',
    data (){
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async login (){
          const email = this.email
          const password = this.password
            try {
                await this.$store.dispatch(('auth/login'), {email, password})
                this.$store.dispatch('auth/setUser')
                this.$emit('close-form')
                this.$emit('close-login')
            } catch (error) {
                this.errorCode = error.code
            }
        },
    }
}
</script>

<style>

</style>
