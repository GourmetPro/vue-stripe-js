// 1. Make sure to import 'vue' before declaring augmented types
import Vue from "vue";
import { DollarStripe } from ".";

declare module "vue/types/vue" {
  interface Vue {
    $stripe: DollarStripe;
  }
}
