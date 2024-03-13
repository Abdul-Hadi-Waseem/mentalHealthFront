import doc_img from "../assets/images/Doctor_detail.svg"
import call from "../assets/icons/call.svg"
import location from "../assets/icons/loc.svg"
// import Certificate from "../assets/images/certificate.png"
// import { useNavigate } from "react-router-dom"
import SideBar from "./SideBar"
import { useEffect, useState } from "react"
// import axios from "axios"
import config from "../configs/config"
import { ToastContainer } from "react-toastify"
// import { getToken } from "../utils"
import StripeContainer from "./AppointmentByDoc/StripeContainer"
// import { useSelector } from "react-redux"

const Doctordetail = () => {
  // const navigate = useNavigate()
  const [showOffCanvas, setShowOffCanvas] = useState(false)
  const [doctorDetails, setDoctorDetails] = useState(
    JSON.parse(sessionStorage.getItem("currentDoctorDetails"))
  )
  // const reduxcurrent_doctor_details = useSelector(
  //   (state: any) => state.patient.current_doctor_details
  // )
  // const [appointmentDetails, setAppointmentDetails] = useState({})

  // const [appointmentDisable, setAppointmentDisable] = useState(false)

  const handleCloseOffCanvas = () => setShowOffCanvas(false)
  // const handleShowOffCanvas = () => setShowOffCanvas(true)

  // const {
  //   appointment_fees,
  //   city,
  //   clinic_address,
  //   clinic_experience,
  //   clinic_name,
  //   country,
  //   created_date,
  //   day,
  //   description,
  //   doctor_id,
  //   end_time,
  //   name,
  //   specialities,
  //   start_time,
  //   state,
  //   uid,
  //   updated_date,
  //   zip_code,
  //   phone,
  //   certificates,
  // } = doctorDetails
  const patient_uid = JSON.parse(localStorage.getItem("user_information")).uid
  // console.log(JSON.parse(localStorage.getItem("user_information")))
  // const dataToSend = {
  //   appointment_date: JSON.parse(localStorage.getItem("appointment_date")),
  //   patient: JSON.parse(localStorage.getItem("user_information")),
  //   doctor_details: JSON.parse(sessionStorage.getItem("currentDoctorDetails")),
  // }

  // const bookAppointment = async () => {
  //   setAppointmentDisable(true)
  //   try {
  //     const res = await axios.post(
  //       `${config.base_url}/patient/create_appointment`,
  //       {
  //         data: dataToSend,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
  //         },
  //       }
  //     )
  //     toast.success("Appointment Successfully created")
  //     setTimeout(() => {
  //       navigate("/patient-dashboard") // Navigate after 5 seconds
  //     }, 2000)

  //     console.log("res", res.data)
  //   } catch (error) {
  //     console.log("error", error)
  //   }
  // }
  useEffect(() => {
    const doctorProfile = JSON.parse(
      sessionStorage.getItem("currentDoctorDetails")
    )
    setDoctorDetails(doctorProfile)
  }, [])

  return (
    doctorDetails && (
      <>
        <div>
          <div>
            <img src={doc_img} alt="" className="doc_detail_img" />
            <div className="header_2nd">
              <div className="header_section_1">
                <div>
                  <h4 className="h4_child" style={{ marginBottom: "0px" }}>
                    {doctorDetails?.name}
                  </h4>
                  <span>
                    Speciality :{" "}
                    {/* {doctorDetails?.specialities?.length > 1
                      ? doctorDetails?.specialities?.join(", ")
                      : doctorDetails?.specialities} */}
                    {doctorDetails?.specialities}
                  </span>
                  <p>{patient_uid}</p>
                  <p>{doctorDetails?.uid}</p>
                </div>
                {/* <button
                  className="detail_btn"
                  onClick={bookAppointment}
                  disabled={appointmentDisable}
                >
                  Book Appointment
                </button> */}
                <StripeContainer doctorDetails={doctorDetails} />
              </div>
              <div style={{ paddingLeft: "50px" }}>
                <hr className="form_separator" />
              </div>
              <div className="header_section_2">
                <div className="header_card">
                  <p className="b_text">
                    $
                    {doctorDetails?.appointment_fees
                      ? doctorDetails?.appointment_fees
                      : 10}
                  </p>
                  <span className="n_text">Appointment Fee</span>
                </div>
                <div className="header_card">
                  <p className="b_text">
                    {doctorDetails?.clinic_experience.replace(" years", "")}+
                  </p>
                  <span className="n_text">Year Experience</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="form_separator" />
          <div className="detail_about">
            <h4 className="box_heading">About clinician</h4>
            <p>{doctorDetails?.description}</p>
          </div>
          <hr className="form_separator" />
          <div className="detail_info">
            <div className="info_box">
              <p className="box_heading">Phone</p>
              <div
                className="d-flex align-items-center justify-content-center _hr"
                style={{ margin: "20px 0px" }}
              >
                <img src={call} alt="" className="info_img" />
                <div>
                  <p style={{ fontWeight: "500" }}>Contact Us</p>
                  <span className="light_text">{doctorDetails?.phone}</span>
                </div>
              </div>
            </div>
            <div className="info_box">
              <p className="box_heading">Location</p>
              <div
                className="d-flex align-items-center justify-content-center _hr"
                style={{ margin: "20px 0px" }}
              >
                <img src={location} alt="" className="info_img" />
                <div>
                  <p style={{ fontWeight: "500" }}>
                    {doctorDetails?.clinic_name}
                  </p>
                  <span className="light_text">
                    {doctorDetails?.clinic_address +
                      " " +
                      doctorDetails?.city +
                      " " +
                      doctorDetails?.state +
                      " " +
                      doctorDetails?.zip_code +
                      " " +
                      doctorDetails?.country}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className="form_separator" />
          <div className="detail_certificate">
            <p className="box_heading">Certificates</p>
            <div className="certificate_box">
              {doctorDetails?.certificates?.length > 0 ? (
                doctorDetails?.certificates.map((imageName, index) => {
                  const imageUrl = `${config.base_url}/certificates/${imageName}`
                  return (
                    <img
                      key={index}
                      src={imageUrl}
                      alt=""
                      className="cer_img"
                    />
                  )
                })
              ) : (
                <div className="d-flex justify-content-center py-2 w-100">
                  No certificate found
                </div>
              )}
            </div>
          </div>
        </div>
        <SideBar
          placement={"end"}
          name={"end"}
          show={showOffCanvas}
          onHide={handleCloseOffCanvas}
        />
        <ToastContainer />
      </>
    )
  )
}

export default Doctordetail
