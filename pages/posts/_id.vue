<template>
  <div class="container detail">
    <transition name="fade">
      <header v-if="!loading">
        <h1 class="title">{{attributes.title}}</h1>
        <p class="bottom">
          <span class="time">发布于: {{$moment().calendar(attributes.date)}}</span>
          <el-tag v-for="(tag, index) in attributes.tags" :key="index" size="mini">{{tag}}</el-tag>
        </p>
        <nuxt-link class="return" to="/">
          <i class="el-icon-arrow-left"></i>
        </nuxt-link>
      </header>
    </transition>
    <transition name="fade">
      <div class="main" v-if="!loading">
        <div v-html="post" class="content markdown-body"></div>
        <div class="copyright">
          <p class="title">文章名：{{attributes.title}}</p>
          <p class="copyright">
            版权声明：
            <a href="javascript:;">署名-非商业使用-禁止演绎 3.0 国际</a>
          </p>
          <p class="artilce-link">
            原文链接：
            <a :href="articleUrl">{{articleUrl}}</a>
          </p>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <custom-footer v-if="!loading"></custom-footer>
    </transition>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import customHeader from "~/components/header/header";
import customFooter from "~/components/footer/footer";


export default {
  components: {
    customHeader,
    customFooter
  },
  async asyncData({ params, store }) {
    return {
      loading: true
    };
  },
  beforeRouteEnter(to, from, next) {
    if (process.client) {
      next(async vm => {
        const post = await import(`~/static/posts/${to.params.id}.md`);
        vm.attributes = post.attributes;
        vm.post = post.html;
        vm.loading = false;
      });
    } else {
      next();
    }
  },
  computed: {
    articleUrl() {
      if (process.client) {
        return window.location.href;
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
@import "../../assets/css/base-variable.scss";
@import "../../assets/css/markdown.scss";

div.container.detail {
  header {
    height: 200px;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid $borderColor;
    color: $activeColor;
    position: relative;
    a.return {
      display: block;
      position: absolute;
      left: 50px;
      top: 50px;
      padding: 5px;
      border: 2px solid $articleColor;
      border-radius: 50%;
      @include transition;
      i {
        font-size: 25px;
        color: $articleColor;
        cursor: pointer;
      }
      &:hover {
        border: 2px solid $activeColor;
        i {
          color: $activeColor;
        }
      }
    }
    h1.title {
      width: 100%;
      box-sizing: border-box;
      padding-left: 50px;
      text-align: left;
      font-size: 25px;
      font-weight: 700;
      padding-top: 110px;
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
      .el-tag {
        margin-right: 5px;
      }
    }
  }
  div.main {
    @include responseWidth;
    margin: 20px auto;
    overflow: hidden;
    div.content {
      background: #fff;
      box-sizing: border-box;
      padding: 40px;
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
  }
}
</style>