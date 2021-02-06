<template>
  <v-container class="text-center" fill-height style="height: calc(100vh - 58px);">
    <v-row align="center">
      <v-col>
        <h1 class="display-2 primary--text mb-2">Уууупс, 404</h1>

        <p>Страница, которую вы искали, не найдена</p>

        <v-btn to="/" color="primary" outlined>Главная страница</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "NotFound",
  created() {
    this.$ssrContext && this.$ssrContext.res.status(404);
  }
};
</script>
<style lang="">
</style>