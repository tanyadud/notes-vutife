import Vue from "vue";
import VueMq from "vue-mq";

import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import dateFilter from "@/filters/date.filter";

import "materialize-css/dist/js/materialize.min";

import App from "./App.vue";
import Loader from "@/components/app/Loader";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;
Vue.filter("date", dateFilter);
Vue.component("Loader", Loader);
Vue.use(VueMq, {
  breakpoints: {
    xs: 375,
    sm: 768,
    md: 1024,
    lg: Infinity
  }
});

let app;

firebase.initializeApp({
  apiKey: "AIzaSyBAjnK_QesmMJFenjqRNZtZPpWCz01D8yw",
  authDomain: "notes-app-vue.firebaseapp.com",
  databaseURL: "https://notes-app-vue.firebaseio.com",
  projectId: "notes-app-vue",
  storageBucket: "notes-app-vue.appspot.com",
  messagingSenderId: "1049512527279",
  appId: "1:1049512527279:web:47ee67a9fb0e2877a9db5a"
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
