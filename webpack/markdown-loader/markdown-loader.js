const fs = require('fs')
const path = require('path')
const hash = require('hash-sum')
const LRU = require('lru-cache')
const hljs = require('highlight.js')
const frontmatter = require('front-matter')

// markdown-it 插件
const emoji = require('markdown-it-emoji')

// 自定义块
// const containers = require('./container')

const md = require('markdown-it')({
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
  // 使用 emoji 插件渲染 emoji
  .use(emoji)
  // 定义自定义的块容器
  // .use(containers)

const cache = new LRU({
  max: 1000
})

module.exports = function (src) {

  const isProd = process.env.NODE_ENV === 'production'

  const file = this.resourcePath
  const key = hash(file + src)
  const cached = cache.get(key)
  const stringify = (src) => JSON.stringify(src).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

  // 重新模式下构建时使用缓存以提高性能
  if (cached && (isProd || /\?vue/.test(this.resourceQuery))) {
    return cached
  }

  let output = '';
  const addProperty = (key, value) => {
    output += `${key}: ${value},`;
  };
  const fm = frontmatter(src);
  fm.html = md.render(fm.body);
  addProperty('attributes', stringify(fm.attributes));
  addProperty('html', stringify(fm.html));
  
  return `module.exports = { ${output} }`;
}