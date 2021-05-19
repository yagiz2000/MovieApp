import store from "./store";
const setUser = user =>{
  localStorage.setItem("email",user.email);
  localStorage.setItem("uid",user.uid);
  store.commit("setUser",user)
}
const getUser = () => JSON.parse(localStorage.getItem("user"));
const destroyUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("uid");
    store.commit("destroyUser");
};
export { setUser, getUser, destroyUser };
