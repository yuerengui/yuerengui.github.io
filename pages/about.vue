<template>
  <div class="container">
    <custom-header></custom-header>
    <transition name="fade">
      <div class="main" v-if="!loading">
        <div v-html="post" class="content markdown-body"></div>
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
import about from '~/content/pages/about.md'

export default {
  data() {
    return {
      loading: true,
      post: null
    }
  },
  components: {
    customHeader,
    customFooter
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading = true
      vm.post = about.html
      vm.loading = false
    })
  }
}
</script>
<style lang="scss">
@import "@/assets/css/base-variable.scss";
@import "@/assets/css/markdown.scss";

div.content{
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 3px;
  border:1px solid #eeeeee;
  margin-bottom: 20px;
  overflow: hidden;
  color: $articleColor;
}
</style>

