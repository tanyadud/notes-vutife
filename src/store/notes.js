import firebase from "firebase/app";

export default {
  state: {
    notes: []
  },
  mutations: {
    SET_NOTES_TO_STATE(state, notes) {
      state.notes = notes;
    },
    CLEAR_NOTES(state) {
      state.notes = [];
    },
    REMOVE_NOTE_FROM_STATE(state, id) {
      state.notes = state.notes.filter(note => note.id !== id);
    },
    ADD_NOTE(state, note) {
      state.notes.push(note);
    }
  },
  actions: {
    async CREATE_NOTE({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("GET_U_ID");
        await firebase
          .database()
          .ref(`/users/${uid}/notes`)
          .push(record);
        commit("ADD_NOTE", record);
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    async FETCH_NOTES({ dispatch, commit }) {
      try {
        const uid = await dispatch("GET_U_ID");
        const notes =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/notes`)
              .once("value")
          ).val() || {};
        notes &&
          commit(
            "SET_NOTES_TO_STATE",
            Object.keys(notes).map(key => ({ ...notes[key], id: key }))
          );
        return Object.keys(notes).map(key => ({ ...notes[key], id: key }));
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    async FETCH_NOTE_BY_ID({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("GET_U_ID");
        const note =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/notes`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...note, id };
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    async REMOVE_NOTE({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("GET_U_ID");

        commit("REMOVE_NOTE_FROM_STATE", id);
        return firebase
          .database()
          .ref(`/users/${uid}/notes`)
          .child(id)
          .remove();
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    async UPDATE_NOTE({ dispatch, commit }, { title, description, id, date }) {
      try {
        const uid = await dispatch("GET_U_ID");
        await firebase
          .database()
          .ref(`/users/${uid}/notes`)
          .child(id)
          .update({ title, description, date });
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    }
  },
  getters: {
    NOTES(state) {
      return state.notes;
    }
  }
};
