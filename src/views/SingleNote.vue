<template>
  <div>
    <Loader v-if="loading" />

    <div v-else>
      <div class="page-title">
        <h3>Заметка «{{ title }}»</h3>
      </div>
      <h1>{{ title }}</h1>
      <p class="flow-text">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SingleNote",
  data: () => ({
    loading: true,
    id: "",
    title: "",
    description: ""
  }),
  async mounted() {
    try {
      this.id = this.$route.params.id;
      const record = await this.FETCH_NOTE_BY_ID(this.id);
      this.title = record.title;
      this.description = record.description;
      this.loading = false;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions(["FETCH_NOTE_BY_ID"])
  }
};
</script>

<style scoped>
</style>
