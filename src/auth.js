import firebase from "firebase";
import { destroyUser, getUser, setUser } from "./jwtService";
import { router } from "./router";
export default {
  state: {
    user: getUser(),
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    destroyUser(state) {
      state.user = "";
    },
    setUid(state, uid) {
      localStorage.setItem("uid", uid);
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    signUpOrIn({ commit }, payload) {
      if (payload.isUser === false) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            setUser(user.user);
          })
          .catch((err) => console.log(err));
        return true;
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            router.push("/");
            setUser(user.user);
          })
          .catch((err) => console.log(err));
      }
    },
    signOut(state) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          destroyUser();
          state.showNavbar = false;
        });
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
};
