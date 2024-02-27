import doc_img from "../assets/images/Doctor_detail.svg";
import call from "../assets/icons/call.svg";
import location from "../assets/icons/loc.svg";
import Certificate from "../assets/images/certificate.png";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../configs/config";
import { toast, ToastContainer } from "react-toastify";
import { getToken } from "../utils";
import { useSelector } from "react-redux";

const Doctordetail = () => {
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(
    JSON.parse(sessionStorage.getItem("currentDoctorDetails"))
  );
  const reduxcurrent_doctor_details = useSelector(
    (state: any) => state.patient.current_doctor_details
  );
  const [appointmentDetails, setAppointmentDetails] = useState({});

  const [appointmentDisable, setAppointmentDisable] = useState(false);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);
  useEffect(() => {
    const doctorProfile = JSON.parse(
      sessionStorage.getItem("currentDoctorDetails")
    );

    console.log("doctor", doctorProfile);
    setDoctorDetails(doctorProfile);
  }, []);

  const {
    appointment_fees,
    city,
    clinic_address,
    clinic_experience,
    clinic_name,
    country,
    created_date,
    day,
    description,
    doctor_id,
    end_time,
    name,
    specialities,
    start_time,
    state,
    uid,
    updated_date,
    zip_code,
    phone,
    certificates,
  } = doctorDetails;
  const dataToSend = {
    appointment_date: JSON.parse(localStorage.getItem("appointment_date")),
    patient: JSON.parse(localStorage.getItem("user_information")),
    doctor_details: JSON.parse(sessionStorage.getItem("currentDoctorDetails")),
  };

  const bookAppointment = async () => {
    setAppointmentDisable(true);

    try {    
      const res = await axios.post(
        `${config.base_url}/patient/create_appointment`,
        {
          data: dataToSend,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
          },
        }
      );
      toast.success("Appointment Successfully created");
      setTimeout(() => {
        navigate("/patient-dashboard"); // Navigate after 5 seconds
      }, 2000);

      console.log("res", res.data);
    } catch (error) {
      console.log("error", error);
    }

    // useEffect(() => {
    //   (async () => {
    //     try {
    //       const res = await axios.post(
    //         `${config.base_url}/doctor/get_doctors_for_appointment`,
    //         {
    //           data,
    //         },
    // {
    //   headers: {
    //     'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
    //   }
    // }
    //       );
    //       // console.log("res", res.data.data[0]);
    //       setdoctorProfiles(res.data.data);
    //       setLoader(!loader);
    //     } catch (error) {
    //       console.log("error", error);
    //     }
    //   })();
    // }, []);
  };

  return (
    <>
      <div>
        <div>
          <img src={doc_img} alt="" className="doc_detail_img" />
          <div className="header_2nd">
            <div className="header_section_1">
              <div>
                <h4 className="h4_child" style={{ marginBottom: "0px" }}>
                  {name}
                </h4>
                <span>Speciality : {specialities} </span>
              </div>
              <button
                className="detail_btn"
                onClick={bookAppointment}
                disabled={appointmentDisable}
              >
                Book Appointment
              </button>
            </div>
            <div style={{ paddingLeft: "50px" }}>
              <hr className="form_separator" />
            </div>
            <div className="header_section_2">
              <div className="header_card">
                <p className="b_text">${appointment_fees}</p>
                <span className="n_text">Appointment Fee</span>
              </div>
              <div className="header_card">
                <p className="b_text">
                  {clinic_experience.replace(" years", "")}+
                </p>
                <span className="n_text">Year Experience</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="form_separator" />
        <div className="detail_about">
          {/* <h4 className="box_heading">About Doctor</h4> */}
          <h4 className="box_heading">About clinician</h4>
          <p>{description}</p>
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
                <span className="light_text">{phone}</span>
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
                <p style={{ fontWeight: "500" }}>{clinic_name}</p>
                <span className="light_text">
                  {clinic_address +
                    " " +
                    city +
                    " " +
                    state +
                    " " +
                    zip_code +
                    " " +
                    country}
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="form_separator" />
        <div className="detail_certificate">
          <p className="box_heading">Certificates</p>
          <div className="certificate_box">
            {certificates?.length > 0 ? (
              certificates.map((imageName, index) => {
                const imageUrl = `${config.base_url}/certificates/${imageName}`;
                return <img src={imageUrl} alt="" className="cer_img" />;
              })
            ) : (
              <div className="d-flex justify-content-center py-2 w-100">
                No certificate found
              </div>
            )}

            {/* <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" /> */}
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
  );
};

export default Doctordetail;
