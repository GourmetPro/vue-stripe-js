// @ts-ignore
import Vue, { PluginFunction } from 'vue'
import type * as stripeJs from "@stripe/stripe-js";

// Define typescript interfaces for autoinstaller
export interface InstallFunction extends PluginFunction<StripePluginOptions> {
  installed?: boolean;
}

export interface VueStripe {
  stripe: stripeJs.Stripe | null;
  elements: stripeJs.StripeElements | null;
}

export interface DollarStripe extends VueStripe {
  promise: Promise<VueStripe | null>
}

export type StripePluginOptions = {
  stripe: stripeJs.Stripe | null | Promise<stripeJs.Stripe | null>;
  elementOptions?: stripeJs.StripeElementsOptions;
}

declare module "vue/types/vue" {
  interface Vue {
    $stripe: DollarStripe;
  }
}

export interface ElementProps {
  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  id?: string;

  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  className?: string;

  /**
   * Triggered when the Element loses focus.
   */
  onBlur?: () => any;

  /**
   * Triggered when the Element receives focus.
   */
  onFocus?: () => any;
}

export interface AuBankAccountElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=auBankAccount).
   */
  options?: stripeJs.StripeAuBankAccountElementOptions;

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=auBankAccountElement).
   */
  onChange?: (event: stripeJs.StripeAuBankAccountElementChangeEvent) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeAuBankAccountElement) => any;

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any;
}

export interface CardElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=card).
   */
  options?: stripeJs.StripeCardElementOptions;

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=cardElement).
   */
  onChange?: (event: stripeJs.StripeCardElementChangeEvent) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCardElement) => any;

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any;
}

export interface CardNumberElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=cardNumber).
   */
  options?: stripeJs.StripeCardNumberElementOptions;

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=cardNumberElement).
   */
  onChange?: (event: stripeJs.StripeCardNumberElementChangeEvent) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCardNumberElement) => any;

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any;
}

export interface CardExpiryElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=cardExpiry).
   */
  options?: stripeJs.StripeCardExpiryElementOptions;

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=cardExpiryElement).
   */
  onChange?: (event: stripeJs.StripeCardExpiryElementChangeEvent) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCardExpiryElement) => any;

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any;
}

export interface CardCvcElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=cardCvc).
   */
  options?: stripeJs.StripeCardCvcElementOptions;

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=cardCvcElement).
   */
  onChange?: (event: stripeJs.StripeCardCvcElementChangeEvent) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCardCvcElement) => any;

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any;
}

export interface FpxBankElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=fpxBank).
   */
  options?: stripeJs.StripeFpxBankElementOptions;

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=fpxBankElement).
   */
  onChange?: (event: stripeJs.StripeFpxBankElementChangeEvent) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeFpxBankElement) => any;

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any;
}

export interface IbanElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=iban).
   */
  options?: stripeJs.StripeIbanElementOptions;

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=ibanElement).
   */
  onChange?: (event: stripeJs.StripeIbanElementChangeEvent) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeIbanElement) => any;

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any;
}

export interface IdealBankElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=idealBank).
   */
  options?: stripeJs.StripeIdealBankElementOptions;

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=idealBankElement).
   */
  onChange?: (event: stripeJs.StripeIdealBankElementChangeEvent) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeIdealBankElement) => any;

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any;
}

export interface PaymentRequestButtonElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=paymentRequestButton).
   */
  options?: stripeJs.StripePaymentRequestButtonElementOptions;

  /**
   * Triggered when the Element is clicked.
   */
  onClick?: (
    event: stripeJs.StripePaymentRequestButtonElementClickEvent
  ) => any;

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripePaymentRequestButtonElement) => any;
}
