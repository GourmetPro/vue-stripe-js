import createElementComponent from "./createElementComponent";
import Elements from "./Elements";

export { Elements };

const isServer = typeof window === "undefined";

/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 *
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const AuBankAccountElement = createElementComponent(
  "auBankAccount",
  isServer
);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardElement = createElementComponent("card", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardNumberElement = createElementComponent("cardNumber", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardExpiryElement = createElementComponent("cardExpiry", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardCvcElement = createElementComponent("cardCvc", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const FpxBankElement = createElementComponent("fpxBank", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const IbanElement = createElementComponent("iban", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const IdealBankElement = createElementComponent("idealBank", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const PaymentRequestButtonElement = createElementComponent(
  "paymentRequestButton",
  isServer
);
