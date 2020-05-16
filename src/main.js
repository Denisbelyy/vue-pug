import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VueMaskDirective } from "v-mask";

import "./scss/theme.scss";
import "./components/modules/icons";

Vue.directive("mask", VueMaskDirective);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
