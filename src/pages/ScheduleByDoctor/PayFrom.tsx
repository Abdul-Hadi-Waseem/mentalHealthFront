import React, { useState } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import config from "../../configs/config"
import axios from "axios"
import { getToken } from "../../utils"
export default function PayFrom() {
  const [successs, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })
    if (!error) {
      try {
        const { id } = paymentMethod
        // console.log(id, "Tokrn Id")
        const response = await axios.post(
          `${config.base_url}/user/payment_intent`,
          {
            data: {
              amount: 1000,
              id,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
            },
          }
        )
        if (response.data.success) {
          console.log("Payment Success")
          setSuccess(true)
        }
      } catch (error) {
        console.log("Error", error)
      }
    } else {
      console.log(error.message)
    }
  }

  const CARD_OPTIONS = {
    // iconStyle: "solid",
    style: {
      base: {
        // fontSize: "16px",

        // fontFamily: "Poppins",
        iconColor: "#c4f0ff",
        color: "#32325d",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  }
  return (
    <div>
      {!successs ? (
        <form onSubmit={handleSubmit}>
          <CardElement options={CARD_OPTIONS} />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      ) : (
        <div>Payment Success</div>
      )}
    </div>
  )
}
