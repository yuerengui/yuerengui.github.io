const urlMap = require('./static/url-map.json');
const webpack = require('webpack')
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const path = require('path');
import hljs from 'highlight.js'

var md = require('markdown-it')({
  html: true,
  xhtmlOut: false,
  breaks: true,
  langPrefix: 'language-',
  linkify: true,
  linkTarget: '',
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
})


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
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'static'),
        options: {
          markdown: (body) => {
            return md.render(body)
          }
        }
      })
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'static/images/blog'),
        to: path.resolve(__dirname, 'dist/images/blog')
      }, {
        from: path.resolve(__dirname, 'static/images/cover'),
        to: path.resolve(__dirname, 'dist/images/cover')
      }]),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        plugins: [
          imageminMozjpeg({
            quality: 70
          })
        ]
      })
    ]
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

