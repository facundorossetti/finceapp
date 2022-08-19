export default {
  head: {
    titleTemplate: '',
    title: 'FinceApp',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ["@/assets/main.scss", "@/assets/typo.scss"],

  plugins: [{ src: '@/plugins/vue-apexchart.js', ssr: false }],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://localhost:3001',
  },

  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        dark: {
          lightest: '#001429',
          background: '#001f3f',
          text: '#e6e6e6',
          textshade: '#e6e6e680',
          shadow1: '#001429',
          shadow2: '#002e5c',
          shadow3: '#001429',
          bluetext: '#85c0d6',
        },
        light: {
          lightest: '#ffffff',
          background: '#e6e6e6',
          text: '#001f3f',
          textshade: '#001f3f80',
          shadow1: '#cfcfcf',
          shadow2: '#f6f6f6',
          shadow3: '#c4c4c4',
          bluetext: '#006286'
        },
      },
    },
  },
  build: {},
}
