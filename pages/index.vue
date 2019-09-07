<template>
  <el-container direction="vertical">
    <custom-header></custom-header>
    <el-main>
      <nuxt-link tag="div" class="nuxt-link" :to="'/posts/'+post.slug" :key="post.id" v-for="post in posts">
          <h2 class="article-title">{{post.title}}</h2>
          <div class="content-item">
              <p class="description">{{post.description}}</p>
          </div>
          <p class="bottom">
            <span class="time">
              <i class="el-icon-date"></i>
              {{post.createdAt}}
            </span>
            <el-tag v-for="(tag, index) in post.tags" :key="index" size='mini'>{{tag}}</el-tag>
          </p>
      </nuxt-link>
    </el-main>
    <custom-footer></custom-footer>
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
  computed: mapState(["posts"]),
  async fetch({ store }) {
    await store.dispatch("LOAD_POSTS");
  }
};
</script>
<style lang="scss">
@import '../assets/css/base-variable.scss';
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
    span.time{
      font-size: 14px;
      padding-right: 20px;
      color: $fontColor;
      i {
        padding-right: 5px;
        font-size: 14px;
      }
    }
    .el-tag{
      margin-right: 5px;
    }
    span.time {
      width: 180px;
      @include smallScreenHide;
    }
  }
}
</style>

