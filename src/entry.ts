import _Vue, { PluginFunction } from 'vue';
import { loadStripe } from "@stripe/stripe-js";
import { validateStripe } from "@/utils/guards";
import {
  StripePluginOptions,
  DollarStripe,
  KeyStripePluginOptions,
  InstanceStripePluginOptions
} from "./types";

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<StripePluginOptions> {
  installed?: boolean;
}

export const $stripe: DollarStripe = _Vue.observable({
  stripe: null,
  elements: null
});

// install function executed by Vue.use()
const install: InstallFunction = async function installVueStripeJs(Vue: typeof _Vue, options?: StripePluginOptions) {
  if (install.installed) return;
  install.installed = true;

  if (
    !options ||
    (!(options as KeyStripePluginOptions).key &&
      !(options as InstanceStripePluginOptions).stripe)
  ) {
    throw new Error(
      "VueStripe needs either a key or a Stripe instance as an option"
    );
  }

  Vue.prototype.$stripe = $stripe;

  const stripe = await validateStripe(
    (options as InstanceStripePluginOptions).stripe ||
      loadStripe((options as KeyStripePluginOptions).key as string)
  );
  if (stripe) {
    $stripe.stripe = stripe;
    $stripe.elements = stripe.elements(options.elementOptions);
  }
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ('false' === process.env.ES_BUILD) {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GlobalVue = (global as any).Vue;
  }
  if (GlobalVue) {
    (GlobalVue as typeof _Vue).use(plugin);
  }
}
// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
