<template>
  <v-container class="fill-height">
    <Loader v-if="loading" />

    <v-row v-else-if="!NOTES.length" justify="center">
      <p>
        Заметок пока нет.
        <router-link to="/record">Добавить новую заметку</router-link>
      </p>
    </v-row>

    <div v-else class="home-wrapper">
      <div class="page-title">
        <h2 class="display-1 font-regular">Заметки</h2>
      </div>
      <v-row>
        <v-col cols="12" sm="12" md="4" v-for="note in pageNotes" :key="note.id">
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline green--text font-weight-bold">{{ note.date | date('date') }}</div>
                <v-list-item-title class="headline mb-1">{{ note.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ note.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions class="d-flex justify-end">
              <v-btn color="primary" fab x-small dark :href="`/edit/${note.id}`">
                <v-icon>create</v-icon>
              </v-btn>
              <v-btn color="error" fab x-small dark @click="remove(note.id)">
                <v-icon>clear</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-pagination
      v-if="NOTES.length > 6"
      v-model="page"
      :length="Math.ceil(NOTES.length / notesPerPage)"
      :total-visible="4"
      @input="paginate"
    ></v-pagination>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data: () => ({
    loading: true,
    paginateNotes: [],
    notesPerPage: 6,
    page: 1
  }),
  async mounted() {
    await this.FETCH_NOTES();
    this.loading = false;
  },
  methods: {
    ...mapActions(["FETCH_NOTES", "REMOVE_NOTE"]),
    async remove(id) {
      try {
        this.loading = true;
        await this.REMOVE_NOTE(id);
        this.loading = false;
      } catch (e) {
        console.error(e);
      }
    },
    paginate(page) {
      this.page = page;
    }
  },
  computed: {
    ...mapGetters(["NOTES"]),
    pageNotes() {
      let from = Math.ceil((this.page - 1) * this.notesPerPage);
      let to = from + this.notesPerPage;
      return this.NOTES.slice(from, to);
    }
  }
};
</script>

<style lang="scss">
</style>
