import Vue, { PropType } from "vue";
import { StripeElement, StripeElementType, StripeElements } from "@stripe/stripe-js";
import { isUnknownObject } from "@/utils/guards";
import { isEqual } from "@/utils/isEqual";
import { ElementProps } from "@/types";

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

  const Element = isServer
    ? Vue.extend({
        name,
        props: {
          id: { required: false, type: String },
          className: { required: false, type: String },
          options: {
            required: false,
            type: Object as PropType<T>,
            default: () => {
              return {};
            }
          }
        },
        render(h) {
          return h("div", {
            attrs: {
              id: this.id
            },
            class: this.className
          });
        }
      })
    : Vue.extend({
        name,
        props: {
          elements: { required: true, type: Object as PropType<StripeElements> },
          id: { required: false, type: String },
          className: { required: false, type: String },
          options: {
            required: false,
            type: Object as PropType<T>,
            default: () => {
              return {};
            }
          }
        },
        data() {
          return {
            element: null,
            domNode: null
          } as {
            element: StripeElement | null;
            domNode: HTMLDivElement | null;
          };
        },
        beforeMount() {
          if (this.element) {
            return;
          }

          const element = this.elements.create(type as any, this.options);
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
          // Vue likes to stay in control of $el but Stripe needs a real element
          this.domNode = document.createElement("div");
          this.element.mount(this.domNode);
          // this.$children cannot be used because it expects a VNode :(
          this.$el.prepend(this.domNode);
        },
        beforeDestroy() {
          if (this.element) {
            this.element.unmount();
            this.element.destroy();
          }
          if (this.domNode) {
            this.domNode.parentNode?.removeChild(this.domNode);
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
            attrs: {
              id: this.id
            },
            class: this.className
          });
        }
      });

  (Element as any).__elementType = type;

  return Element;
}

export default createElementComponent;
