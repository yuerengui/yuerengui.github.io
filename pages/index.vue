<template>
  <div>
    <custom-header></custom-header>
    <entries-component></entries-component>
  </div>
</template>

<script>
import EntriesComponent from "~/components/EntriesComponent";
import customHeader from '~/components/header'

export default {
  components: {
    EntriesComponent,
    customHeader
  },
  async fetch({ store }) {
    await store.dispatch("LOAD_ENTRIES");
  }
};
</script>

