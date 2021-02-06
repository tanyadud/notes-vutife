<template>
  <!--  <div>-->
  <!--    <Loader v-if="loading"/>-->

  <!--    <div v-else>-->
  <!--      <div class="page-title">-->
  <!--        <h3>Редактировать запись</h3>-->
  <!--      </div>-->

  <!--      <form class="form" @submit.prevent="submitHandler">-->
  <!--        <div class="input-field">-->
  <!--          <input-->
  <!--            id="title"-->
  <!--            type="text"-->
  <!--            v-model="title"-->
  <!--          >-->
  <!--          <label for="title">Заголовок</label>-->
  <!--        </div>-->

  <!--        <div class="input-field">-->
  <!--        <textarea-->
  <!--          id="description"-->
  <!--          class="materialize-textarea"-->
  <!--          v-model="description"-->
  <!--        ></textarea>-->
  <!--          <label for="description">Описание</label>-->
  <!--        </div>-->

  <!--        <button class="btn waves-effect waves-purple indigo" type="submit">-->
  <!--          Обновить-->
  <!--          <i class="material-icons right">send</i>-->
  <!--        </button>-->
  <!--      </form>-->
  <!--    </div>-->
  <!--  </div>-->
  <v-container>
    <Loader v-if="loading" />
    <v-row v-else>
      <div class="page-title">
        <h2 class="display-1 font-regular">Новая заметка</h2>
      </div>
      <v-col cols="12" sm="12" md="10">
        <v-form :lazy-validation="lazy" ref="editForm">
          <v-text-field
            label="Заголовок"
            name="title"
            prepend-icon="title"
            type="text"
            v-model="title"
            :rules="titleRules"
            required
            counter
          ></v-text-field>

          <v-textarea
            name="description"
            label="Описание"
            prepend-icon="notes"
            v-model="description"
            :rules="descriptionRules"
            required
            counter
          ></v-textarea>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            type="submit"
            @click.prevent="submitHandler"
            :loading="btnLoading"
          >Обновить</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <Snackbar :text="message" />
  </v-container>
</template>

<script>
import Snackbar from "../components/app/Snackbar";

import { mapActions } from "vuex";

export default {
  name: "Edit",
  components: { Snackbar },
  data: () => ({
    loading: true,
    title: "",
    description: "",
    id: "",
    btnLoading: false,
    titleRules: [
      v => !!v || "Это поле обязательное",
      v => v.length <= 50 || "Максимум 50",
      v => v.length >= 3 || "Минимум 3"
    ],
    descriptionRules: [
      v => !!v || "Это поле обязательное",
      v => v.length >= 10 || "Минимум 10"
    ],
    lazy: false,
    message: ""
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
    ...mapActions(["UPDATE_NOTE", "FETCH_NOTE_BY_ID"]),
    async submitHandler() {
      if (!this.$refs.editForm.validate()) {
        return;
      }

      const note = {
        id: this.id,
        title: this.title,
        description: this.description,
        date: new Date()
      };

      try {
        this.btnLoading = true;
        await this.UPDATE_NOTE(note);
        this.btnLoading = false;
        this.message = "Запись успешно обновлена!";
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped>
textarea#description {
  height: 200px;
  overflow-y: scroll;
}
</style>
