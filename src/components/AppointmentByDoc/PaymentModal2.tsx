import { useEffect, useState } from "react"

import Offcanvas from "react-bootstrap/Offcanvas"

import Checkout from "./Checkout"

// import * as Yup from "yup"
// import { useFormik } from "formik"
// import axios from "axios"

// import { getToken } from "../../utils"
import { toast } from "react-toastify"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
// import { Col, Form, Row } from "react-bootstrap"
// import { InsuranceInformation, paymentApiParams } from "../types"
import config from "../../configs/config"
import moment from "moment"
import "./style.css"

import CardDetails2 from "./CardDetails2"

import { useForm } from "react-hook-form"
import { bookAppointment, createPaymentIntent } from "./utils"
import { paymentApiParams } from "../types"
export enum PaymentProcess {
  PROCEED_TO_CHECKOUT = "proceedToCheckout",
  CARD_DETAILS = "cardDetails",
}
interface IForm {
  isInsured: boolean
  useCard: boolean
  insuranceCompany: string
  insuranceNumber: number
  insuranceExpiry: Date
  cardHolderName: string
}
export default function PaymentModal2({ doctorDetails, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IForm>({
    defaultValues: {
      isInsured: false,
      useCard: false,
      insuranceCompany: "",
      insuranceNumber: 0,
      insuranceExpiry: new Date(),
      cardHolderName: "",
    },
  })
  const [formState, setFormState] = useState({
    show: false,
    formState: PaymentProcess.PROCEED_TO_CHECKOUT,
  })
  const handleClose = () => {
    setFormState({
      ...formState,
      show: false,
    })
    reset()
  }
  const useCard = watch("useCard")
  const isInsured = watch("isInsured")

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
  const minDate = moment().startOf("day").toDate()

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

  const onFormSubmit = async (values) => {
    const paymentData: paymentApiParams = {
      amount: doctorDetails.appointment_fees
        ? doctorDetails.appointment_fees
        : 100,
      patient_uid: JSON.parse(localStorage.getItem("user_information")).uid,
      doctor_uid: doctorDetails.uid,
      isInsured: values.isInsured,
      currency: config.currency,
    }
    if (useCard) {
      const paymentIntentResponse = await createPaymentIntent({
        CardElement,
        elements,
        handleClose,
        paymentInfo: paymentData,
        stripe,
      })

      const dataToSend = {
        appointment_date: JSON.parse(localStorage.getItem("appointment_date")),
        patient: JSON.parse(localStorage.getItem("user_information")),
        doctor_details: JSON.parse(
          sessionStorage.getItem("currentDoctorDetails")
        ),
        payment_details: {},
      }
      dataToSend.payment_details = {
        isInsured: false,
        stripe_payment_id: paymentIntentResponse.stripeId,
        insuranceCompany: "",
        insuranceNumber: "",
        insuranceExpiry: "",
        secret: paymentIntentResponse.response.data.clientSecret,
      }

      await bookAppointment({
        dataToSend,
        setState: () => {
          setFormState({
            ...formState,
            show: false,
          })
        },
      })
    } else if (isInsured) {
      const dataToSend = {
        appointment_date: JSON.parse(localStorage.getItem("appointment_date")),
        patient: JSON.parse(localStorage.getItem("user_information")),
        doctor_details: JSON.parse(
          sessionStorage.getItem("currentDoctorDetails")
        ),
        payment_details: {},
      }
      dataToSend.payment_details = {
        isInsured: true,
        insuranceCompany: values?.insuranceCompany,
        insuranceNumber: values?.insuranceNumber,
        insuranceExpiry: values?.insuranceExpiry,
      }
      await bookAppointment({
        dataToSend,
        setState: () => {
          setFormState({ ...formState, show: false })
        },
      })
    } else {
      toast.error("Please select a payment method")
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
            <CardDetails2
              errors={errors}
              handleSubmit={handleSubmit}
              register={register}
              watch={watch}
              onSubmit={onFormSubmit}
              minDate={minDate}
              cardElementOptions={cardElementOptions}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
