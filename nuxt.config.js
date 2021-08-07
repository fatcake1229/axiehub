import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Marketplace',
    title: 'Axie Infinity',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Axie Marketplace' },
      { hid: 'og:image', property: 'og:image', content: "/Terrarium_leak.png" },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/nuxt-client-init.client.js',
    '~/plugins/mobiledetect.client.js',
    '~/plugins/mobiledetect.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    // proxyHeaders: false
  },

  proxy: {
    '/server': { target: 'https://fmesaed4lfed.usemoralis.com:2053/', pathRewrite: {'^/server': ''} },
    '/axie': { target: 'https://axieinfinity.com/graphql-server-v2/graphql', pathRewrite: {'^/axie': ''} },
    '/cryptoprice': { target: 'https://api.nomics.com/v1/currencies/ticker?key=0d187e865fb86612dbe90fa340f4d5c89edc1d74&interval=1d&quote-currency=USD&ids=ETH,WETH', pathRewrite: {'^/cryptoprice': ''} },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  ssr:false,
  loading: {
    color: 'red',
    height: '5px'
  },

  fallback: true,

  // generate: {
  //   routes(callback) {
  //     axios
  //       .get('https://my-api/users')
  //       .then(res => {
  //         const routes = res.data.map(user => {
  //           return '/axie/' + user.id
  //         })
  //         callback(null, routes)
  //       })
  //       .catch(callback)
  //   }
  // },

  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
