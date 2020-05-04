# Vue Stripe.js

Vue components for
[Stripe.js and Elements](https://stripe.com/docs/stripe-js).

## Getting started

First, install Vue Stripe.js and
[Stripe.js](https://github.com/stripe/stripe-js).

```sh
npm install @gourmetpro/vue-stripe-js @stripe/stripe-js
```

#### Using plugin

Install the plugin in your `src/main.js`
```js
import Vue from "vue";
import App from "./App.vue";
import { loadStripe } from "@stripe/stripe-js";
import VueStripe from "@gourmetpro/vue-stripe-js";

const stripePromise = loadStripe('pk_test_xxxxxxxxx');
Vue.use(VueStripe, { stripe: stripePromise });

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

Then in one of your components
```vue
<template>
  <div>
    <card-element
      v-if="$stripe.elements"
      @change="ccCompleted = $event.complete"
      @ready="card = $event"
    >
    <button @click="payByCard">Subscribe</button>
  </div>
</template>

<script>
import { CardElement } from "@gourmetpro/vue-stripe-js";

export default {
  components: { CardElement },
  data() {
    return {
      ccCompleted: false,
      card:  null;
    }
  },
  methods: {
    async submit() {
      if (!this.$stripe.stripe || !this.card) {
        return;
      }
      const {
        error,
        paymentMethod
      } = await this.$stripe.stripe.createPaymentMethod({
        type: "card",
        card: this.card
      });
    }
  }
}
</script>
```

#### Using slot props

In parent component (e.g. `src/App.vue`)

```vue
<template>
  <elements :stripe="stripePromise">
    <checkout-form />
  </elements>
</template>

<script>
import { Elements } from "@gourmetpro/vue-stripe-js";
import CheckoutForm from "@/components/CheckoutForm.vue";

export default {
  components: {
    Elements,
    CheckoutForm,
  },
  data() {
    return {
      stripePromise: loadStripe("pk_test_xxxxxxxxx");
    }
  }
}
</script>
```

In child component (e.g. `src/components/CheckoutForm.vue`)
```vue
<template>
  <elements-consumer>
    <template v-slot="{stripe, elements}">
      <card-element
        v-if="elements"
        @change="ccCompleted = $event.complete"
        @ready="card = $event" />
      <button @click.prevent="submit(stripe)" :disabled="!stripe || !ccCompleted">Pay</button>
    </template>
  </elements-consumer>
</template>

<script>
import { CardElement, ElementsConsumer } from "@gourmetpro/vue-stripe-js";

export default {
  components: { CardElement, ElementsConsumer },
  data() {
    return {
      ccCompleted: false,
      card:  null;
    }
  },
  methods: {
    async submit(stripe) {
      if (!this.card) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: this.card
      });
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
yarn build
```



