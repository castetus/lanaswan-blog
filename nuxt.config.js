module.exports = {


  /*
  ** Headers of the page
  */
  head: {
    title: 'lanaswan-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  css: [
    '@/assets/global.scss'
  ],
     buildModules: [
      // Simple usage
      '@nuxtjs/vuetify',
    ],
    styleResources: {
      scss: ['./assets/*.scss']
    },
  plugins: [

  ],
  axios: {
    baseURL: 'http://lanaswan.ru/wp-json/'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'nuxt-vue-material',
      'vue-material'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

// export default {
//   target: 'static'
// }

