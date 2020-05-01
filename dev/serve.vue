<template>
  <div>
    <card-element
    v-if="stripe.stripe"
    :elements="stripe.elements"
    @change="ccCompleted = $event.complete"
    @ready="card = $event"/>

    <button :disabled="!ccCompleted" @click="checkout">Checkout</button>
  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CardElement } from "@/entry";

import { $stripe } from "@/entry"
import { StripeCardElement } from '@stripe/stripe-js';

@Component({
  components: {
    CardElement
  }
})
export default class App extends Vue {
  public stripe = $stripe
  public ccCompleted = false;
  public card: StripeCardElement | null = null;

  public checkout() {
    // Do something
  }

}
</script>
