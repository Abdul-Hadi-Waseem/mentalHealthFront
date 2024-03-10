import { useEffect, useState } from "react"

import Offcanvas from "react-bootstrap/Offcanvas"

import Checkout from "./Checkout"

import * as Yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import config from "../../configs/config"
import { getToken } from "../../utils"
import { toast } from "react-toastify"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Col, Form, Row } from "react-bootstrap"

const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required("Name is required"),
  isInsured: Yup.boolean().optional(),
  insuranceCompany: Yup.string().when("isInsured", (isInsured, schema) => {
    if (isInsured) {
      return schema
    } else {
      return schema
    }
  }),
  insuranceNumber: Yup.string().when("isInsured", (isInsured, schema) => {
    if (isInsured) {
      return schema
    } else {
      return schema
    }
  }),
  insuranceExpiry: Yup.date().when("isInsured", (isInsured, schema) => {
    if (isInsured) {
      return schema
    } else {
      return schema
    }
  }),
})

function PaymentModal({ ...props }) {
  const [formState, setFormState] = useState({
    show: false,
    formState: "",
  })
  const resetState = () => {
    setFormState({
      show: false,
      formState: "",
    })
    // Reset form values
    formik.resetForm()
  }
  const [userInformation, setUserInfo] = useState({
    amount: 0,
    payment_status: "paid",
    payment_method: "card",
    card_holder: "",

    isInsured: false,
    insuranceCompany: "",
    insuranceNumber: "",
    insuranceExpiry: "",
  })

  const handleClose = () => {
    setFormState({
      ...formState,
      show: false,
    })
    // Reset form values
    formik.resetForm()
  }

  const handleShow = () => {
    setFormState({
      ...formState,
      show: true,
    })
  }
  const stripe = useStripe()

  const elements = useElements()

  // const onSubmitHandler = async (e) => {

  // }
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
      setUserInfo({
        amount: 0,
        card_holder: values.cardHolderName,
        insuranceCompany: values.insuranceCompany,
        insuranceExpiry: values.insuranceExpiry,
        insuranceNumber: values.insuranceNumber,
        isInsured: values.isInsured,
        payment_method: "card",
        payment_status: "paid",
      })
      // e.preventDefault()

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
          const paymentData = {
            amount: 70000,
            id,
            currency: config.currency,
            tax: config.tax_amount,
            userInfo: { ...userInformation },
          }
          const response = await axios.post(
            `${config.base_url}/user/payment_intent`,
            paymentData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
              },
            }
          )
          console.log(response)
          if (response?.status === 200) {
            console.log("Payment Success")
            toast.success("Payment Success")
            setFormState({
              ...formState,
              formState: "proceedToCheckout",
            })
          }
        } catch (error) {
          toast.error("Error", error)
        }
      } else {
        console.log(error.message)
      }
      // onSubmitHandler()
    },
  })
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

  // const CARD_OPTIONS = {
  //   // iconStyle: "solid",
  //   style: {
  //     base: {
  //       // fontSize: "16px",

  //       // fontFamily: "Poppins",
  //       iconColor: "#c4f0ff",
  //       color: "#32325d",
  //       fontWeight: 500,
  //       fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
  //       fontSize: "16px",
  //       fontSmoothing: "antialiased",
  //       ":-webkit-autofill": { color: "#fce883" },
  //       "::placeholder": { color: "#87bbfd" },
  //     },
  //     invalid: {
  //       iconColor: "#ffc7ee",
  //       color: "#ffc7ee",
  //     },
  //   },
  // }
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
  }, [formState, elements])
  return (
    <div className="width">
      <button
        onClick={handleShow}
        className="btn btn-primary align-self-end py-3 w-100 "
      >
        Proceed To Pay
      </button>
      {/* <div onClick={handleShow}>{payButton}</div> */}

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
          {formState.formState === "" && (
            <Form
              className="flex justify-content-between  flex-column ga h-100 "
              onSubmit={formik.handleSubmit}
            >
              <div className="d-flex flex-column gap-3">
                <p className="fw-bold mb-2">Card Details</p>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label
                    htmlFor="cardHolderName"
                    className="position-absolute badge fw-light text-black start-0 bg-white "
                    style={{
                      top: "-0.5rem",
                      zIndex: 1,
                      width: "auto",
                      margin: "0 0  0 10px",
                    }}
                  >
                    Card Holder Name
                  </Form.Label>
                  <Form.Control
                    id="cardHolderName"
                    placeholder="John Doe"
                    type="text"
                    name="cardHolderName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cardHolderName}
                    className={`p-3  custom-border-light ${
                      formik.touched.cardHolderName &&
                      formik.errors.cardHolderName
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                </Form.Group>
                <Form.Group className="mb-3 position-relative border rounded">
                  <Form.Label
                    htmlFor="cardNumber"
                    className="position-absolute badge fw-light text-black start-0 bg-white "
                    style={{
                      top: "-0.5rem",
                      zIndex: 1,
                      width: "auto",
                      margin: "0 0  0 10px",
                    }}
                  >
                    Card Number
                  </Form.Label>

                  <CardElement options={cardElementOptions} className={`p-3`} />
                </Form.Group>

                <Row className="justify-content-md-center">
                  <Col>
                    <p className="fw-bold mb-2">Is It Covered By Insurance?</p>
                  </Col>
                  <Col xs lg="2">
                    <Form.Check
                      className=""
                      onChange={(e) =>
                        formik.setFieldValue("isInsured", e.target.checked)
                      }
                      onBlur={formik.handleBlur}
                      type="switch"
                      id="custom-switch"
                    />
                  </Col>
                </Row>
                {formik.values.isInsured === true && (
                  <div>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label
                        htmlFor="insuranceCompany"
                        className="position-absolute badge fw-light text-black start-0 bg-white "
                        style={{
                          top: "-0.5rem",
                          zIndex: 1,
                          width: "auto",
                          margin: "0 0  0 10px",
                        }}
                      >
                        Insurance Company
                      </Form.Label>
                      <Form.Control
                        id="insuranceCompany"
                        placeholder="Abc Company"
                        type="text"
                        name="insuranceCompany"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.insuranceCompany}
                        className={`p-3  custom-border-light ${
                          formik.touched.insuranceCompany &&
                          formik.errors.insuranceCompany
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label
                        htmlFor="insuranceNumber"
                        className="position-absolute badge fw-light text-black start-0 bg-white "
                        style={{
                          top: "-0.5rem",
                          zIndex: 1,
                          width: "auto",
                          margin: "0 0  0 10px",
                        }}
                      >
                        Insurance Number
                      </Form.Label>
                      <Form.Control
                        id="insuranceNumber"
                        placeholder="228856896789"
                        type="number"
                        name="insuranceNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.insuranceNumber}
                        className={`p-3  custom-border-light ${
                          formik.touched.insuranceNumber &&
                          formik.errors.insuranceNumber
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label
                        htmlFor="insuranceExpiry"
                        className="position-absolute badge fw-light text-black start-0 bg-white "
                        style={{
                          top: "-0.5rem",
                          zIndex: 1,
                          width: "auto",
                          margin: "0 0  0 10px",
                        }}
                      >
                        Expiry
                      </Form.Label>
                      <Form.Control
                        id="insuranceExpiry"
                        placeholder="12-12-2005"
                        type="date"
                        name="insuranceExpiry"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.insuranceExpiry}
                        className={`p-3 isDate custom-border-light ${
                          formik.touched.insuranceExpiry &&
                          formik.errors.insuranceExpiry
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                    </Form.Group>
                  </div>
                )}
              </div>

              <div className="d-flex gap-2">
                {/* <button
                  disabled={formik.isSubmitting}
                  onClick={() => setShow(false)}
                  className="btn  align-self-end py-3 w-100  "
                >
                  Cancel
                </button> */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  // onClick={() => setFormState("proceedToCheckout")}
                  className="btn btn-primary align-self-end py-3 w-100  "
                >
                  Pay From Card
                </button>
              </div>
            </Form>
          )}

          {formState.formState === "proceedToCheckout" && (
            <Checkout
              setFormState={() => {
                resetState()
              }}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
export default PaymentModal
