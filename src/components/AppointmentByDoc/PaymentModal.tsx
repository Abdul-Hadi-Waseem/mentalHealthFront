import { useEffect, useState } from "react"

import Offcanvas from "react-bootstrap/Offcanvas"

import Checkout from "./Checkout"

import * as Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"

import { getToken } from "../../utils"
import { toast } from "react-toastify"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
// import { Col, Form, Row } from "react-bootstrap"
import { InsuranceInformation, paymentApiParams } from "../types"
import config from "../../configs/config"
import moment from "moment"
import "./style.css"
// import CardDetails from "./CardDetails"
// import { useNavigate } from "react-router-dom"
// import { Col, Form, Row } from "react-bootstrap"
import CardDetails from "./CardDetails"
// import CardDetails from "./CardDetails"

const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required("Name is required"),
  isInsured: Yup.boolean().optional(),
  useCard: Yup.boolean().optional(),
  insuranceCompany: Yup.string(),
  insuranceNumber: Yup.number().positive().integer(),
  insuranceExpiry: Yup.date(),
})

export enum PaymentProcess {
  PROCEED_TO_CHECKOUT = "proceedToCheckout",
  CARD_DETAILS = "cardDetails",
}
export default function PaymentModal({ doctorDetails, ...props }) {
  const [formState, setFormState] = useState({
    show: false,
    formState: PaymentProcess.PROCEED_TO_CHECKOUT,
  })

  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInformation>({
    insuranceCompany: "",
    insuranceNumber: "",
    expiryDate: "",
  })

  const handleClose = () => {
    setFormState({
      ...formState,
      show: false,
    })

    formik.resetForm()
  }

  const handleShow = () => {
    setFormState({
      ...formState,
      show: true,
    })
  }
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        border: "1px solid #32325d",
        color: "#32325d",
        fontFamily: "Poppins",
      },
    },
  }
  const stripe = useStripe()

  const elements = useElements()

  // const [stripeId, setStripeId] = useState("")

  const minDate = moment().startOf("day").toDate()
  // const [destroyCard, setDestroyCard] = useState(false)
  const formik = useFormik({
    initialValues: {
      cardHolderName: "",
      isInsured: false,
      insuranceCompany: "",
      insuranceNumber: "",
      insuranceExpiry: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setInsuranceInfo({
        ...insuranceInfo,
        expiryDate: values?.insuranceExpiry,
        insuranceCompany: values?.insuranceCompany,
        insuranceNumber: values?.insuranceNumber,
      })
      const paymentData: paymentApiParams = {
        amount: doctorDetails.appointment_fees
          ? doctorDetails.appointment_fees
          : 100,
        patient_uid: JSON.parse(localStorage.getItem("user_information")).uid,
        doctor_uid: doctorDetails.uid,
        isInsured: values.isInsured,
        currency: config.currency,
      }
      // const paymentIntentData = {
      //   amount: 1000,
      //   patient_uid: "aee3032c-90a0-410a-8122-e6d8cbc6725f",
      //   doctor_uid: "cc4a7a84-82b2-4bba-b211-dd24689be854",
      //   isInsured: values.isInsured,
      //   currency: config.currency,
      // }

      const paymentIntentResponse = await createPaymentIntent(paymentData)

      const bookAppointmentResponse = await bookAppointment(
        paymentIntentResponse.stripeId,
        paymentIntentResponse.response.data.clientSecret
      )
      console.log(bookAppointmentResponse, "Book Appointment")
    },
  })

  useEffect(() => {
    return () => {
      if (elements) {
        const card = elements.getElement(CardElement)
        if (card) {
          card.destroy()
        } else {
          return
        }
      }
    }
  }, [elements, formState.show])
  // const navigate = useNavigate()
  // const dataToSend = {
  //   appointment_date: JSON.parse(localStorage.getItem("appointment_date")),
  //   patient: JSON.parse(localStorage.getItem("user_information")),
  //   doctor_details: JSON.parse(sessionStorage.getItem("currentDoctorDetails")),
  //   payment_details: {},
  // }
  // const paymentIntentData = {
  //   amount: 1000,
  //   patient_uid: "aee3032c-90a0-410a-8122-e6d8cbc6725f",
  //   doctor_uid: "cc4a7a84-82b2-4bba-b211-dd24689be854",
  //   isInsured: values.isInsured,
  //   currency: config.currency,
  // }
  const createPaymentIntent = async (paymentInfo: paymentApiParams) => {
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
  const bookAppointment = async (stripeId, clientSecret) => {
    try {
      // dataToSend.payment_details = {
      //   isInsured: !!(
      //     insuranceInfo?.insuranceCompany &&
      //     insuranceInfo?.insuranceNumber &&
      //     insuranceInfo?.expiryDate
      //   ),
      //   stripe_payment_id: stripeId,
      //   insuranceCompany: insuranceInfo?.insuranceCompany ?? "",
      //   insuranceNumber: insuranceInfo?.insuranceNumber ?? "",
      //   insuranceExpiry: insuranceInfo?.expiryDate ?? "",
      // }
      // console.log(stripeId, "ID FROM BOOK APPP")
      const dataToSend = {
        appointment_date: JSON.parse(localStorage.getItem("appointment_date")),
        patient: JSON.parse(localStorage.getItem("user_information")),
        doctor_details: JSON.parse(
          sessionStorage.getItem("currentDoctorDetails")
        ),
        payment_details: {},
      }
      dataToSend.payment_details = {
        isInsured: !!(
          insuranceInfo?.insuranceCompany &&
          insuranceInfo?.insuranceNumber &&
          insuranceInfo?.expiryDate
        ),
        stripe_payment_id: stripeId,
        insuranceCompany: insuranceInfo?.insuranceCompany ?? "",
        insuranceNumber: insuranceInfo?.insuranceNumber ?? "",
        insuranceExpiry: insuranceInfo?.expiryDate ?? "",
        secret: clientSecret,
      }

      const res = await axios.post(
        `${config.base_url}/patient/create_appointment`,
        { data: dataToSend },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )

      if (res?.request?.status === 200) {
        toast.success("Appointment Successfully created")
        // setTimeout(() => {
        //   navigate("/patient-dashboard") // Navigate after 5 seconds
        // }, 2000)
        setFormState({
          ...formState,
          show: false,
        })
      }
    } catch (error) {
      console.log("error", error)
      toast.error("Failed to create appointment. Please try again later.")
    }
  }

  return (
    <div className="width">
      <button onClick={handleShow} className="detail_btn">
        Book Appointment
      </button>

      <Offcanvas
        show={formState.show}
        onHide={handleClose}
        {...props}
        scroll={false}
        backdrop={"static"}
        placement="end"
        backdropClassName="opacity-75"
        renderStaticNode
        style={{
          margin: "auto 5rem ",
          borderRadius: "1.5rem",
          padding: "1rem",
          height: "90vh",
          width: "28rem",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-4 w-100 ">
            Payment Method
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="slim-scrollbar overflow-auto ">
          {formState.formState === PaymentProcess.PROCEED_TO_CHECKOUT && (
            <Checkout
              setFormState={() => {
                setFormState({
                  ...formState,
                  formState: PaymentProcess.CARD_DETAILS,
                })
              }}
              doctorDetails={doctorDetails}
            />
          )}
          {formState.formState === PaymentProcess.CARD_DETAILS && (
            <CardDetails
              cardElementOptions={cardElementOptions}
              formik={formik}
              minDate={minDate}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
