import Vue from "vue";
import VueRouter from "vue-router";
import Films from "./components/Films.vue";
import Favourite from "./components/Favourite.vue";
import Auth from "./components/Auth.vue";
import SearchFilm from "./components/Search.vue";
import store from "./store";
import SpecFilm from "./components/SpecFilm.vue";
import userComments from "./components/userComments.vue";
import Profile from "./components/Profile.vue";
import routerGuard from "./route-guard";
Vue.use(VueRouter);
export const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Films,
      beforeEnter: routerGuard,
      meta:{      
          requiresAuth: true
      }
    },
    {
      path: "/favourites",
      component: Favourite,
      beforeEnter: routerGuard,
      meta:{      
        requiresAuth: true
    }
    },
    {
      path: "/auth",
      component: Auth,
      beforeEnter(to, from, next) {
        store.state.showNavbar = false;
        next();
      },
    },
    {
      path: "/searchFilm",
      component: SearchFilm,
      beforeEnter: routerGuard,
      meta:{      
        requiresAuth: true
    }
    },
    {
      path: "/film/:id",
      name: "film",
      component: SpecFilm,
      beforeEnter: routerGuard,
      meta:{      
        requiresAuth: true
    }
    },
    {
      path: "/comments",
      name: "comments",
      component: userComments,
      beforeEnter: routerGuard,
      meta:{      
        requiresAuth: true
    }
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: routerGuard,
      meta:{      
        requiresAuth: true
    }
    },
  ],
  mode: "history",
});
