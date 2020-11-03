module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': 'off',
    'indent': 'off',
    'vue/html-indent': 'off',
    'space-before-blocks': 'off',
    'vue/name-property-casing': 'off',
    'no-trailing-spaces': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'object-curly-spacing': 'off',
    'new-cap': 'off',
    // 'no-undef': 'off'
  }
}
