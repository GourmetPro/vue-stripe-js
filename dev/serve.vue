<template>
  <elements :stripe="stripe">
    <Form />
  </elements>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Elements } from "@/entry";
import Form from "./form.vue";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_xxxxxxxxxxxx");

@Component({
  components: {
    Elements,
    Form
  }
})
export default class App extends Vue {
  public stripe = stripePromise
}
</script>

<style></style>
