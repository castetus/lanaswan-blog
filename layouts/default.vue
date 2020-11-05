<template>
  <v-app>
    <ls-header />
    <main>
    <Nuxt />
    </main>
    <ls-footer />
    <v-tooltip v-if="admin" top>
      <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        @click="addNewPost"
        v-on="on"
        fab
        dark
        fixed
        bottom
        left>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      </template>
      <span>Новый пост</span>
    </v-tooltip>
    <Client-only>
    <ls-scroller />
    <ls-alert 
      v-if="alertVisible"
      :alertType="alert.type"
      :message="alert.message" />
    </Client-only>
  </v-app>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Scroller from '~/components/Scroller'
import Alert from '~/components/Alert'
export default {
  components: {
    'ls-header': Header,
    'ls-footer': Footer,
    'ls-scroller': Scroller,
    'ls-alert': Alert,
  },
  computed: {
    admin (){
      return this.$store.state.auth.admin
    },
    alertVisible (){
      return this.$store.getters['alert/alertVisible']
    },
    alert (){
      return this.$store.getters['alert/alert']
    }
  },
  methods: {
    addNewPost (){
      this.$router.push('/posteditor')
    },
  }
}
</script>

<style lang="scss">
.v-application--wrap {
    background-color: var(--v-background-base);
}
</style>
