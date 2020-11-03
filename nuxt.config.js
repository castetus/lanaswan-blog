export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'lanaswan-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // '~plugins/firebase.js',
    '~plugins/vue-wysiwyg',
    '~plugins/functions',
    '~plugins/vue-easytinymce',
    {src: '~/plugins/vue2-tiny', ssr: false}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  css: [
    '@/assets/global.scss',
    '@/assets/normalize.scss',
    '@/node_modules/vue-wysiwyg/dist/vueWysiwyg.css'
  ],
  styleResources: {
    scss: ['./assets/*.scss']
  },
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/global.scss'],
    theme: {
        options: {customProperties: true},
        themes: {
          light: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
          dark: {
            background: '#755a57',
          }
        }
    }
},
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // ['bootstrap-vue/nuxt', {
    //   icons: true,
    // }],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAkYDMtQ7X_Twvv-H6GOlX4glTglMHgGtQ',
          authDomain: 'lanaswan-f2a0b.firebaseapp.com',
          databaseURL: 'https://lanaswan-f2a0b.firebaseio.com',
          projectId: 'lanaswan-f2a0b',
          storageBucket: 'lanaswan-f2a0b.appspot.com',
          messagingSenderId: '52629460309',
          appId: '1:52629460309:web:68d52f39bd9e814cc74bdc'
        },
        services: {
          auth: {
            ssr: true
          },
          realtimeDb: true,
          storage: true,
        }
      },
    ]
  ],
  pwa: {
    meta: false,
    icon: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false
    }
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  // build: {
  //   vendor: ['tinymce', 'tinymce-vue-2'],
  // }
}
