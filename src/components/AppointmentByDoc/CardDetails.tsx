// CardDetails.js
import React from "react"
import { CardElement } from "@stripe/react-stripe-js"
import { Col, Form, Row } from "react-bootstrap"
import moment from "moment"

const CardDetails = ({ formik, cardElementOptions, minDate }) => {
  return (
    <Form
      className="flex justify-content-between  flex-column ga h-100 "
      onSubmit={formik.handleSubmit}
    >
      <div className="d-flex flex-column gap-3">
        <p className="fw-bold mb-2">Card Details</p>
        <Row className="justify-content-md-center">
          <Col>
            <p className="fw-bold mb-2">Pay Via Card?</p>
          </Col>
          <Col xs lg="2">
            <Form.Check
              className=""
              onChange={(e) =>
                formik.setFieldValue("useCard", e.target.checked)
              }
              onBlur={formik.handleBlur}
              type="switch"
              id="custom-switch"
            />
          </Col>
        </Row>
        {formik.values.useCard && (
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
                name="cardHolderName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cardHolderName}
                className={`p-3  custom-border-light ${
                  formik.touched.cardHolderName && formik.errors.cardHolderName
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
          </>
        )}
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
                minLength={5}
                min={5}
                className={`p-3 remove-input custom-border-light ${
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
                // min={doctorDetails?.start_time.split("T")[0]}
                min={moment(minDate).format("YYYY-MM-DD")}
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
          className="detail_btn w-100 align-self-end "
        >
          Pay From Card
        </button>
      </div>
    </Form>
  )
}

export default CardDetails
