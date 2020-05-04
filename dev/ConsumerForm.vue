<template>
  <elements-consumer>
    <template v-slot="{stripe, elements}">
      <card-element v-if="elements" @change="ccCompleted = $event.complete" @ready="card = $event" />
      <button @click.prevent="submit(stripe)" :disabled="!stripe || !ccCompleted">Pay</button>
    </template>
  </elements-consumer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Stripe, StripeCardElement } from "@stripe/stripe-js";
import { CardElement, ElementsConsumer } from "@/index";

@Component({
  components: {
    CardElement,
    ElementsConsumer
  }
})
export default class ConsumerForm extends Vue {
   ccCompleted = false;
   card: StripeCardElement | null = null;

   async submit(stripe: Stripe) {
    if (!this.card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: this.card
    });
    console.log("[ConsumerForm] submit error", error);
    console.log("[ConsumerForm] submit paymentMethod", paymentMethod);
  }
}
</script>