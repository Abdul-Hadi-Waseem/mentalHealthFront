import React from "react";
import Header from "../PatientDashboard/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
// import doctor_img from "./../../assets/images/patient_details.png";
// import VisitsDocs from "./../../assets/images/patient_details.png";
// import VisitsDocs from "../../assets/images/VisitDocs.png";

import doctor_img from "../../assets/images/doctorsquare.png";
import VisitsDocs from "../../assets/images/VisitDocs.png";


import "./BackupPatientVisitsOsama.css";
// import doctor_img from "../../assets/images/doctor.svg";

function PatientVisitsBackup() {
  return (
    <>
      <Header>
        <Container>
          <Row className="d-flex flex-row flex-nowrap">
            <Col
              className="d-flex flex-column justify-content-start py-5"
              xs={12}
              md={6}
            >
              {/* <p className="text-muted py-2">Good Morning</p> */}
              {/* <h4>Welcome Dr. Bessie Cooper</h4> */}
              <h4 className="text-capitalize">My Visits</h4>
            </Col>
            <Col
              className="d-flex justify-content-end align-items-center"
              xs={12}
              md={6}
            >
              <button className="d-flex flex-column p-2 pm-green-btn border-0">
                <small className="text-xs text-light">
                  Upcoming Appointment
                </small>
                <small className="text-xs text-light">8:00 AM - 4:00 PM</small>
              </button>
            </Col>
          </Row>
        </Container>
        <Container>
          {/* PATIENT HISTORY ROW */}
          <Row
            className=" border pt-4 mb-1"
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
                    <h3 className="doctor-name">Richard Muldoone</h3>
                    <p>Speciality: Heart Surgen</p>
                  </Col>
                  <Col xs={12} md={3}>
                    <button className="viewProfile-btn">View Profile</button>
                  </Col>
                  <Col xs={12} md={12}>
                    <hr style={{ width: "100%" }} />
                  </Col>
                  <Col xs={12} md={12} className="doctor-about">
                    <h3>About Doctor</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eius dolore quia saepe deleniti. Reprehenderit ab, ad
                      cumque sint itaque distinctio impedit consequatur
                      voluptatibus. Molestias, aliquid provident expedita
                      consequuntur ea quia!
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
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <div className="visitCard">
                    <div className="visitDate">
                      <p>06,June 22</p>
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
                      // onClick={handleClick}
                    >
                      {" "}
                      View{" "}
                    </button>
                  </div>
                </Col>
              </Row>
            </Row>
          </Row>
        </Container>
      </Header>
    </>
  );
}

export default PatientVisitsBackup;
