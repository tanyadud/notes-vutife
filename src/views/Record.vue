<template>
  <v-container>
    <Loader v-if="loading" />
    <v-row v-else>
      <div class="page-title">
        <h2 class="display-1 font-regular">Новая заметка</h2>
      </div>
      <v-col cols="12" sm="12" md="10">
        <v-form :lazy-validation="lazy" ref="recordForm">
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
          >Создать</v-btn>
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
  name: "Record",
  components: { Snackbar },
  data: () => ({
    valid: false,
    message: "",
    loading: false,
    title: "",
    description: "",
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
    lazy: false
  }),
  methods: {
    ...mapActions(["CREATE_NOTE"]),
    async submitHandler() {
      if (!this.$refs.recordForm.validate()) {
        return;
      }

      const formData = {
        title: this.title,
        description: this.description,
        date: new Date().toJSON()
      };

      try {
        this.btnLoading = true;
        await this.CREATE_NOTE(formData);
        this.btnLoading = false;
        this.message = "Запись успешно добавлена!";
      } catch (e) {}
    }
  }
};
</script>
