
import Vue from 'vue'
import type { Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { validateStripe } from "@/utils/guards";
import { DollarStripe, VueStripe } from '@/types';

export const i$stripe = "i$stripe";

export function makeDollarStripe(stripe: Stripe | null | Promise<Stripe | null>, elementOptions?: StripeElementsOptions): DollarStripe {

  const promise: Promise<VueStripe | null> = validateStripe(stripe).then((stripe) => {
    return stripe && { stripe, elements: stripe.elements(elementOptions) };
  })

  const $stripe: DollarStripe = Vue.observable({
    stripe: null,
    elements: null,
    promise: promise
  });

  promise.then(vueStripe => {
    if (vueStripe) {
      $stripe.stripe = vueStripe.stripe;
      $stripe.elements = vueStripe.elements;
    }
  })

  return $stripe;
}

