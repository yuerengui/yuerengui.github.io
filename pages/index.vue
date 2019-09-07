<template>
  <el-container direction='vertical'>
    <custom-header></custom-header>
    <el-main>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <nuxt-link :to="'/posts/'+post.slug">
            <h2>{{ post.title }}</h2>
          </nuxt-link>
          <p>{{ post.createdAt }}</p>
        </li>
      </ul>
    </el-main>
    <custom-footer></custom-footer>
  </el-container>
</template>

<script>
import customHeader from '~/components/header/header'
import customFooter from '~/components/footer/footer'
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

