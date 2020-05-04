<template>
  <div>
    <h1>PluginForm</h1>
    <plugin-form />

    <h1>ConsumerForm</h1>
    <elements :stripe="stripePromise">
      <consumer-form />
    </elements>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Elements } from "@/index";
import { loadStripe } from "@stripe/stripe-js";
import ConsumerForm from "./ConsumerForm.vue";
import PluginForm from "./PluginForm.vue"


@Component({
  components: {
    Elements,
    ConsumerForm,
    PluginForm,
  }
})
export default class App extends Vue {
  stripePromise = loadStripe("pk_test_xxxxxxxxx");
}
</script>
