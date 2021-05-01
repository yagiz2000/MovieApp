import Vue from "vue";
import VueRouter from "vue-router";
import Films from "./components/Films.vue";
import Favourite from "./components/Favourite.vue";
import Auth from "./components/Auth.vue";
import SearchFilm from "./components/Search.vue";
import store from  "./store";
import SpecFilm from "./components/SpecFilm.vue";
import userComments from "./components/userComments.vue"
Vue.use(VueRouter);
export const router = new VueRouter({
    routes:[
        {
            path:"/",
         component:Films,
         beforeEnter(to,from,next){
             if(store.getters.isAuthanticated){
                store.state.showNavbar = true;
                next();
             }
             else{
                 next("/auth");
             }
         }
        },
        {
            path:"/favourites",
            component:Favourite,
            beforeEnter(to,from,next){
                if(store.getters.isAuthanticated){
                    next();
                }
                else{
                    next("/auth");
                }
            }
        },
        {path:"/auth",component:Auth,
            beforeEnter(to,from,next){
                store.state.showNavbar = false;
                next();
        }
    },
        {
            path:"/searchFilm",
            component:SearchFilm,
            beforeEnter(to,from,next){
                if(store.getters.isAuthanticated){
                    next();
                }
                else{
                    next("/auth");
                }
            }
    },
        {   path:"/film/:id", 
            name:"film", 
            component:SpecFilm,
            beforeEnter(to,from,next){
                if(store.getters.isAuthanticated){
                    next();
                }
                else{
                    next("/auth");
                }
            }
        },
        {path:"/comments",name:"comments",component:userComments,beforeEnter(to,from,next){
            if(store.getters.isAuthanticated){
                next();
            }
            else{
                next("/auth");
            }
        }}
    ],
    mode:"history"
});