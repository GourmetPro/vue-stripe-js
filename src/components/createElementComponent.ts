import Vue, { PropType, PropOptions } from "vue";
import type { StripeElement, StripeElementType } from "@stripe/stripe-js";
import { isUnknownObject } from "@/utils/guards";
import { isEqual } from "@/utils/isEqual";
import { ElementProps } from "@/types";
import { i$stripe } from "@/utils/dollarStripe";

type UnknownOptions = { [k: string]: unknown };

const capitalized = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const extractUpdateableOptions = (options?: UnknownOptions): UnknownOptions => {
  if (!isUnknownObject(options)) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { paymentRequest: _, ...rest } = options;

  return rest;
};

function createElementComponent<T extends ElementProps>(
  type: StripeElementType,
  isServer: boolean
) {
  const name = `${capitalized(type)}Element`;

  // Type needs to be explicit or compiler gets confused
  const props: {
    options: PropOptions<T>
  } = {
    options: {
      required: false,
      type: Object as PropType<T>,
      default: () => {
        return {} as T;
      }
    }
  }

  const Element = isServer ? Vue.extend({
      name,
      props,
      render(h) {
        return h("div", {
          attrs: this.$attrs
        });
      }
    })
  : Vue.extend({
        name,
        props,
        data() {
          return {
            element: null,
          } as {
            element: StripeElement | null
          }
        } ,
        inject: {
          i$stripe: {
            from: i$stripe,
            default: null
          }
        },
        beforeMount() {
          if (this.element) {
            return;
          }

          const dStripe = (this as any).i$stripe || this.$stripe

          if(!dStripe) {
            throw new Error("Need to install VueStripe plugin or provide with Elements component");
          }
          if(!dStripe.elements) {
            throw new Error("Stripe was not yet loaded or error");
          }

          const element = dStripe.elements.create(type as any, this.options);
          this.element = element;

          element.on("ready", () => this.$emit("ready", this.element));
          element.on("change", (event: any) => this.$emit("change", event));
          element.on("blur", () => this.$emit("blur"));
          element.on("focus", () => this.$emit("focus"));
          element.on("escape", () => this.$emit("escape"));

          // Users can pass an an onClick prop on any Element component
          // just as they could listen for the `click` event on any Element,
          // but only the PaymentRequestButton will actually trigger the event.
          (element as any).on("click", () => this.$emit("click"));
        },
        mounted() {
          if (!this.element) {
            return;
          }
          this.element.mount(this.$el as HTMLElement);
        },
        beforeDestroy() {
          if (this.element) {
            this.element.unmount();
            this.element.destroy();
          }
        },
        watch: {
          options(options: UnknownOptions, prevOptions: UnknownOptions) {
            if (
              prevOptions &&
              prevOptions.paymentRequest !== options.paymentRequest
            ) {
              console.warn(
                "Unsupported prop change: options.paymentRequest is not a customizable property."
              );
            }

            const updateableOptions = extractUpdateableOptions(options);
            if (
              Object.keys(updateableOptions).length !== 0 &&
              !isEqual(updateableOptions, extractUpdateableOptions(prevOptions))
            ) {
              if (this.element) {
                this.element.update(updateableOptions);
              }
            }
          }
        },
        methods: {
          blur() {
            this.element?.blur();
          },
          clear() {
            this.element?.clear();
          },
          focus() {
            this.element?.focus();
          }
        },
        render(h) {
          return h("div", {
            attrs: this.$attrs
          });
        }
      });

  (Element as any).__elementType = type;

  return Element;
}

export default createElementComponent;
