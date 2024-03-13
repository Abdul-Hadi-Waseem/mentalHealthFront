// import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { CardElement } from "@stripe/react-stripe-js"
import { Form, Row, Col } from "react-bootstrap"
import moment from "moment"

export default function CardDetails2({
  cardElementOptions,
  minDate,
  onSubmit,
  handleSubmit,
  errors,
  register,
  watch,
}) {
  const onSubmitHandler = (data) => {
    onSubmit(data)
  }
  //   const [useCard, setUseCard] = useState(false)
  const useCard = watch("useCard")
  const isInsured = watch("isInsured")
  return (
    <Form
      className="flex justify-content-between flex-column ga h-100 "
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="d-flex flex-column gap-3">
        <p className="fw-bold mb-2">Card Details</p>
        <Row className="justify-content-md-center">
          <Col>
            <p className="fw-bold mb-2">Pay Via Card2?</p>
          </Col>
          <Col xs lg="2">
            <Form.Check
              {...register("useCard")}
              type="switch"
              id="custom-switch"
            />
          </Col>
        </Row>
        {useCard && (
          <>
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
                {...register("cardHolderName", {
                  required: "Name is required",
                })}
                className={`p-3  custom-border-light ${
                  errors.cardHolderName ? "is-invalid" : ""
                }`}
              />
              {errors.cardHolderName && (
                <div className="invalid-feedback">
                  {errors.cardHolderName.message}
                </div>
              )}
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
          </>
        )}
        <Row className="justify-content-md-center">
          <Col>
            <p className="fw-bold mb-2">Is It Covered By Insurance?</p>
          </Col>
          <Col xs lg="2">
            <Form.Check
              {...register("isInsured")}
              type="switch"
              id="custom-switch"
            />
          </Col>
        </Row>
        {isInsured && (
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
                {...register("insuranceCompany", {
                  required: "Insurance company is required",
                })}
                className={`p-3  custom-border-light ${
                  errors.insuranceCompany ? "is-invalid" : ""
                }`}
              />
              {errors.insuranceCompany && (
                <div className="invalid-feedback">
                  {errors.insuranceCompany.message}
                </div>
              )}
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
                {...register("insuranceNumber", {
                  required: "Insurance number is required",
                  min: 5,
                })}
                className={`p-3 remove-input custom-border-light ${
                  errors.insuranceNumber ? "is-invalid" : ""
                }`}
              />
              {errors.insuranceNumber && (
                <div className="invalid-feedback">
                  {errors.insuranceNumber.message}
                </div>
              )}
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
                min={moment(minDate).format("YYYY-MM-DD")}
                {...register("insuranceExpiry", {
                  required: "Insurance expiry date is required",
                })}
                className={`p-3 isDate custom-border-light ${
                  errors.insuranceExpiry ? "is-invalid" : ""
                }`}
              />
              {errors.insuranceExpiry && (
                <div className="invalid-feedback">
                  {errors.insuranceExpiry.message}
                </div>
              )}
            </Form.Group>
          </div>
        )}
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="detail_btn w-100 align-self-end ">
          Pay From Card
        </button>
      </div>
    </Form>
  )
}
