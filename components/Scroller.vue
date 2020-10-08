<template>
                <v-btn
              @click="$vuetify.goTo(0, {
                duration: 400
              })"
                :color="color"
                v-if="displayScroller"
                text
                fixed
                bottom
                right
                fab
              >
                <v-icon class="scroller-icon" x-large>mdi-chevron-up-circle-outline</v-icon>
              </v-btn>
</template>

<script>
export default {
    name: 'scroller',
    props: [
        'color'
    ],
    data(){
        return{
            offsetTop: 0,
        }
    },
    computed: {
    displayScroller(){
      if (this.offsetTop > 100){
        return true
      }
      return false
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll (event) {
      this.offsetTop = window.scrollY;
    },
  },
}
</script>

<style lang="scss">
    .v-btn--fixed.v-btn--bottom{
        bottom: 133px;
    }
    .scroller-icon{
        color: $base-color !important;
    }
</style>