<template>
  <div>
    <card-element
      v-if="$stripe.stripe"
      @change="ccCompleted = $event.complete"
      @ready="card = $event"
    />
    <button @click.prevent="submit" :disabled="!$stripe.stripe || !ccCompleted">Pay</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CardElement } from "@/index";
import { StripeCardElement } from "@stripe/stripe-js";

@Component({
  components: {
    CardElement
  }
})
export default class PluginForm extends Vue {
   ccCompleted = false;
   card: StripeCardElement | null = null;

   async submit() {
    if (!this.$stripe?.stripe || !this.card) {
      return;
    }
    const {
      error,
      paymentMethod
    } = await this.$stripe.stripe.createPaymentMethod({
      type: "card",
      card: this.card
    });
    console.log("[PluginForm] submit error", error);
    console.log("[PluginForm] submit paymentMethod", paymentMethod);
  }
}
</script>