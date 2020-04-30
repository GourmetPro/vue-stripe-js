import Vue, { PropType } from "vue";
import type { Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { makeDollarStripe, i$stripe } from "@/utils/dollarStripe";

export default Vue.extend({
  name,
  props: {
    stripe: {
      required: true,
      type: [String, Object, Promise] as PropType<Stripe | null | Promise<Stripe | null>>
    },
    options: {
      required: false,
      type: Object as PropType<StripeElementsOptions>
    }
  },
  provide() {
    return {
      [i$stripe]: makeDollarStripe(this.stripe, this.options)
    };
  },
  render(h) {
    // TODO use vue fragments
    return h('div', this.$scopedSlots?.default?.({}));
  }
})