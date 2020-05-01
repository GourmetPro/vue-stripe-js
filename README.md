# Vue Stripe.js

Vue components for
[Stripe.js and Elements](https://stripe.com/docs/stripe-js).

## Getting started

First, install Vue Stripe.js and
[Stripe.js](https://github.com/stripe/stripe-js).

```sh
npm install @gourmetpro/vue-stripe-js @stripe/stripe-js
```

Install the plugin in your `main`
```ts
import Vue from "vue";
import App from "./App.vue";
import { loadStripe } from "@stripe/stripe-js";
import VueStripe from "@gourmetpro/vue-stripe-js";

const stripe = loadStripe("pk_test_xxxxxxxxxxxxxxxxx");
Vue.use(VueStripe, { stripe });

// You can also directly put the key as an option
// Vue.use(VueStripe, { key: "pk_test_xxxxxxxxxxxxxxxxx" });

new Vue({
  render: (h): VNode => h(App),
}).$mount('#app');
```

Then in one of your components
```vue
<template>
  <div>
   <card-element
      v-if="stripe.elements"
      :elements="stripe.elements"
      @change="ccCompleted = $event.complete"
      @ready="card = $event"
    >
    <button @click="payByCard">Subscribe</button>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import { $stripe, CardElement } from "@gourmetpro/vue-stripe-js";

@Component({
  components: { CardElement }
})
export default class Checkout extends Vue {

  public stripe = $stripe;
  public clientSecret!: Promise<string>;
  public card: StripeCardElement | null = null;
  public ccCompleted = false;

  public async created() {
    this.clientSecret = fetch("https://my-intent-endpoint");// Fetch a payment or setup intent
  }

  public async payByCard() {
    const clientSecret = await this.clientSecret;

    try {
      const { intent, error } = await this.stripe.stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: "Test"
            }
          }
        }
      );
      if(error) {
        // Something went wrong
        console.log("Error at confirmation", error);
      }
      else {
        // Success !!
        console.log("Confirmed intent", intent);
      }
    } catch (error) {
      // Somehow something really wrong happend
      console.log("Stripe confirm setup error", error);
    }
  }
}
</script>
```

### Minimum requirements

The minimum supported version of Vue is v2.6.

### TypeScript support

Vue Stripe.js is packaged with TypeScript declarations. Some types are pulled
from [`@stripe/stripe-js`](https://github.com/stripe/stripe-js)—be sure to add
`@stripe/stripe-js` as a dependency to your project for full TypeScript support.


## Contribute

Developer mode with entry point at `dev/serve.ts`
```
yarn serve
```

Build
```
yarb build
```



