import Vue, { PropType } from "vue";
import type { Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { makeDollarStripe, i$stripe } from "@/utils/dollarStripe";

export const Elements = Vue.extend({
  name: 'Elements',
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
    const defaultSlotChildren = this.$scopedSlots?.default?.({})
    if(defaultSlotChildren && defaultSlotChildren.length === 1) {
      return defaultSlotChildren[0];
    }
    else{
      return h('div', defaultSlotChildren);
    }
  }
})

export const ElementsConsumer = Vue.extend({
  name: 'ElementsConsumer',
  inject: {
    [i$stripe]: {
      default: null
    }
  },
  render(h) {
    // TODO use vue fragments
    const defaultSlotChildren = this.$scopedSlots?.default?.({
      stripe: (this as any).i$stripe?.stripe,
      elements: (this as any).i$stripe?.elements
    })
    if(defaultSlotChildren && defaultSlotChildren.length === 1) {
      return defaultSlotChildren[0];
    }
    else{
      return h('div', defaultSlotChildren);
    }
  }
})