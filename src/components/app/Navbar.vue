<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link v-for="link in links" :key="link.url" :to="link.url" :exact="link.exact">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Мои заметки</v-toolbar-title>
      <v-row justify="end">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link to="/profile">
              <v-list-item-action>
                <v-icon>person</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Профиль</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-action>
                <v-icon>undo</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Выйти</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    dropdown_font: ["Arial", "Calibri", "Courier", "Verdana"],
    links: [
      {
        title: "Мои заметки",
        url: "/",
        exact: true,
        icon: "format_align_left"
      },
      { title: "История", url: "/history", icon: "cloud_done" },
      { title: "Новая заметка", url: "/record", icon: "text_fields" },
      { title: "Профиль", url: "/profile", icon: "person" }
    ],
    dropdown: [
      { title: "Профиль", url: "/profile" },
      { title: "Выйти", click: "logout" }
    ]
  }),
  computed: {
    ...mapGetters(["INFO"]),
    userName() {
      return this.INFO.name;
    }
  },
  methods: {
    ...mapActions(["LOGOUT"]),
    async logout() {
      await this.LOGOUT();
      this.$router.push("/login?message=logout");
    }
  }
};
</script>
