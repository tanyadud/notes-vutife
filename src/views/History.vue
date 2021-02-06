<template>
  <v-container>
    <Loader v-if="loading" />

    <v-row v-else-if="!NOTES.length">
      <p>
        Заметок пока нет.
        <router-link to="/record">Добавить новую заметку</router-link>
      </p>
    </v-row>

    <div v-else>
      <div class="page-title mb-5">
        <h2 class="display-1 font-regular">История записей</h2>
      </div>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Поиск"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="NOTES"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.date="{ item }">
            {{
            item.date | date("datetime")
            }}
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "History",
  data: () => ({
    loading: true,
    note: {},
    search: "",
    headers: [
      { text: "Заголовок", value: "title" },
      { text: "Дата", value: "date" }
    ]
  }),
  async mounted() {
    await this.FETCH_NOTES();
    this.loading = false;
  },
  computed: {
    ...mapGetters(["NOTES"])
  },
  methods: {
    ...mapActions(["FETCH_NOTES", "REMOVE_NOTE"]),
    idToModal(id) {
      this.removeNote = id;
    },
    async remove(id) {
      try {
        this.loading = true;
        await this.REMOVE_NOTE(id);
        await this.$router.push("/history");
        this.loading = false;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
