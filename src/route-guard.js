import firebase from "firebase";
import store from "./store";
export default (to,from,next)=>{
    store.state.showNavbar= true;
    let currentUser;
    firebase.auth().onAuthStateChanged(user=>{
        currentUser = user;
        console.log("call back'teki current",currentUser);
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        console.log(requiresAuth);
        if (requiresAuth && !currentUser) {
            store.state.showNavbar = false;
            next({ path: "/auth" })
        }
        else if (!requiresAuth && currentUser) {
            console.log("showNavbar gözüktü");
            store.state.showNavbar= true;
            next({ path: "/" });
        }
        else{ next()}
    });
    
}