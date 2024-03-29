import doc_img from "../../assets/images/Doctor_detail.svg";
import call from "../../assets/icons/call.svg";
import location from "../../assets/icons/loc.svg";
import Certificate from "../../assets/images/certificate.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../configs/config";
import { toast, ToastContainer } from "react-toastify";
import Header from "../PatientDashboard/Header/Header";
import { Col, Row, Container } from "react-bootstrap";
import {
  date_formatted,
  formatted_Date,
  change_time_format,
} from "../../global_func";
import { useSelector } from "react-redux";
import { getToken } from "../../utils";

function ScheduleByDoctorDetails() {
  const reduxcurrent_doctor_details = useSelector(
    (state: any) => state.patient.current_doctor_details
  );
  // JSON.parse(localStorage.getItem("current_doctor_details"))
  const [current_doctor_details, setcurrent_doctor_details] = useState(
    reduxcurrent_doctor_details
  );
  const [doctor_complete_details, setdoctor_complete_details] = useState({
    doctor_details: { appointment_fees: 232 },
    professional_experience: {
      description: "",
      specialities: "",
      city: "",
      clinic_address: "",
      clinic_experience: "",
      clinic_name: "",
      country: "",
      state: "",
      zip_code: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const getDoctorCompleteProfileRes = await axios.get(
          `${config.base_url}/doctor/get_doctor_complete_profile/${current_doctor_details.doctor_id}/${current_doctor_details.uid}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
            },
          }
        );
        console.log(
          "getDoctorCompleteProfileRes",
          getDoctorCompleteProfileRes?.data?.data
        );
        if (getDoctorCompleteProfileRes?.data?.data?.length > 0) {
          setdoctor_complete_details(
            getDoctorCompleteProfileRes?.data?.data[0]
          );
        }
      } catch (e) {
        console.log("error in /doctor-details", e.message);
      }
    })();
  }, []);

  return (
    <Header>
      <div className="doctor_detail_container">
        <div className="detail_header d-flex ">
          <img src={doc_img} alt="" className="doc_detail_img" />
          <div className="header_2nd">
            <div className="header_section_1">
              <div>
                <h4 className="h4_child" style={{ marginBottom: "0px" }}>
                  {/* Richard Muldoone */}
                  {current_doctor_details.name}
                </h4>
                <span>
                  Speciality :{" "}
                  {
                    doctor_complete_details?.professional_experience
                      ?.specialities
                  }{" "}
                </span>
                {/* <span>Speciality : {JSON.parse(sessionStorage.getItem('currentDoctorDetails')).designation} </span> */}
              </div>
              <button
                className="detail_btn"
                // onClick={handleShowOffCanvas}
                // onClick={bookAppointment}
                // disabled = {appointmentDisable}
                onClick={() => {
                  navigate("/set-schedule");
                }}
              >
                Schedule Appointment
              </button>
            </div>
            <div style={{ paddingLeft: "50px" }}>
              <hr className="form_separator" />
            </div>
            <div className="header_section_2">
              <div className="header_card">
                {/* <p className="b_text">$250</p> */}
                <p className="b_text">
                  $
                  {doctor_complete_details?.doctor_details?.appointment_fees
                    ? doctor_complete_details?.doctor_details?.appointment_fees
                    : "Not Set Yet"}
                </p>
                <span className="n_text">Appointment Fee</span>
              </div>
              <div className="header_card">
                {/* <p className="b_text">10+</p> */}
                <p className="b_text">
                  {doctor_complete_details?.professional_experience?.clinic_experience.replace(
                    " years",
                    ""
                  )}
                  +
                </p>
                {/* <p className="b_text">
                  {clinic_experience.replace(" years", "")}+
                </p> */}
                <span className="n_text">Year Experience</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="form_separator" />
        <div className="detail_about">
          <h4 className="box_heading">About Clinician</h4>
          {/* <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting.
          </p> */}
          <p>{doctor_complete_details?.professional_experience?.description}</p>
        </div>

        <hr className="form_separator" />
        <Container fluid className="d-flex flex-column">
          <Row>
            <Col xs={12}>
              <h4 className="fs-4">Clinic Schedule</h4>
            </Col>
          </Row>
          <Row
            className="box_heading py-2 rounded-top"
            style={{ backgroundColor: "#d3d8db" }}
          >
            <Col xs={4}>Day</Col>
            <Col xs={4}>Start Time</Col>
            <Col xs={4}>End Time</Col>
          </Row>
          {current_doctor_details?.clinic_schedule?.length != 0 ? (
            current_doctor_details?.clinic_schedule?.map(
              (item: any, index: any) => {
                let { day, start_time, end_time } = item;
                return (
                  <Row key={index}>
                    <Col xs={4}>{day}</Col>
                    {/* <Col xs={4}>{start_time}</Col> */}
                    <Col xs={4}>{change_time_format(start_time)}</Col>
                    <Col xs={4}>{change_time_format(end_time)}</Col>
                    {/* <Col xs={4}>{end_time}</Col> */}
                  </Row>
                );
              }
            )
          ) : (
            <Row>
              <Col xs={12} className="text-center">
                No clinician Availability Found
              </Col>
            </Row>
          )}
        </Container>
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
                {/* <span className="light_text">+0123456789</span> */}
                <span className="light_text">
                  {current_doctor_details?.phone}
                </span>
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
                {/* <p style={{ fontWeight: "500" }}>Lotus Medical Center</p> */}
                <p style={{ fontWeight: "500" }}>
                  {
                    doctor_complete_details?.professional_experience
                      ?.clinic_name
                  }
                </p>
                {/* <span className="light_text">
                  4517 Washington Ave. Manchester, Kentucky 39495
                </span> */}
                <span className="light_text">
                  {doctor_complete_details?.professional_experience
                    ?.clinic_address +
                    " " +
                    doctor_complete_details?.professional_experience?.city +
                    " " +
                    doctor_complete_details?.professional_experience?.state +
                    " " +
                    doctor_complete_details?.professional_experience?.zip_code +
                    " " +
                    doctor_complete_details?.professional_experience?.country}
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="form_separator" />

        <div className="detail_certificate">
          <p className="box_heading">Certificates</p>
          <div className="certificate_box">
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
            <img src={Certificate} alt="" className="cer_img" />
          </div>
        </div>
      </div>

      <ToastContainer />
    </Header>
  );
}

export default ScheduleByDoctorDetails;
