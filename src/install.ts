import OurVue, { VueConstructor } from 'vue'
import * as components from '@/components/index';
import { makeDollarStripe } from "@/utils/dollarStripe";
import { InstallFunction, StripePluginOptions } from "@/types";

// install function executed by Vue.use()
export const install: InstallFunction = async function installVueStripeJs(Vue: VueConstructor, options?: StripePluginOptions) {
  if (install.installed) return;
  install.installed = true;

  if (OurVue !== Vue) {
    console.error('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this')
  }

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });

  if (!options || typeof options.stripe === 'undefined') {
    Vue.prototype.$stripe = new Proxy({}, {
      get() {
        throw new Error("Since no Stripe instance has been provided please use the Elements component to provide it.")
      }
    });
  }
  else {
    Vue.prototype.$stripe = makeDollarStripe(options.stripe, options.elementOptions);
  }
}


