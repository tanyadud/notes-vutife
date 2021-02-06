export default {
  state: {
    error: null
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {},
  getters: {
    ERROR: s => s.error
  }
};
