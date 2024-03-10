import React, { useState } from "react"
import Offcanvas from "react-bootstrap/Offcanvas"
import PaymentForm from "./PaymentForm"
import Checkout from "./Checkout"


interface SideBarProps {
  show: boolean
  onHide: () => void
  name: string
  placement: "start" | "end" | "top" | "bottom"

}

const SideBar: React.FC<SideBarProps> = ({ placement, show, onHide}) => {
    const [secondForm, setSecondForm] = useState(false);

 function handleSecondForm() {
    setSecondForm(true);
 }

  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement={placement}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          {!secondForm ? <PaymentForm handleSecondForm={handleSecondForm} /> : <Checkout/>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default SideBar
