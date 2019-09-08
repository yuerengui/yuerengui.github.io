const urlMap = require('./static/url-map.json');
const webpack = require('webpack')
const path = require('path');
import prism from 'markdown-it-prism'
const md =  require('markdown-it')({
  html: true
})
md.use(prism)

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
    },
    {
      src: '~/plugins/jquery.min.js',
      ssr: false
    }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.module.rules.push({
          test: /\.md$/,
          loader: 'frontmatter-markdown-loader',
          include: [
            path.resolve(__dirname, 'static/posts'),
            path.resolve(__dirname, 'static/pages')
          ],
          options: {
            markdown: (body) => {
              return md.render(body)
            }
          }
        })
      }
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

