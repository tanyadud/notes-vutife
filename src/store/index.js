import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import notes from "./notes";
import info from "./info";
import error from "./error";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    info,
    notes,
    error
  }
});
