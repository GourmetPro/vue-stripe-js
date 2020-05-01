<template>
  <div>
    <card-element v-if="$stripe.stripe" />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";

import { CardElement } from "@/entry"

@Component({
  components: {
    CardElement
  }
})
export default class Form extends Vue {
  @Inject("$stripe") readonly $stripe!: any | null


}
</script>

<style></style>
