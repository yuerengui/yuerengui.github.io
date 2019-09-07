<template>
  <main>
    <div class="home__link-container">
      <nuxt-link to="/">Return Home</nuxt-link>
    </div>
    <div id="wrapper" v-html="post"></div>
    <div class="home__link-container">
      <nuxt-link to="/">Return Home</nuxt-link>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  async fetch({ store, route }) {
    await store.dispatch("LOAD_ENTRY", route.params.slug);
  },
  computed: {
    post() {
      let entry = this.$store.state.entry;
      return require(`~/static/entries/${entry}.md`).default;
    }
  }
};
</script>