import doctor_img from "../assets/images/doctor.svg"
import { useNavigate } from "react-router-dom"
const Checkout = () => {
  const navigate = useNavigate()
  function handleClick() {
    const age = localStorage.getItem("age")
       
    if (age && Number(age) <= 11) {
      navigate("/child-intake")
    } else {
      console.log("age is greater than 11")
    }
  }
  return (
    <div style={{ padding: "0px 20px" }}>
      <h4 className="h4_child">Payment Method</h4>
      <div
        className="d-flex align-items-center"
        style={{ marginBottom: "20px" }}
      >
        <div className="doctor_img" style={{ marginRight: "20px" }}>
          <img src={doctor_img} alt="doctor" />
        </div>
        <div className="info_container">
          <p className="doctor_name">Dr. Bessie Cooper</p>
          <p className="doctor_designation">Psychiatrist</p>
        </div>
      </div>
      <div className="checkout_card">
        <p className="doctor_name">Appointment Details</p>
        <hr className="form_separator" style={{ marginTop: "10px" }} />
        <div className="d-flex justify-content-between">
          <div>
            <p style={{ fontWeight: "500" }}>Date</p>
            <span className="light_text">Jan,1,2022</span>
          </div>
          <div>
            <p style={{ fontWeight: "500" }}>Date</p>
            <span className="light_text">Jan,1,2022</span>
          </div>
          <div>
            <p style={{ fontWeight: "500" }}>Date</p>
            <span className="light_text">Jan,1,2022</span>
          </div>
        </div>
      </div>
      <div className="checkout_card" style={{ marginTop: "10px" }}>
        <p className="doctor_name">Insurance Details</p>
        <hr className="form_separator" style={{ marginTop: "10px" }} />
        <div className="d-flex justify-content-between flex-wrap-reverse">
          <div>
            <p style={{ fontWeight: "500" }}>Insurance Company</p>
            <span className="light_text">State Farm Group</span>
          </div>
          <div>
            <p style={{ fontWeight: "500" }}>Insurance Number</p>
            <span className="light_text">01234567890</span>
          </div>
          <div>
            <p style={{ fontWeight: "500" }}>Expiry Date</p>
            <span className="light_text">Jan,1,2022</span>
          </div>
        </div>
      </div>
      <div className="checkout_card" style={{ marginTop: "60px" }}>
        <div className="d-flex justify-content-between">
          <span className="light_text">State Farm Group</span>
          <p style={{ fontWeight: "500" }}>$250</p>
        </div>
        <div className="d-flex justify-content-between">
          <span className="light_text">Tax</span>
          <p style={{ fontWeight: "500" }}>$10</p>
        </div>
        <hr className="form_separator" style={{ margin: "10px 0px" }} />
        <div className="d-flex justify-content-between">
          <span className="light_text">Total Amount</span>
          <p style={{ fontWeight: "500" }}>$260</p>
        </div>
      </div>
      <button className="form_submit_btn" onClick={handleClick}>Pay Now</button>
    </div>
  )
}

export default Checkout
