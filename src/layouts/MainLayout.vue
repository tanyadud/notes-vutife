<template>
  <v-app>
    <Navbar />

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="indigo" app class="justify-center">
      <span class="white--text text-center with-gap">
        Copyright&copy;
        <a
          class="white--text"
          href="https://www.facebook.com/profile.php?id=100002033790432"
          target="_blank"
        >Редька Александр</a> 2020
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "../components/app/Navbar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MainLayout",
  components: { Navbar },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters(["INFO"])
  },
  async mounted() {
    if (!Object.keys(this.INFO).length) {
      await this.FETCH_INFO();
    }

    this.loading = false;
  },
  methods: {
    ...mapActions(["FETCH_INFO"])
  }
};
</script>
