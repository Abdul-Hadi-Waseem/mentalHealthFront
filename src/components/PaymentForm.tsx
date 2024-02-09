import { useState}from 'react'
import Form from "react-bootstrap/Form"

import Input from "./Common/Input"
const PaymentForm = ({handleSecondForm} : any) => {
    const [isInsured, setIsInsured] = useState(false)

    const handleSwitchChange = () => {
      setIsInsured(!isInsured)
    }
  return (
    <>
      <h4 className="h4_child">Payment Method</h4>
      <p className="b_text">card details</p>
      <div style={{ marginTop: "10px" }}>
        <Input label="Card Holder Name" placeholder="John smith" />
        <Input label="Card Number" placeholder="0 123 *** *** ***" />
      </div>
      <div className="d-flex justify-content-between">
        <div className="side_w_input">
          <Input label="State" placeholder="State/Province" />
        </div>
        <div className="side_w_input">
          <Input label="Zip Code" placeholder="Zip/POBox Code" />
        </div>
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ margin: "10px 0px" }}
      >
        <p className="b_text">Is it Covered By Insured</p>
        <Form.Check
          type="switch"
          id="custom-switch"
          // label="Is it Covered By Insured"
          checked={isInsured}
          onChange={handleSwitchChange}
        />
      </div>

      {/* Render the last three fields conditionally based on the switch value */}
      {isInsured && (
        <>
          <Input label="Insurance Company" placeholder="ABC Company" />
          <Input label="Insurance Number" placeholder="0 123 456 789" />
          <Input
            label="Expiry Date"
            placeholder="12-12-23"
            className={"calendar_input"}
            />
        </>
      )}
      <button className="form_submit_btn" onClick={handleSecondForm}>
        Continue
      </button>
    </>
  )
}

export default PaymentForm
