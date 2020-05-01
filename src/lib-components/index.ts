import createElementComponent from "./createElementComponent";
import { AuBankAccountElementProps, CardElementProps, CardNumberElementProps, CardExpiryElementProps, CardCvcElementProps, FpxBankElementProps, IbanElementProps, IdealBankElementProps, PaymentRequestButtonElementProps } from '@/types';

import Elements from "./Elements";
export { Elements };

const isServer = typeof window === "undefined";

/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 *
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const AuBankAccountElement = createElementComponent<AuBankAccountElementProps>(
  "auBankAccount",
  isServer
);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardElement = createElementComponent<CardElementProps>("card", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardNumberElement = createElementComponent<CardNumberElementProps>("cardNumber", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardExpiryElement = createElementComponent<CardExpiryElementProps>("cardExpiry", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardCvcElement = createElementComponent<CardCvcElementProps>("cardCvc", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const FpxBankElement = createElementComponent<FpxBankElementProps>("fpxBank", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const IbanElement = createElementComponent<IbanElementProps>("iban", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const IdealBankElement = createElementComponent<IdealBankElementProps>("idealBank", isServer);

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const PaymentRequestButtonElement = createElementComponent<PaymentRequestButtonElementProps>(
  "paymentRequestButton",
  isServer
);
