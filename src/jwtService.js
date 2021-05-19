import auth from "./auth";
const setUser = user =>{
  localStorage.setItem("email",user.email);
  localStorage.setItem("uid",user.uid);
    auth.commit("setUser",user);
}
const getUser = () => JSON.parse(localStorage.getItem("user"));
const destroyUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("uid");
    auth.commit("destroyUser");
  };
export { setUser, getUser, destroyUser };
