<template>
  <v-col cols="12" sm="10" md="6">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title
          :class="{fontXs: this.$mq === 'xs', fontSm: this.$mq === 'sm'}"
        >Войдите в аккаунт</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form :lazy-validation="lazy" ref="loginForm">
          <v-text-field
            label="Email"
            name="email"
            prepend-icon="alternate_email"
            type="text"
            v-model.trim="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
            v-model="password"
            :rules="passwordRules"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <router-link to="/register" class="mr-5">Зарегистрироваться</router-link>
        <v-btn color="primary" type="submit" @click.prevent="submitHandler" :loading="loading">Войти</v-btn>
      </v-card-actions>
    </v-card>
    <Snackbar :text="message"/>
  </v-col>
</template>

<script>
import messages from "@/utils/messages";
import Snackbar from "../components/app/Snackbar";

export default {
  name: "Login",
  components: {Snackbar},
  data: () => ({
    valid: false,
    password: "",
    loading: false,
    passwordRules: [v => !!v || "Это поле обязательное"],
    email: "",
    emailRules: [
      v => !!v || "Это поле обязательное",
      v =>
        /.+@.+\..+/.test(v) || "Проверьте правильность написания своего e-mail"
    ],
    lazy: false,
    message: ''
  }),
  mounted() {
    if (messages[this.$route.query.message]) {
      this.message = messages[this.$route.query.message];
    }
  },
  methods: {
    async submitHandler() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      };

      try {
        this.loading = true;
        await this.$store.dispatch("login", formData);
        this.loading = false;
        this.$router.push("/");
      } catch (e) {
        console.error(e);
      }
    },

    reset() {
      this.$refs.loginForm.reset();
    },
    resetValidation() {
      this.$refs.loginForm.resetValidation();
    }
  }
};
</script>

<style lang="scss" scoped>
.fontXs {
  font-size: 0.8rem;
}

.fontSm {
  font-size: 1rem;
}
</style>
