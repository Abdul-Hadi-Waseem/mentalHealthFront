import axios from "axios"
import config from "../../configs/config"
import { getToken } from "../../utils"
import { toast } from "react-toastify"
import { paymentApiParams } from "../types"

export const bookAppointment = async ({
  stripeId,
  clientSecret,
  dataToSend,
  setState,
}: {
  stripeId?: string
  clientSecret?: string
  dataToSend: any
  setState: () => void
}) => {
  try {
    const res = await axios.post(
      `${config.base_url}/patient/create_appointment`,
      { data: dataToSend },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )

    if (res?.request?.status === 200) {
      toast.success("Appointment Successfully created")
      setState()
    }
  } catch (error) {
    console.log("error", error)
    toast.error("Failed to create appointment. Please try again later.")
  }
}
export const createPaymentIntent = async ({
  handleClose,
  paymentInfo,
  stripe,
  elements,
  CardElement,
}) => {
  if (!stripe || !elements) {
    return
  }
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: elements.getElement(CardElement),
  })
  if (!error) {
    try {
      const { id } = paymentMethod
      // console.log(id, "Token Id")
      // setStripeId(id)
      // console.log(stripeId, "stripe id")
      console.log(id, "stripe id 2")
      const response = await axios.post(
        `${config.base_url}/user/payment_intent`,
        paymentInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      // console.log(response)
      // if (response?.status === 200) {
      // console.log("Payment Success")
      // toast.success("Payment Success")
      // }
      return {
        response,
        stripeId: id,
      }
    } catch (error) {
      toast.error("Error", error)
      handleClose()
    }
  } else {
    console.log(error.message)
  }
}
