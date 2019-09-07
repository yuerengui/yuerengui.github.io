<template>
  <el-container direction="vertical" class="detail">
    <header>
      <h1 class="title">{{metadata.title}}</h1>
      <p class="bottom">
        <span class="time">发布于：{{metadata.createdAt}}</span>
        <el-tag v-for="(tag, index) in metadata.tags" :key="index" size='mini'>{{tag}}</el-tag>
      </p>
    </header>
    <el-main class="main">
      <client-only>
        <div v-html="post" class="content markdown-body"></div>
        <div class="copyright">
          <p class="title">文章名：{{metadata.title}}</p>
          <p class="copyright">
            版权声明：
            <a href="javascript:;">署名-非商业使用-禁止演绎 3.0 国际</a>
          </p>
          <p class="artilce-link">
            原文链接：
            <a :href="articleUrl">{{articleUrl}}</a>
          </p>
        </div>
        <nuxt-link class="return" to="/">
          <i class="el-icon-arrow-left"></i>
        </nuxt-link>
      </client-only>
    </el-main>
    <custom-footer></custom-footer>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import customHeader from "~/components/header/header";
import customFooter from "~/components/footer/footer";
export default {
  data() {
    return {};
  },
  components: {
    customHeader,
    customFooter
  },
  async asyncData ({params, store}) {
    await store.dispatch("LOAD_POST", params.slug);
    let metadata = store.state.post
    return { 
      metadata: metadata,
      post: require(`~/static/posts/${metadata.slug}.md`).default
     }
  },
  computed: {
    articleUrl() {
      if(process.client) {
        return window.location.href
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss">
@import '../../assets/css/base-variable.scss';

.el-container.detail {
  header {
    height: 255px;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid $borderColor;
    color: $activeColor;
    position: relative;
    h1.title {
      width: 100%;
      box-sizing: border-box;
      padding-left: 50px;
      text-align: left;
      font-size: 25px;
      font-weight: 700;
      padding-top: 170px;
    }
    p.bottom {
      position: absolute;
      font-size: 14px;
      left: 0px;
      bottom: 20px;
      padding-left: 50px;
      span.time {
        padding-right: 10px;
      }
      .el-tag{
        margin-right: 5px;
      }
    }
  }
  .el-main.main {
    @include responseWidth;
    margin: 20px auto;
    overflow: hidden;
    div.content {
      background: #fff;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 6px;
      font-size: 16px;
      color: $articleColor;
      border: 1px solid #eeeeee;
      margin-bottom: 20px;
    }
    div.copyright {
      background: #fff;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 6px;
      font-size: 16px;
      border: 1px solid #eeeeee;
      p {
        color: $fontColor;
        font-size: 14px;
        line-height: 25px;
        a {
          color: $activeColor;
        }
      }
    }
    a.return {
      display: block;
      position: absolute;
      left: 50px;
      top: 50px;
      i {
        font-size: 40px;
        color: $articleColor;
        @include transition;
        cursor: pointer;
        &:hover {
          color: $activeColor;
        }
      }
    }
  }
}
</style>