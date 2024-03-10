// import { Dispatch, SetStateAction } from "react"

function Checkout({ handlePopup }: { handlePopup: () => void }) {
  return (
    <div className="">
      {" "}
      <div style={{ padding: "0px 5px" }}>
        <div
          className="d-flex align-items-center p-2"
          style={{ marginBottom: "5px" }}
        >
          <div className="doctor_img" style={{ marginRight: "20px" }}>
            <img src={"/avatar.png"} alt="doctor" />
          </div>
          <div className="info_container">
            <p className="doctor_name">Dr. Bessie Cooper</p>
            <p className="doctor_designation">Psychiatrist</p>
          </div>
        </div>
        <div className="checkout_card bg-custom p-4 rounded-2  ">
          <p className="doctor_name">Appointment Details</p>
          <hr className="form_separator" style={{ marginTop: "5px" }} />
          <div className="d-flex justify-content-between">
            <div>
              <p style={{ fontWeight: "500" }}>Date</p>
              <span className="light_text">Jan,1,2022</span>
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Time</p>
              <span className="light_text">12:00pm</span>
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Duration</p>
              <span className="light_text">01 hour</span>
            </div>
          </div>
        </div>
        <div
          className="checkout_card bg-custom rounded-2  p-4"
          style={{ marginTop: "10px" }}
        >
          <p className="doctor_name">Insurance Details</p>
          <hr className="form_separator" style={{ marginTop: "5px" }} />
          <div>
            <div className="d-flex justify-content-between ">
              <div>
                <p style={{ fontWeight: "500" }}>Insurance Company</p>
                <span className="light_text">State Farm Group</span>
              </div>

              <div>
                <p style={{ fontWeight: "500" }}>Insurance Number</p>
                <span className="light_text">01234567890</span>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Expiry Date</p>
              <span className="light_text">Jan,1,2022</span>
            </div>
          </div>
        </div>
        <div
          className="checkout_card bg-custom rounded-2  p-4"
          style={{ marginTop: "30px" }}
        >
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
            <span className="light_text ">Total Amount</span>
            <p style={{ fontWeight: "500" }}>$260</p>
          </div>
        </div>
        <button
          type="submit"
          //   disabled={formik.isSubmitting}
          // onClick={onSubmitHandler}
          onClick={handlePopup}
          className="btn btn-primary align-self-end py-3 w-100  mt-3"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default Checkout
