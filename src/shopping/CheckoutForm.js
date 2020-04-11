import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

export default function CheckoutForm({ clientSecret, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      console.log(result.error.message);
      // Show error to your customer (e.g., insufficient funds)
      setErrorMsg(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      {errorMsg ? (
        <>
          <span className="failMsg">{errorMsg}</span>
          <br />
        </>
      ) : null}
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}
