import Vue from 'vue'
import App from './App.vue'
import {router} from "./router";
import store from "./store";
import Notifications from "vue-notification";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
Vue.config.productionTip = false;

Vue.use(Notifications);
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
