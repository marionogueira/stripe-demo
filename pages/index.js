import { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import stripe from "stripe";

import CheckoutForm from "../src/shopping/CheckoutForm";

const Shopping = ({ clientSecret, stripePublishableKey }) => {
  const [paid, setPaid] = useState(false);

  // Loads stripe sdk just once
  const stripePromise = useMemo(() => loadStripe(stripePublishableKey), []);

  // Cretes callback for successfu payment
  const handleSuccess = () => {
    setPaid(true);
  };

  return (
    <div id="app">
      {paid ? (
        // Displays successful payment message and hides the form
        <h2 className="successMsg">Payment successful!</h2>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} onSuccess={handleSuccess} />
        </Elements>
      )}
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  const client = stripe(process.env.STRIPE_SECRET_KEY);
  const paymentIntent = await client.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" }
  });

  // Pass data to the page via props
  return {
    props: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      clientSecret: paymentIntent.client_secret
    }
  };
}

export default Shopping;
