<template>
  <div class="login-form">
      <login-email 
        v-if="email" 
        @close-form="email = false"
        @close-login="$emit('close-login')" />
    <register-form
        v-if="register"
        @close-register="register = false"
        @close-login="$emit('close-login')" />
      <v-card v-if="!email && !register">
          <v-card-title>
              Войти с помощью:
          </v-card-title>
          <v-list>
              <v-list-item 
                link
                v-for="method in methods"
                :key="method.name"
                @click="method.action">
                  <v-list-item-icon>
                      <v-icon>
                          {{ method.icon }}
                      </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                        {{ method.name }}
                  </v-list-item-title>
              </v-list-item>
          </v-list>
          <v-card-actions>
              <v-btn
                @click="register = true"
                text>
                  Регистрация
              </v-btn>
                <v-btn
                    @click="$emit('close-login')"
                    text>
                    Отмена
              </v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import LoginEmail from './LoginEmail'
import Register from './Register'
export default {
    name: 'login-form',
    components: {
        'login-email': LoginEmail,
        'register-form': Register,
    },
    data (){
        return {
            email: false,
            phone: false,
            register: false,
            methods: [
                {
                    name: 'E-mail',
                    icon: 'mdi-at',
                    action: this.emailLogin,
                },
                {
                    name: 'Google',
                    icon: 'mdi-google',
                    action: this.googleLogin,
                },
                {
                    name: 'Телефон',
                    icon: 'mdi-cellphone-android',
                    action: this.phoneLogin,
                },
            ]
        }
    },
    methods: {
        emailLogin (){
            this.email = true
        },
        async googleLogin (){
            try {
                await this.$store.dispatch('auth/googleLogin')
                this.$emit('close-login')
                const type = 'success'
                const message = 'Вы успешно авторизовались!'
                this.$store.dispatch('alert/showAlert', {type, message})
            } catch (error) {
                const message = error.code
                const type = 'error'
                this.$store.dispatch('alert/showAlert', {type, message})
            }
        },
        phoneLogin (){
            // this.$store.dispatch('auth/')
        },
        registerForm (){
            this.$emit('registerForm')
        }
    }
}
</script>

<style>

</style>
