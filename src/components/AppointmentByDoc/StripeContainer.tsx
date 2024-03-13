import config from "../../configs/config"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import { DoctorDetails } from "../types"
// import PaymentModal from "./PaymentModal"
import PaymentModal2 from "./PaymentModal2"
const PUBLIC_KEY = config.STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(PUBLIC_KEY)
export default function StripeContainer({
  doctorDetails,
}: {
  doctorDetails: DoctorDetails
}) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentModal2 doctorDetails={doctorDetails} />
    </Elements>
  )
}
