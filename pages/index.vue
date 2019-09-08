<template>
  <div class="container">
    <custom-header></custom-header>
    <transition name="fade">
      <div class="main" v-if="!loading">
        <nuxt-link
          tag="div"
          class="nuxt-link"
          :to="'/posts/'+post.id"
          :key="post.id"
          v-for="post in posts">
          <h2 class="article-title">{{post.attributes.title}}</h2>
          <div class="content-item">
            <p class="description" v-html="post.detail"></p>
          </div>
          <p class="bottom">
            <span class="bottom_left">
              <span class="time">
                <i class="el-icon-date"></i>
                {{$moment().calendar(post.attributes.date)}}
              </span>
              <el-tag v-for="(tag, index) in post.attributes.tags" :key="index" size="mini">{{tag}}</el-tag>
            </span>
            <el-link class="bottom_right" :underline="false">Read More</el-link>
          </p>
        </nuxt-link>
      </div>
    </transition>
    <transition name="fade">
      <custom-footer v-if="!loading"></custom-footer>
    </transition>
    <el-backtop></el-backtop>
  </div>
</template>
<script>
import customHeader from "~/components/header/header";
import customFooter from "~/components/footer/footer";
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: true,
      posts: null
    }
  },
  components: {
    customHeader,
    customFooter
  },
  computed: mapState(["post_id_array"]),
  async asyncData({ store }) {
    await store.dispatch("LOAD_POSTS_ID_ARRAY");
  },
  beforeRouteEnter(to, from, next) {
    if(process.client) {
      next(async (vm) => {
        vm.loading = true
        let posts = []
        for(let i = 0; i < vm.post_id_array.length; i++) {
          let id = vm.post_id_array[i]
          let mdContent =  await import(`~/static/posts/${id}.md`);
          let oDiv = document.createElement('div')
          oDiv.innerHTML = mdContent.html
          $(oDiv).find('more').parent().nextAll().remove()
          $(oDiv).addClass('markdown-body')
          let item = {
            id: id,
            detail: oDiv.outerHTML,
            attributes: mdContent.attributes
          }
          posts.push(item)
        }
        vm.posts = posts
        vm.$nextTick(() => {
          vm.loading = false
        })
      })
    } else {
      next()
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/base-variable.scss";
@import "@/assets/css/github-markdown.scss";
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
    color: $titleColor;
    font-size: 28px;
    font-weight: 600;
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
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    .bottom_left{
      display: flex;
      align-items: center;
      span.time {
        font-size: 14px;
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
    .bottom_right{
      border-bottom: 1px solid #aaa;
      &:hover{
        border-bottom: 1px solid #409EFF;
      }
    }
  }
}
</style>

