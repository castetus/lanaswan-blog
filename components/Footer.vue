<template>
    <!-- <v-card height="200px"> -->
    <v-footer absolute padless>
      <v-card
        flat
        tile
        dark
        width="100%"
        class="text-center"
      >
        <v-card-text>
            <social-icons/>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          (c) {{ new Date().getFullYear() }} — <strong>Lana Swan</strong>
        </v-card-text>
      </v-card>
    </v-footer>

<!--    
  </v-card> -->
</template>

<script>
import SocialIcons from '../components/SocialIcons'
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

</style>