import React from "react"
import config from "../../configs/config"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
// import PayFrom from "./PayFrom"
import PaymentModal from "./PaymentModal"
const PUBLIC_KEY = config.STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(PUBLIC_KEY)
export default function StripeContainer() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentModal />
    </Elements>
  )
}
