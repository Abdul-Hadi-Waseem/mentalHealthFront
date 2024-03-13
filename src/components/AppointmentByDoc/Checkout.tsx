import moment from "moment"
import { useEffect, useState } from "react"

function Checkout({ setFormState, doctorDetails }) {
  const [appointmentDetail, setAppointmentDetail] = useState({
    day: "",
    end_time: "",
    selectDate: "",
    start_time: "",
  })

  useEffect(() => {
    const getAppointmentDetails = JSON.parse(
      localStorage.getItem("appointment_date")
    )
    setAppointmentDetail(getAppointmentDetails)
  }, [])

  const selectDate = moment(appointmentDetail.selectDate)
  const startTime = moment(appointmentDetail.start_time, "HH:mm:ss Z")
  const duration = moment.duration(
    moment(appointmentDetail.end_time, "HH:mm:ss Z").diff(startTime)
  )

  const formattedDate = selectDate.format("MMMM DD, YYYY")
  const formattedStartTime = startTime.format("HH:mm")
  const formattedDuration = duration.hours()

  // const insuranceExpiry = moment(
  //   insuranceInfo?.expiryDate,
  //   "HH:mm:ss Z"
  // ).format("MMMM DD, YYYY")
  return (
    <div className="h-100">
      <div
        style={{ padding: "0px 5px" }}
        className="h-100 d-flex flex-column justify-content-between"
      >
        <div
          className="d-flex align-items-center p-2"
          style={{ marginBottom: "5px" }}
        >
          <div className="doctor_img" style={{ marginRight: "20px" }}>
            <img src={"/avatar.png"} alt="doctor" />
          </div>
          <div className="info_container ">
            <p className="doctor_name">{doctorDetails?.name}</p>
            <p className="doctor_designation">{doctorDetails?.specialities}</p>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="checkout_card bg-custom p-4 rounded-2">
          <p className="doctor_name">Appointment Details</p>
          <hr className="form_separator" style={{ marginTop: "5px" }} />
          <div className="d-flex justify-content-between">
            <div>
              <p style={{ fontWeight: "500" }}>Date</p>
              <span className="light_text">{formattedDate}</span>
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Time</p>
              <span className="light_text">{formattedStartTime}</span>
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Duration</p>
              <span className="light_text">{formattedDuration} hour</span>
            </div>
          </div>
        </div>

        {/* Insurance Details */}
        {/* {insuranceInformation.insuranceCompany &&
          insuranceInformation.insuranceNumber &&
          insuranceInformation.expiryDate && (
            <div
              className="checkout_card bg-custom rounded-2 p-4"
              style={{ marginTop: "10px" }}
            >
              <p className="doctor_name">Insurance Details</p>
              <hr className="form_separator" style={{ marginTop: "5px" }} />
              <div>
                <div className="d-flex justify-content-between">
                  <div>
                    <p style={{ fontWeight: "500" }}>Insurance Company</p>
                    <span className="light_text">
                      {insuranceInformation?.insuranceCompany}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontWeight: "500" }}>Insurance Number</p>
                    <span className="light_text">
                      {insuranceInformation?.insuranceNumber}
                    </span>
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: "500" }}>Expiry Date</p>
                  <span className="light_text">{insuranceExpiry}</span>
                </div>
              </div>
            </div>
          )} */}

        {/* Total Amount */}
        {/* {insuranceInformation.insuranceCompany &&
          insuranceInformation.insuranceNumber &&
          insuranceInformation.expiryDate && (
            <div
              className="checkout_card bg-custom rounded-2 p-4"
              style={{ marginTop: "30px" }}
            >
              <div className="d-flex justify-content-between">
                <span className="light_text">
                  {insuranceInformation.insuranceCompany}
                </span>
                <p style={{ fontWeight: "500" }}>
                  $
                  {config?.tax_amount +
                    (doctorDetails?.appointment_fees
                      ? doctorDetails?.appointment_fees
                      : 10)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <span className="light_text">Tax</span>
                <p style={{ fontWeight: "500" }}>${config?.tax_amount}</p>
              </div>
              <hr className="form_separator" style={{ margin: "10px 0px" }} />
              <div className="d-flex justify-content-between">
                <span className="light_text">Total Amount</span>
                <p style={{ fontWeight: "500" }}>
                  ${doctorDetails?.appointment_fees ?? 10}
                </p>
              </div>
            </div>
          )} */}

        {/* Continue Button */}
        <div className="h-100 d-flex flex-column items-align-items-end justify-content-end">
          <button
            type="submit"
            onClick={setFormState}
            className="detail_btn align-self-end w-100 mt-3"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
