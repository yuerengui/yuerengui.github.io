<template>
  <el-container direction='vertical' style="width: 80%;margin: 0 auto;">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-main>
      <div v-html="post" class="markdown-body"></div>
    </el-main>
    <custom-footer></custom-footer>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex"
import customHeader from '~/components/header/header'
import customFooter from '~/components/footer/footer'
export default {
  data() {
    return {};
  },
  components: {
    customHeader,
    customFooter
  },
  async fetch({ store, route }) {
    await store.dispatch("LOAD_POST", route.params.slug);
  },
  computed: {
    post() {
      let post = this.$store.state.post;
      return require(`~/static/posts/${post}.md`).default;
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
};
</script>