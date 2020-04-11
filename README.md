# A simple Stripe integration using next.js

This example app shows how to use the new [Payment Intents](https://stripe.com/docs/payments/payment-intents) API from Stripe.

This app was built with the [next.js](https://nextjs.org/) framework, which offers a pre-built basic app that can be easily and quickly customized on both server side and client side elements.

## Basic Structure

This app starts with a main page in `pages/index.js` as per next.js [pages structure](https://nextjs.org/docs/basic-features/pages).

This page has one basic react component (`Shopping`) that receives two properties:

- `clientSecret`: this key is returned by Stripe along with the PaymentIntent object;

- `stripePublishableKey`: your Stripe account public key available on your account dashboard;

Both these propoerties are generated on the server side by the `getServerSideProps` function.

![flow](https://github.com/marionogueira/stripe-demo/blob/master/assets/flow.jpg?raw=true)

## Local Installation and Configuration

Dependencies:

- [node.js](https://nodejs.org)
- [yarnpkg](https://yarnpkg.com)

Download this code:

```bash
git clone https://github.com/marionogueira/stripe-demo.git
cd stripe-demo
```

Before running the app with next.js you must first configure two environment variables the app will use:

```bash
export STRIPE_PUBLISHABLE_KEY="[available on your Stripe account dashboard]"
export STRIPE_SECRET_KEY="[available on your Stripe account dashboard]"
```

Now run next.js:

```bash
yarn install
yarn dev
```

The app will be available on your browser on http://localhost:3000.

## Online Installation and Configuration

You can also run this app with an online environment at https://codesandbox.io.

Follow the instructions [here](https://codesandbox.io/s/github) and inform the app repo URL when requested. More details [here](https://codesandbox.io/docs/importing#import-from-github).

After the app is imported into a sandbox, you must set two SECRETS:

```bash
STRIPE_PUBLISHABLE_KEY="[available on your Stripe account dashboard]"
STRIPE_SECRET_KEY="[available on your Stripe account dashboard]"
```

Follow the instructions [here](https://codesandbox.io/docs/secrets#adding-secrets) to learn how to perform this setting.
