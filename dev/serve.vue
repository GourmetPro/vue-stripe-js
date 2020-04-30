<template>
  <div>
    <card-element
    v-if="$stripe.stripe"
    @change="ccCompleted = $event.complete"
    @ready="card = $event"/>

    <button :disabled="!ccCompleted" @click="checkout">Checkout</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CardElement } from "@/index";
import { StripeCardElement } from '@stripe/stripe-js';

@Component({
  components: {
    CardElement
  }
})
export default class App extends Vue {
  public ccCompleted = false;
  public card: StripeCardElement | null = null;

  public checkout() {
    // Do something
  }

}
</script>
