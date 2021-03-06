<template>
  <div class="container home">
    <custom-header></custom-header>
    <transition name="fade">
      <div class="main" v-if="!loading">
        <nuxt-link
          tag="div"
          class="nuxt-link"
          :to="'/posts/'+post.id"
          :key="post.id"
          v-for="post in posts">
          <h2 class="article-title" v-if="post.attributes.title">{{post.attributes.title}}</h2>
          <div class="content-item" >
            <div class="description markdown-body" v-html="post.description" v-if="post.description"></div>
          </div>
          <p class="bottom">
            <span class="bottom_left">
              <span class="time" v-if="post.attributes.date">
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
        vm.$nuxt.$loading.start()
        let posts = []
        for(let i = 0; i < vm.post_id_array.length; i++) {
          let id = vm.post_id_array[i]
          let mdContent =  await import(`~/content/posts/${id}.md`);
          let item = {
            id: id,
            description: mdContent.description,
            attributes: mdContent.attributes
          }
          posts.push(item)
        }
        vm.posts = posts
        vm.loading = false
        vm.$nextTick(() => {
          vm.$nuxt.$loading.finish()
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
@import "@/assets/css/markdown.scss";

.home.container{
  // override 描述中的标题字体
  .markdown-body h1 {
    font-size: 20px;
  }

  .markdown-body h2 {
    font-size: 18px;
  }

  .markdown-body h3 {
    font-size: 16px;
  }

  .markdown-body h4 {
    font-size: 14px;
  }

  .markdown-body h5 {
    font-size: 12px;
  }

  .markdown-body h6 {
    font-size: 11px;
  }
  .markdown-body .image_container{
    padding-bottom: 10px;
    .images{
      display: flex;
      justify-content: space-around;
      align-items: center;
      img{
        object-fit: cover;
        width: 100%;
        height: 400px;
      }
    }
  }
  .markdown-body  .images_2 {
    display: flex;
    flex-direction: column;
    .images{
      img{
        width: 49%;
        height: 400px;
      }
    }
  }
  .markdown-body .images_3{
     .images{
       img{
        width: 33%;
        height: 300px;
      }
     }
  }
  .markdown-body  .images_4{
    display: flex;
    flex-direction: column;
    .images{
      img{
        width: 49%;
        height: 300px;
      }
    }
  }
  .markdown-body  .images_4{
    .images:nth-of-type(1){
      margin-bottom: 10px;
    }
  }
  .markdown-body  .images_5{
    .images{
      img{
        width: 49%;
        height: 300px;
        margin-bottom: 10px;
      }
      &:nth-of-type(1) {
        img{
          width: 100%;
          height: 400px;
          margin-bottom: 10px;
        }
      }
      &:nth-of-type(3) {
        img{
          margin-bottom: 0px;
        }
      }
    }
  }
  .markdown-body  .images_6{
    display: flex;
    flex-direction: column;
    .images{
      img{
        width: 49%;
        height: 300px;
      }
    }
  }
  .markdown-body  .images_6{
    .images:nth-of-type(1){
      margin-bottom: 10px;
    }
    .images:nth-of-type(2){
      margin-bottom: 10px;
    }
  }  
}

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
    div.description {
      color: $articleColor;
      font-size: 16px;
      line-height: 25px;
      box-sizing: border-box;
      padding-bottom: 10px;
      width: 100%;
    }
  }
  p.bottom {
    display: flex;
    justify-content: space-between;
    .bottom_left{
      display: flex;
      align-items: center;
      span.time {
        font-size: 14px;
        color: $fontColor;
        padding-right: 10px;
        @include smallScreenHide;
        i {
          padding-right: 5px;
          font-size: 14px;
        }
      }
      .el-tag {
        margin-right: 5px;
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

