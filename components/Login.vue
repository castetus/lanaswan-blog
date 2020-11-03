<template>
    <v-form @submit.prevent="onSubmit">
      <v-card-text>
      <v-text-field 
        v-model="email"
        label="E-mail"
        required />
      <v-text-field 
        v-model="password"
        label="Пароль"
        required />
      </v-card-text>
      <v-card-actions>
      <v-btn
        text
        type="submit">
        Вход
      </v-btn>
      <v-btn
        @click="$emit('closeLoginForm')"
        text>
        Отмена
      </v-btn>
      </v-card-actions>
    </v-form>
</template>

<script>
export default {
    name: 'ls-login',
    data (){
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        onSubmit (){
            this.$emit('loginSubmit', this.email, this.password)
        }
    }
}
</script>

<style>

</style>
