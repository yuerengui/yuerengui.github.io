<template>
  <main>
    <ul>
      <li class="entry__list-item" v-for="entry in entries" :key="entry.id">
        <nuxt-link class="entry__link" :to="'/entries/'+entry.slug">
          <h2 class="entry__link-header">{{ entry.title }}</h2>
        </nuxt-link>
        <p>{{entry.createdAt}}</p>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EntriesComponent",
  computed: mapState(["entries"]),
  mounted() {
    console.log(process.env.NODE_ENV)
  }
};
</script>