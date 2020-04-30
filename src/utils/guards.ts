import type { Stripe } from "@stripe/stripe-js";

export const isUnknownObject = (
  raw: unknown
): raw is { [key in PropertyKey]: unknown } => {
  return raw !== null && typeof raw === "object";
};

export const isPromise = (raw: unknown): raw is PromiseLike<unknown> => {
  return isUnknownObject(raw) && typeof raw.then === "function";
};

// We are using types to enforce the `stripe` prop in this lib,
// but in an untyped integration `stripe` could be anything, so we need
// to do some sanity validation to prevent type errors.
export const isStripe = (raw: unknown): raw is Stripe => {
  return (
    isUnknownObject(raw) &&
    typeof raw.elements === "function" &&
    typeof raw.createToken === "function" &&
    typeof raw.createPaymentMethod === "function" &&
    typeof raw.confirmCardPayment === "function"
  );
};

const INVALID_STRIPE_ERROR =
  "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.";

// We are using types to enforce the `stripe` prop in this lib, but in a real
// integration `stripe` could be anything, so we need to do some sanity
// validation to prevent type errors.
export const validateStripe = async (
  maybeStripeP: unknown
): Promise<null | Stripe> => {
  const maybeStripe = await maybeStripeP;
  if (maybeStripe === null || isStripe(maybeStripe)) {
    return maybeStripe;
  }

  throw new Error(INVALID_STRIPE_ERROR);
};
