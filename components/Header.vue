<template>
  <header class="header">
    
      <v-app-bar
      dark
    >
    <v-container>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>
          <nuxt-link to="/">
          LanaSwan
          </nuxt-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <social-icons class="d-none d-sm-flex"/>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
                <nuxt-link to="/">Главная</nuxt-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
                <nuxt-link to="/about">Обо мне</nuxt-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <v-divider></v-divider>

        <v-list-item-group>
            <v-list-item v-for="category in categories" :key="category.id">
                <v-list-item-icon>
                    <v-icon>mdi-book-open-page-variant-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    <nuxt-link :to="`/categories/${category.slug}`">
                        {{category.name}}
                    </nuxt-link>
                </v-list-item-title>
            </v-list-item>
        </v-list-item-group>
      </v-list>
      <social-icons class="d-flex d-sm-none"/>
    </v-navigation-drawer>
    
  </header>

</template>

<script>
import SocialIcons from './SocialIcons'
import {mapGetters} from 'vuex'
export default {
    name: 'ls-header',
    data(){
        return{
           drawer: false,
        }
    },
    components: {
        SocialIcons,
    },
    computed: {
        ...mapGetters('categories', [
        'loadedCategories'
        ]),
        categories(){
            return this.loadedCategories
        }
    },
    async created(){
        const { data } = await this.$axios.get(`wp/v2/categories`)
        this.$store.dispatch('categories/setAllCategories', data)
        console.log(data)
    },
}
</script>

<style lang="scss">
  .theme--dark.v-app-bar.v-toolbar.v-sheet{
    background-color: $base-color;
  }
  .theme--dark.v-app-bar.v-toolbar.v-sheet a{
    color: #fff;
  }
</style>