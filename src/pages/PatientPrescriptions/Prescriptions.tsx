import React from "react";
import Header from "../PatientDashboard/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
// import doctor_img from "./../../assets/images/patient_details.png";
// import VisitsDocs from "./../../assets/images/patient_details.png";
// import VisitsDocs from "../../assets/images/VisitDocs.png";

import doctor_img from "../../assets/images/doctorsquare.png";
import VisitsDocs from "../../assets/images/VisitDocs.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BackupPatientVisitsOsama.css";
import { formatted_Date } from "../../global_func";
import ViewPrescriptionModal from "../../components/ViewPrescriptionModal";
import BackButton from "../../components/Common/Buttons/BackButton";

// import doctor_img from "../../assets/images/doctor.svg";

function Prescriptions() {
  const navigate = useNavigate();
  const [viewModal, setViewModal] = useState(false);

  const [current_doctor_prescriptions, set_current_doctor_prescription] =
    useState<any>();
  const [currentPrescription, setCurrentPrescription] = useState<any>();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("current_doctor_prescriptions"));
    set_current_doctor_prescription(data);
    let { prescription, ...res } = data;
    let { prescription_id, ...remaining } = prescription[0];
    let id = prescription_id;
    setCurrentPrescription({ ...remaining, ...res, id });
  }, []);
console.log("currentPrescription",currentPrescription)
  return (
    <>
      <Container>
        {/* PATIENT HISTORY ROW */}
        <Row
          className="flex flex-wrap justify-content-start w-100 border pt-4 mb-1"
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            marginRight: "0px",
            marginLeft: "0px",
          }}
        >
          <Row>
            <Col xs={12} md={3}>
              {" "}
              <div className="px-3">
                <img src={doctor_img} alt="doctor" />
              </div>
            </Col>
            <Col xs={12} md={9}>
              <Row className="mx-2">
                <Col xs={12} md={9}>
                  {/* <h3 className="doctor-name">Richard Muldoone</h3> */}
                  <h3 className="doctor-name">{current_doctor_prescriptions?.name}</h3>
                  <p>Speciality: Heart Surgen</p>
                </Col>
                <Col xs={12} md={3}>
                  {/* <button
                    onClick={() => {
                      // navigate("p")
                    }}
                    className="viewProfile-btn"
                  >
                    View Profile
                  </button> */}
                </Col>
                <Col xs={12} md={12}>
                  <hr style={{ width: "100%" }} />
                </Col>
                <Col xs={12} md={12} className="doctor-about">
                  <h3>About Clinician</h3>
                  <p>
                    {currentPrescription?.description}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <hr style={{ width: "100%" }} />
            </Col>
            <Col xs={12} md={12}>
              <h6>Visits</h6>
            </Col>
            <Row className="m-3">
              {current_doctor_prescriptions ? (
                <>
                  <ViewPrescriptionModal
                    show={viewModal}
                    onHide={() => setViewModal(false)}
                    currentprescription={currentPrescription}
                    view = "patient"
                    showprescriptionmodal={() => {
                      setViewModal(true);
                    }}
                  />
                  {current_doctor_prescriptions?.prescription.map(
                    (item: any, index: number) => {
                      return (
                        <Col
                        key={"iten"+index.toString()}
                        xs={12} md={3}>
                          <div className="visitCard">
                            <div className="visitDate">
                              {/* <p>06,June 22</p> */}
                              <p>{formatted_Date(item.updated_date)}</p>
                            </div>
                            <div className="visitCardImg">
                              <img src={VisitsDocs} alt="doctor" />
                            </div>
                            <div className="visitCardInfo">
                              {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
                              <h6>Clinical FeedBack</h6>
                              <p className="">02 attachment files</p>
                            </div>
                            <hr
                              className="form_separator"
                              style={{ margin: "10px 0px" }}
                            />
                            <button
                              className="visitCardInfo_btn text-center"
                              onClick={() => {
                                let { prescription, ...res } =
                                  current_doctor_prescriptions;
                                let { prescription_id, ...remaining } = item;
                                let id = prescription_id;
                                setCurrentPrescription({
                                  ...remaining,
                                  ...res,
                                  id,
                                });

                                setCurrentPrescription(item);
                                setViewModal(true);
                              }}
                            >
                              {" "}
                              View{" "}
                            </button>
                          </div>
                        </Col>
                      );
                    }
                  )}
                </>
              ) : (
                <Col xs={12} className="d-flex justify-content-center">
                  <div>No Data Found</div>
                </Col>
              )}
            </Row>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Prescriptions;

// <Container>
// <Row className="d-flex flex-row flex-nowrap">
//   <Col
//     className="d-flex flex-column justify-content-start py-5"
//     xs={12}
//     md={6}
//   >
//     {/* <p className="text-muted py-2">Good Morning</p> */}
//     {/* <h4>Welcome Dr. Bessie Cooper</h4> */}
//     <h4 className="text-capitalize">Prescriptions</h4>
//   </Col>
//   <Col
//     className="d-flex justify-content-end align-items-center"
//     xs={12}
//     md={6}
//   >
//     <button className="d-flex flex-column p-2 pm-green-btn border-0">
//       <small className="text-xs text-light">
//         Upcoming Appointment
//       </small>
//       <small className="text-xs text-light">8:00 AM - 4:00 PM</small>
//     </button>
//   </Col>
// </Row>
// </Container>

// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
// <Col xs={12} md={3}>
// <div className="visitCard">
//   <div className="visitDate">
//     <p>06,June 22</p>
//   </div>
//   <div className="visitCardImg">
//     <img src={VisitsDocs} alt="doctor" />
//   </div>
//   <div className="visitCardInfo">
//     {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
//     <h6>Clinical FeedBack</h6>
//     <p className="">02 attachment files</p>
//   </div>
//   <hr
//     className="form_separator"
//     style={{ margin: "10px 0px" }}
//   />
//   <button
//     className="visitCardInfo_btn text-center"
//     // onClick={handleClick}
//   >
//     {" "}
//     View{" "}
//   </button>
// </div>
// </Col>
