import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
Vue.use(Vuex);
import firebase from "firebase";
const config = {
  apiKey: "AIzaSyBUojiNoUITZxBD9T8Wqx773bnD0LCoGiw",
  authDomain: "filmapp-aa692.firebaseapp.com",
  databaseURL: "https://filmapp-aa692-default-rtdb.firebaseio.com",
  storageBucket: "filmapp-aa692.appspot.com",
};
firebase.initializeApp(config);

const store = new Vuex.Store({
  state: {
    films: [],
    idToken: "",
    uid:"",
    favFilms:[],
    filmId:null,
    isAuth:true,
    showNavbar:false,
    comments:[],
    email:null,
    showLoading:true
  },
  mutations: {
    setFilms(state, comingFilms) {
      state.films = comingFilms;
    },
    setToken(state, token) {
      state.idToken = token;
    },
    removeToken(state) {
      state.idToken = "";
    },
    setTokenToClient(state, token) {
      localStorage.setItem("token", token);
    },
    removeTokenFromClient() {
      localStorage.removeItem("token");
    },
    setuid(state,payload){
        state.uid = payload;
        localStorage.setItem("uid",payload);
    },
    removeUid(){
      localStorage.removeItem("uid");
    },
    setFavFilmsToState(state,payload){
      state.favFilms = payload;
    },
    setFilmId(state,payload){
      state.filmId = payload;
    },
    setEmail(state,payload){
      state.email = payload;
      localStorage.setItem("email",payload)    
    },
    setComments(state,payload){
      state.comments = payload;
    }
  },
  actions: {
    async getFilmsFromApi({ commit }) {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=627db53bdee442611e5ff76d64be01c1&language=en-US&page=1"
      );
      const jsnd = await res.json();
      commit("setFilms", jsnd.results);
    },    
    removeToken({ commit }) {
      commit("removeToken");
    },
    logOut({ commit }) {
      commit("removeTokenFromClient");
      commit("removeToken");
      commit("removeUid");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("email");
    },
    setTimeOutForToken({ dispatch }, expirresIn) {
      setTimeout(() => {
        dispatch("logOut");
      }, expirresIn*1000);
    },
    // eslint-disable-next-line no-unused-vars
    async addFavFilmToDatabase({commit},payload){
      let isDuplicated = false;
      const uid = localStorage.getItem("uid");
      // eslint-disable-next-line no-unused-vars
      const url = "https://filmapp-aa692-default-rtdb.firebaseio.com/users/"+uid+"/favFilms.json";
      const readResponse = await fetch(url);
      const readableRes = await readResponse.json();
      for (const key in readableRes) {
        if(readableRes[key].title === payload.title){
          isDuplicated = true;
        }
      }
      if(!isDuplicated){
        let ref2 = firebase.database().ref().child("users").child(uid).child("favFilms").push();
        let customId = ref2.key;
        let data = {
          title:payload.title,
          poster:payload.poster_path,
          customid:customId,
          filmid:payload.id
        }
        ref2.set(data);
      }    
    },
    // eslint-disable-next-line no-unused-vars
    async addComment({commit},payload){
      const uid = localStorage.getItem("uid");
      //const url = "https://filmapp-aa692-default-rtdb.firebaseio.com/users/"+uid+"/comments.json";
      let ref1 = firebase.database().ref().child("users").child(uid).child("comments").push(); 
      let customId = ref1.key;
      let filmId = payload.filmId;
      let ref2 = firebase.database().ref().child("films").child(filmId).child("comments").child(customId)
      //custom id burada üretiliyor.
      let email = localStorage.getItem("email");
      let data1 = {
        commentId:customId,
        filmId,
        content:payload.comment,
        title:payload.title,
        email
      }
      let data2 = {
        content:payload.comment,
        email,
      }
      ref1.set(data1);
      ref2.set(data2);
    },
    async getFilmDataFromDb({commit}){
      const uid = localStorage.getItem("uid");
      const url = "https://filmapp-aa692-default-rtdb.firebaseio.com/users/"+uid+"/favFilms.json";
      const readResponse = await fetch(url);
      const readableRes = await readResponse.json();
      commit("setFavFilmsToState",readableRes);
    },
    // eslint-disable-next-line no-unused-vars
    async removeFilm({dispatch},payload){
      const uid = localStorage.getItem("uid");
      // eslint-disable-next-line no-unused-vars
      let ref2 = firebase.database().ref().child("users").child(uid).child("favFilms").child(payload).remove();
      dispatch("getFilmDataFromDb");//Reaktif ui işlemi için yaptım.
    },
    // eslint-disable-next-line no-unused-vars
    async loadComments({commit},payload){
      let filmId = payload;
      const url = `https://filmapp-aa692-default-rtdb.firebaseio.com/films/${filmId}/comments.json`;
      const res = await fetch(url);
      const jsnd = await res.json();
      commit("setComments",jsnd);
    },
    // eslint-disable-next-line no-unused-vars
    async removeCommentFromDb({dispatch},payload){
      const uid = localStorage.getItem("uid");
      let filmIdString = payload.filmId.toString();
      // eslint-disable-next-line no-unused-vars
      let ref1 = firebase.database().ref().child("users").child(uid).child("comments").child(payload.commentId).remove();    
      // eslint-disable-next-line no-unused-vars
      let ref2 = firebase.database().ref().child("films").child(filmIdString).child("comments").child(payload.commentId).remove();    
    },
    // eslint-disable-next-line no-unused-vars
    async editCommentFromDb({dispatch},payload){
      const uid = localStorage.getItem("uid");
      const filmIdString = payload.filmId.toString();
      let ref1 = firebase.database().ref().child("films").child(filmIdString).child("comments").child(payload.commentId);    
      let ref2 = firebase.database().ref().child("users").child(uid).child("comments").child(payload.commentId); 
      const data = {
        content:payload.value,
        title:payload.title,
        commentId:payload.commentId,
        filmId:payload.filmId,
        email:payload.email
      }
      ref1.set(data);
      ref2.set(data);
    },
    // eslint-disable-next-line no-unused-vars
    async uploadImageToFirebase({commit,dispatch,state},payload){
      let uid = localStorage.getItem("uid");
      let storageRef = firebase.storage().ref();
      let ref = storageRef.child("images/"+uid);
      return ref.put(payload);
    },
    // eslint-disable-next-line no-unused-vars
    async getProfilePhoto({commit,dispatch,state},payload){
      let uid = localStorage.getItem("uid");
      let storageRef = firebase.storage().ref();
      let res = await storageRef.child("images/"+uid).getDownloadURL();
      return res;
    },    
  },
  getters: {
    emitFilms(state) {
      return state.films;
    },
    isAuthanticated(state) {
      let a = state.idToken !== "";
      return a;
    },
    getUid(state){
        return state.uid;
    },
    getFavFilms(state){
      return state.favFilms;
    },
    getFilmId(state){
      return state.filmId;
    },
    getAuthStatus(state){
      return state.isAuth;
    },
    showNavbar(state){
      return state.showNavbar;
    },
    getComments(state){
      return state.comments;
    },
    getLoadingStatus(state){
      return state.showLoading;
    }
  },
  modules:{
    auth
  }
});
export default store;
