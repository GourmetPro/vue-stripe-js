import Vue, { PropType } from "vue";
import { Stripe, loadStripe, StripeElementsOptions, StripeElements } from '@stripe/stripe-js';
import { validateStripe } from '@/utils/guards';

export interface DollarStripe {
  stripe: Stripe | null;
  elements: StripeElements | null;
}

export const $stripe: DollarStripe = Vue.observable({
  stripe: null,
  elements: null
});

export default Vue.extend({
  name: "Elements",
  props: {
    apiKey: {
      required: false,
      type: String
    },
    stripe: {
      required: false,
      type: Promise as PropType<(Stripe | null | Promise<Stripe | null>)>
    },
    options: {
      required: false,
      type: Object as PropType<StripeElementsOptions>,
      default: () => { return {}; }
    }
  },

  async created() {
    if (!this.apiKey && !this.stripe) {
      throw new Error(
        "VueStripe needs either a key or a Stripe instance as a Prop"
      );
    }

    const stripe = await validateStripe( this.stripe || loadStripe(this.apiKey))

    console.log("Got stripe!", stripe)
    if (stripe) {
      $stripe.stripe = stripe;
      $stripe.elements = stripe.elements(this.options);
    }
  },
  render(h) {
    return h('div', this.$scopedSlots?.default?.({}))
  }
})