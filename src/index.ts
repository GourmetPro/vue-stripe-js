import { install } from "./install"

export * from './types';

export { i$stripe } from "@/utils/dollarStripe";

// Default export is library as a whole, registered via Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/components/index';
