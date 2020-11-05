<template>
  <header class="header">
    <v-app-bar dark>
      <v-container>
        <v-row>
          <v-app-bar-nav-icon @click="drawer = true" />
          <nuxt-link class="header__logo" to="/">
            <v-toolbar-title>LanaSwan</v-toolbar-title>
          </nuxt-link>
          <v-spacer />
          <social-icons class="d-none d-sm-flex" />
          <v-dialog v-model="loginForm" max-width="400">
            <login-form @close-login="loginForm = false" />
          </v-dialog>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item-group>
          <nuxt-link
            v-for="page in pages"
            :key="page.id"
            :to="`/posts/${page.slug}`"
            class="nav-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ page.title }}</v-list-item-title>
            </v-list-item>
          </nuxt-link>
        </v-list-item-group>
        <v-divider />
        <v-list-item-group>
          <nuxt-link
            v-for="category in categories"
            :key="category.id"
            :to="`/categories/${category.slug}`"
            class="nav-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-book-open-page-variant-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ category.name }}
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>
        </v-list-item-group>
        <v-divider />
        <v-list-item 
          v-if="!currentUser" 
          @click="login">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Вход / Регистрация
          </v-list-item-title>
        </v-list-item>
        <v-list-item 
          v-else 
          @click="logOut">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Выйти
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <social-icons class="d-flex d-sm-none" />
    </v-navigation-drawer>
  </header>
</template>

<script>
import SocialIcons from './SocialIcons'
import LoginForm from './LoginForm'
export default {
  name: 'ls-header',
  components: {
    'login-form': LoginForm,
    'social-icons': SocialIcons
  },
  data () {
    return {
      errorCode: '',
      alert: false,
      drawer: false,
      loginForm: false
    }
  },
  computed: {
    errorMessage () {
      let message = ''
      if (this.errorCode === 'auth/user-not-found') {
        message = 'Пользователь с таким E-mail не найден'
      } else if (this.errorCode === 'auth/wrong-password') {
        message = 'Неверный пароль'
      }
      return message
    },
    categories () {
      return this.$store.getters['categories/allCategories']
    },
    currentUser () {
      return this.$store.getters['auth/currentUser']
    },
    pages () {
      return this.$store.getters['posts/allPosts'].filter(
        post => post.type === 'page'
      )
    }
  },
  created () {
    this.$store.dispatch('auth/setUser')
  },
  methods: {
    async logOut () {
      await this.$store.dispatch('auth/logOut')
      this.drawer = false
    },
    login (){
      this.drawer = false
      this.loginForm = true
    }
  }
}
</script>

<style lang="scss">
.v-application header {
  background-color: $base-color;
}
.v-application .header__logo {
  color: #fff;
  margin-top: 8px;
}
.header .v-toolbar{
  background-color: $base-color !important;
}
.nav-link {
  text-transform: uppercase;
}
</style>
