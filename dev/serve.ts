import "regenerator-runtime/runtime.js";

import Vue, { VNode } from 'vue';
import Dev from './serve.vue';
import { loadStripe } from "@stripe/stripe-js";
import VueStripe from "@/entry";

Vue.config.productionTip = false;

const stripe = loadStripe("pk_test_xxxxxxxxx");
Vue.use(VueStripe, { stripe });

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');