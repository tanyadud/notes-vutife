<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height d-flex justify-center align-center" fluid>
        <v-row align="center" justify="center">
          <router-view />
        </v-row>
      </v-container>
    </v-content>
    <Snackbar :text="message" />
  </v-app>
</template>

<script>
import messages from "@/utils/messages";
import Snackbar from "../components/app/Snackbar";
import { mapGetters } from "vuex";

export default {
  name: "EmptyLayout",
  components: { Snackbar },
  data: () => ({
    message: ""
  }),
  computed: {
    ...mapGetters(["ERROR"]),
    error() {
      return this.ERROR;
    }
  },
  watch: {
    error(fbError) {
      this.message = messages[fbError.code] || "Что-то пошло не так...";
    }
  }
};
</script>
