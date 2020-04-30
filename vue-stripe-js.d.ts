import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const VueStripeJs: { install: InstallFunction };
export default VueStripeJs;

export const VueStripeJsSample: VueConstructor<Vue>;
