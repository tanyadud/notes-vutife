<template>
  <!--  <div>-->
  <!--    <div class="page-title">-->
  <!--      <h3>Профиль</h3>-->
  <!--    </div>-->

  <!--    <form class="form" @submit.prevent="submitHandler">-->
  <!--      <div class="input-field">-->
  <!--        <input-->
  <!--          id="description"-->
  <!--          type="text"-->
  <!--          v-model="name"-->
  <!--          :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"-->
  <!--        >-->
  <!--        <label for="description">Имя</label>-->
  <!--        <small-->
  <!--          class="helper-text invalid"-->
  <!--          v-if="$v.name.$dirty && !$v.name.required"-->
  <!--        >Введите своё имя</small>-->
  <!--        <small-->
  <!--          class="helper-text invalid"-->
  <!--          v-else-if="$v.name.$dirty && !$v.name.minLength"-->
  <!--        >-->
  <!--          Минимальное количество символов {{ $v.name.$params.minLength.min }}. Сейчас оно {{ name.length }}-->
  <!--        </small>-->
  <!--      </div>-->

  <!--      <button class="btn waves-effect waves-light indigo" type="submit">-->
  <!--        Обновить-->
  <!--        <i class="material-icons right">send</i>-->
  <!--      </button>-->
  <!--    </form>-->
  <!--  </div>-->
  <v-container>
    <div class="page-title">
      <h2 class="display-1 font-regular">Профиль</h2>
    </div>
    <v-col cols="12" sm="10" md="6">
      <v-form :lazy-validation="lazy" ref="profileForm" @submit.prevent="submitHandler">
        <v-text-field
          label="Имя"
          name="name"
          prepend-icon="edit"
          type="text"
          v-model.trim="name"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          type="submit"
          @click.prevent="submitHandler"
          :loading="loading"
        >Изменить</v-btn>
      </v-form>
    </v-col>
    <Snackbar :text="message" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Snackbar from "../components/app/Snackbar";

export default {
  name: "Profile",
  components: { Snackbar },
  data: () => ({
    name: "",
    nameRules: [
      v => !!v || "Это поле обязательное",
      v => v.length <= 10 || "Максимум 10",
      v => v.length >= 2 || "Минимум 2"
    ],
    valid: false,
    lazy: false,
    loading: false,
    message: ""
  }),
  mounted() {
    this.name = this.INFO.name;
  },
  computed: {
    ...mapGetters(["INFO"])
  },
  methods: {
    ...mapActions(["UPDATE_INFO"]),
    async submitHandler() {
      if (!this.$refs.profileForm.validate()) {
        return;
      }

      try {
        this.loading = true;
        this.UPDATE_INFO({
          name: this.name
        });

        this.loading = false;
        this.message = "Ваше имя было успешно изменено!";
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped></style>
