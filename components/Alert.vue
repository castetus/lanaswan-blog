<template>
  <v-alert
    class="alert"
    @input="closeAlert"
    dismissible
    :type="alertType">
      {{ message }}
  </v-alert>
</template>

<script>
export default {
    name: 'ls-alert',
    props: {
        message: {
            type: String,
            default: ''
        },
        alertType: {
            type: String,
            default: 'error'
        }
    },
    methods: {
        closeAlert (){
            this.$store.dispatch('alert/hideAlert')
        }
    }
}
</script>

<style>
    .alert{
        position: fixed !important;
        width: 100%;
        z-index: 100;
    }
</style>
