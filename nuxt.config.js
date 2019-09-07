import metadata from './static/metadata.json';

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '去往世界的尽头',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '平时码字记录技术的小角落' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/default.min.css'
      }
    ],
    script: [{
      src: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js'
    }],
  },
  /*
    ** Global CSS
    */
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    'normalize.css',
    '@/assets/css/github-markdown.scss',
    '@/assets/css/primjs-markdown.scss',
    '@/assets/css/global.scss'
  ],
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
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
  },
  modules: ['@nuxtjs/markdownit'],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    typographer: true,
    injected: true,
    use: ['markdown-it-container', 'markdown-it-attrs']
  },
  generate: {
    routes: function () {
      return metadata.posts.map(post => {
        return '/posts/' + post.id;
      });
    }
  }
}

