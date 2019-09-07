<template>
  <el-container direction="vertical">
    <custom-header></custom-header>
    <el-main v-loading="loading">
      <client-only>
        <nuxt-link
          tag="div"
          class="nuxt-link"
          :to="'/posts/'+post.id"
          :key="post.id"
          v-for="post in posts">
          <h2 class="article-title">{{post.title}}</h2>
          <div class="content-item">
            <p class="description" v-html="postDetail(post.id)"></p>
          </div>
          <p class="bottom">
            <span class="time">
              <i class="el-icon-date"></i>
              {{post.createdAt}}
            </span>
            <el-tag v-for="(tag, index) in post.tags" :key="index" size="mini">{{tag}}</el-tag>
          </p>
        </nuxt-link>
      </client-only>
    </el-main>
    <custom-footer></custom-footer>
    <el-backtop></el-backtop>
  </el-container>
</template>
<script>
import customHeader from "~/components/header/header";
import customFooter from "~/components/footer/footer";
import { mapState } from "vuex";

export default {
  components: {
    customHeader,
    customFooter
  },
  data() {
    return {
      loading: true
    }
  },
  computed: mapState(["posts"]),
  async asyncData({ store }) {
    await store.dispatch("LOAD_POSTS");
  },
  methods: {
    postDetail(id) {
      if(process.client) {
        let post = require(`~/static/posts/${id}.md`).default;
        let oDiv = document.createElement('div')
        oDiv.innerHTML = post
        $(oDiv).find('more').parent().nextAll().remove()
        $(oDiv).addClass('markdown-body')
        if(id === this.posts[this.posts.length - 1].id) {
          this.$nextTick(() => {
            this.loading = false
          })
        }
        return oDiv.outerHTML
      }
    }
  }
};
</script>
<style lang="scss">
@import "../assets/css/base-variable.scss";
@import "../assets/css/github-markdown.scss";

div.nuxt-link {
  float: left;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 3px;
  @include transition;
  border: 1px solid #eeeeee;
  margin-bottom: 20px;
  cursor: pointer;
  h2.article-title {
    padding-bottom: 15px;
    a {
      color: $activeColor;
      font-size: 18px;
      font-weight: 700;
    }
  }
  div.content-item {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    p.description {
      color: $articleColor;
      font-size: 16px;
      line-height: 25px;
      box-sizing: border-box;
      padding-bottom: 10px;
      padding-right: 10px;
      width: 100%;
    }
    img {
      float: right;
      height: 150px;
    }
  }
  p.bottom {
    display: flex;
    align-items: center;
    padding-top: 10px;
    span.time {
      font-size: 14px;
      padding-right: 20px;
      color: $fontColor;
      i {
        padding-right: 5px;
        font-size: 14px;
      }
    }
    .el-tag {
      margin-right: 5px;
    }
    span.time {
      width: 180px;
      @include smallScreenHide;
    }
  }
}
</style>

