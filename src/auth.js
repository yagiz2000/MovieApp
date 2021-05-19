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
    signUpOrIn({ state }, payload) {
      if (payload.isUser === false) {
        return new Promise((resolve,reject)=>{
          firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            setUser(user.user);
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject({type:"signUp",msg:err.message});
          });
        })        
      } else {
        return new Promise((resolve,reject)=>{
          firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            router.push("/");
            setUser(user.user);
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject({type:"signIn",msg:err.message});
          });
        })
         
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
    // eslint-disable-next-line no-unused-vars
    updatePassword({ state }, payload) {
      let user = firebase.auth().currentUser;
      user
        .updatePassword(payload)
        .then(() => {})
        .catch((err) => console.log(err));
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
};
