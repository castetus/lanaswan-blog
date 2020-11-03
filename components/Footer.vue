<template>
    <!-- <v-card height="200px"> -->
    <v-footer padless>
      <v-card
        flat
        tile
        dark
        width="100%"
        class="text-center"
      >
        <v-card-text
            class="d-flex justify-center">
            <social-icons />
        </v-card-text>

        <v-divider />

        <v-card-text>
          (c) {{ new Date().getFullYear() }} — <strong>Lana Swan</strong> | Разработка сайта: <a class="footer__link" href="https://castetus.ru">castetus.ru</a>
        </v-card-text>
      </v-card>
    </v-footer>

<!--    
  </v-card> -->
</template>

<script>
import SocialIcons from './SocialIcons'
export default {
    name: 'ls-footer',
    components: {
        SocialIcons
    }
}
</script>

<style lang="scss">

.v-footer div{
  background-color: $base-color !important;
  text-align: center;
}
.v-application .footer__link{
    color: #fff;
}

</style>
