<script lang="ts">
import Vue from 'vue';
import { VueStripeJsSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueStripeJsSample,
  }
});
</script>

<template>
  <div id="app">
    <vue-stripe-js-sample />
  </div>
</template>
