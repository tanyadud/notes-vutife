import firebase from "firebase/app";

export default {
  actions: {
    async LOGIN({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name, surname }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("GET_U_ID");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            name,
            surname
          });
      } catch (e) {
        commit("SET_ERROR", e);
        throw e;
      }
    },
    GET_U_ID() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async LOGOUT() {
      await firebase.auth().signOut();
    }
  }
};
