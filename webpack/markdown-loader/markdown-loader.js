const fs = require('fs')
const path = require('path')
const hash = require('hash-sum')
const LRU = require('lru-cache')
const hljs = require('highlight.js')
const frontmatter = require('front-matter')
// markdown-it 插件
const emoji = require('markdown-it-emoji')
// 处理 html 的插件，用来提取 description 返回给前端
const cheerio = require('cheerio')

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

  // 生成 description，以及图片处理
  const $ = cheerio.load(fm.html)
  $.root().find('more').parent().nextAll().remove()
  let oImgList = $.root().find('img')
  if (oImgList.length > 0) {
    oImgList = oImgList.slice(0, 6)
    $.root().find('img').parent('p').remove()
    let oImgContainer = $('<div class="image_container"></div>')
    oImgContainer.addClass('images_' + oImgList.length)
    if(oImgList.length < 4) {
      oImgInnerContainer = $('<div class="images"></div>')
      oImgInnerContainer.append(oImgList)
      oImgContainer.append(oImgInnerContainer)
    }
    if(oImgList.length === 4) {
      oImgInnerContainer = $('<div class="images"></div>')
      oImgInnerContainer.append(oImgList.slice(0, 2))
      oImgContainer.append(oImgInnerContainer)
      oImgInnerContainer2 = $('<div class="images"></div>')
      oImgInnerContainer2.append(oImgList.slice(2))
      oImgContainer.append(oImgInnerContainer2)
    } else if (oImgList.length === 5) {
      oImgInnerContainer = $('<div class="images"></div>')
      oImgInnerContainer.append(oImgList.slice(0, 1))
      oImgContainer.append(oImgInnerContainer)
      oImgInnerContainer2 = $('<div class="images"></div>')
      console.log(oImgList.slice(1, 2).length)
      oImgInnerContainer2.append(oImgList.slice(1, 3))
      oImgContainer.append(oImgInnerContainer2)
      oImgInnerContainer3 = $('<div class="images"></div>')
      oImgInnerContainer3.append(oImgList.slice(3))
      oImgContainer.append(oImgInnerContainer3)
    } else if (oImgList.length === 6) {
      oImgInnerContainer = $('<div class="images"></div>')
      oImgInnerContainer.append(oImgList.slice(0, 2))
      oImgContainer.append(oImgInnerContainer)
      oImgInnerContainer2 = $('<div class="images"></div>')
      oImgInnerContainer2.append(oImgList.slice(2, 4))
      oImgContainer.append(oImgInnerContainer2)
      oImgInnerContainer3 = $('<div class="images"></div>')
      oImgInnerContainer3.append(oImgList.slice(4))
      oImgContainer.append(oImgInnerContainer3)
    }
    $.root().prepend(oImgContainer)
  }

  addProperty('attributes', stringify(fm.attributes));
  addProperty('html', stringify(fm.html));
  addProperty('description', stringify($.html()));
  
  return `module.exports = { ${output} }`;
}