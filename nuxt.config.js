const urlMap = require('./content/url-map.json');
const path = require('path');


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '生活,技术札记 | 去往世界的尽头',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '平时码字记录技术的小角落' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
    ** Global CSS
    */
  css: [
    '@/assets/css/global.scss',
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    'normalize.css',
    'highlight.js/styles/dark.css'
  ],
  plugins: [
    {
      src: '@/plugins/element-ui'
    }, {
      src: '~/plugins/viewer.js',
      ssr: false
    }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#C50026',
    height: '3px',
    throttle: 0
  },
  /*
  ** Build configuration
  */
  build: {
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: path.resolve(__dirname, 'webpack/markdown-loader/markdown-loader.js')
          }
        ]
      })
    }
  },
  buildModules: [
    '@nuxtjs/moment'
  ],
  modules: [
    '@nuxtjs/moment'
  ],
  generate: {
    routes: function () {
      return urlMap.ids.map(id => {
        return '/posts/' + id;
      });
    }
  }
}

