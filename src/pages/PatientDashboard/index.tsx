import { useEffect, useState, useRef } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { appRoutes } from "./../../constants/constants";
import Header from "./Header/Header";
import { Container, Row, Col, Modal } from "react-bootstrap";
import d_db_male from "../../assets/images/d_db_male.png";
import doctor_img from "../../assets/images/doctor.svg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import UserCard from "../../components/Common/UserCard";
import "./dashboard.css";
import DoctorSideBar from "../../components/DoctorSideBar";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "./../../configs/config";
import { getToken } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserInformation } from "./../../store/slices/UserSlice";

function PatientDashBoard() {
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const [currentUserInformation, setCurrentUserInformation] = useState(
    JSON.parse(localStorage.getItem("user_complete_information"))
  );
  const [doctorsProfile, setDoctorsProfile] = useState([]);
  const [patientHealthDetail ,setPatientHealthDetail] = useState(null)
  // const [doctorsProfile, setDoctorsProfile] = useState([
  //   {
  //     name: "Dr. Bessie Copper",
  //   },
  //   {
  //     name: "Dr. Arlene McCoy",
  //   },
  //   {
  //     name: "Dr. Darlena Roberston",
  //   },
  //   {
  //     name: "Dr. Bessie Copper",
  //   },
  // ]);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [pscQuestions, setPscQuestion] = useState([]);
  const [pscCurrentQuestions, setPscCurrentQuestions] = useState(null);
  const [currentQuestionIndex, SetCurrentQuestionIndex] = useState(0);

  const elementRef = useRef(null);
  const navigate = useNavigate();

  const handleHorizantalScroll = (element, speed, distance, step) => {
    element.scrollLeft += step;
    setscrollX(scrollX + step);
    console.log("scroll", element.scrollLeft);

    //For checking if the scroll has ended
    if (
      Math.floor(
        elementRef.current.scrollWidth - elementRef.current.scrollLeft
      ) <= elementRef.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const patientHealthScore = async ()=> {
     try {
      let response = await axios.get(
        `${config.base_url}/patient/get_patient_health_score/${
          JSON.parse(localStorage.getItem("user_complete_information")).uid
        }`
        );
        console.log( "response?.data?.data" , response?.data?.data)
        setPatientHealthDetail(response?.data?.data)
     } catch (error) {
       console.log(error);
     }
  }
  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );
  console.log("reduxUserState" , reduxUserState?.psc_test_result);
  //This will check scroll event and checks for scroll end
  const scrollCheck = () => {
    setscrollX(elementRef.current.scrollLeft);
    if (
      Math.floor(
        elementRef.current.scrollWidth - elementRef.current.scrollLeft
      ) <= elementRef.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await patientHealthScore();
        // const response = await axios.get(`${config.base_url}/patient/get_patient_upcoming_appointment/11`)
        // const response = await axios.get(
        //   `${config.base_url}/patient/get_patient_upcoming_appointment/${currentUserInformation.id}`
        // );
        const res = await axios.get(
          `${config.base_url}/doctor/get_all_doctors`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
            },
          }
        );
        console.log("get_all_doctors_response", res.data.data);
        if (res?.data?.data) {
          setDoctorsProfile(res?.data?.data);
          // setDoctorProfiles([{name: "fayyaz", treat: "anxiety"}]);
          setLoader(false);
        }
      } catch (error) {
        console.log("get_patient_upcoming_appointment", error.message);
      }
    })();
  }, []);
  const showPSCQuestion = async () => {
    console.log("first")
    try {
      let response = await axios.get(
        `${config.base_url}/patient/get_patient_psc_question/${
          JSON.parse(localStorage.getItem("user_complete_information")).uid
        }`
      );
      console.log("response", response?.data.data);
      setPscQuestion(response?.data.data);
      setPscCurrentQuestions(JSON.parse(response?.data.data[0]));
      setShow(true);
    } catch (error) {
      // toast.error(error)
      console.log(error);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setPscCurrentQuestions(null);
      setPscCurrentQuestions(
        JSON.parse(pscQuestions[currentQuestionIndex - 1])
      );
      SetCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentQuestionIndex < pscQuestions.length - 1) {
      setPscCurrentQuestions(null);
      setPscCurrentQuestions(
        JSON.parse(pscQuestions[currentQuestionIndex + 1])
      );
      SetCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleClose = () => {
    SetCurrentQuestionIndex(0);
    setShow(false);
  };

  return (
    <>
      <Header>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>PSC QUESTION</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ padding: "2px" }}>
              <div key={pscCurrentQuestions?.question}>
                Q : {pscCurrentQuestions?.question}
              </div>
              <div key={pscCurrentQuestions?.answer}>
                A : {pscCurrentQuestions?.answer}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {currentQuestionIndex !== 0 && (
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
            )}
            {currentQuestionIndex !== pscQuestions.length - 1 && (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Container>
          <Row className="d-flex flex-row flex-nowrap">
            <Col
              className="d-flex flex-column justify-content-start py-5"
              xs={12}
              md={6}
            >
              <p className="text-muted py-2">Good Morning</p>
              {/* <h4>Welcome Dr. Bessie Cooper</h4> */}
              <h4 className="text-capitalize">
                Welcome {currentUserInformation.name}
              </h4>
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
          <Row className="d-flex justify-content-between">
            <Col xs={12} xl={4} className="pe-md-3 ">
              <div className="single_doctor_card chats-section-heading">
                <div className="doctor_img">
                  <img src={doctor_img} alt="doctor" />
                </div>
                <div className="info_container">
                  {/* <p className="doctor_name">Dr. Bessie Cooper</p> */}
                  {/* <p className="single_doctor_card_name">Dr Bessie Copper</p> */}
                  <p className="single_doctor_card_name">
                    Mr &nbsp;
                    {reduxUserState?.name}
                  </p>

                  {/* <p className="single_doctor_card_designation">Psychiatrist</p> */}
                  {/* <p className="single_doctor_card_designation">
                    {reduxUserState?.psc_test_result?.condition.replace(
                      /[()]/g,
                      ""
                    )}
                  </p> */}
                </div>
                <hr className="form_separator" style={{ margin: "10px 0px" }} />
                <button
                  className="single_doctor_card_btn text-center"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  {" "}
                  View Profile{" "}
                </button>
              </div>
            </Col>
            <Col xs={12} xl={8} className="ps-md-3 ">
              <div
                className="d-flex  mt-sm-4 m-xl-0  w-100 h-100 justify-content-between px-2 align-items-end  upcomming-appointments"
                style={{ borderRadius: "12px" }}
              >
                <div className="text-light ps-5">
                  <h3
                    onClick={showPSCQuestion}
                    style={{ fontSize: "34px" , cursor: 'pointer' }}
                    className="text-light mb-2"
                  >
                    PSC Test
                  </h3>
                  {/* <p className="text-light">Score 5-9</p> */}
                  <p className="text-light">
                    Score &nbsp; {patientHealthDetail?.score}
                  </p>
                  {/* <p className="text-light mb-4">Mild Anxiety</p> */}
                  <p className="text-light mb-4">
                    {patientHealthDetail?.condition?.replace(
                      /[()]/g,
                      ""
                    )}
                  </p>
                </div>
                <div className="pe-4">
                  <img src={d_db_male} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          {/* PATIENT HISTORY ROW */}
          <Row
            className=" border mt-5 pt-4 mb-5"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              marginRight: "0px",
              marginLeft: "0px",
            }}
          >
            <Col xs={12}>
              <Row
                className="ps-2 pe-3"
                style={{
                  borderRadius: "12px",
                }}
              >
                <Col
                  className="d-flex justify-content-between align-items-end"
                  style={{ color: "#3874AB" }}
                  xs={12}
                >
                  <div>
                    <p>
                      {/* <strong>Patients History</strong> */}
                      <strong>All Doctors</strong>
                    </p>
                    <Link
                      style={{ cursor: "pointer", color: "#3874AB" }}
                      // to={"/patients-history"}
                      to={"/all-doctors"}
                    >
                      See All <FaArrowRight style={{ color: "#3874AB" }} />
                    </Link>
                  </div>
                  <div className="d-flex">
                    <span className="pe-2">
                      <button
                        className="border-0"
                        style={{ backgroundColor: "#fff", color: "#243D4C" }}
                        onClick={() => {
                          handleHorizantalScroll(
                            elementRef.current,
                            25,
                            100,
                            -300
                          );
                        }}
                        // disabled={arrowDisable }
                        disabled={scrollX == 0}
                      >
                        <FaArrowLeft />
                      </button>
                    </span>
                    <span className="ps-2">
                      <button
                        className="border-0"
                        style={{ backgroundColor: "#fff", color: "#243D4C" }}
                        disabled={scrolEnd}
                        onClick={() => {
                          handleHorizantalScroll(
                            elementRef.current,
                            25,
                            100,
                            300
                          );
                        }}
                      >
                        <FaArrowRight />
                      </button>
                    </span>
                  </div>
                </Col>
              </Row>
              <Row
                className={"d-flex flex-nowrap ps-2 pt-3 mb-4"}
                style={{
                  overflowX: "scroll",
                  scrollBehavior: "smooth",
                }}
                ref={elementRef}
                onScroll={scrollCheck}
              >
                {loader ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      height: "auto",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <Spinner
                      animation="border"
                      role="status"
                      style={{ color: "#5E9CD3" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : doctorsProfile.length == 0 ? (
                  <div className="d-flex  justify-content-center">
                    No Doctors found
                  </div>
                ) : (
                  doctorsProfile.map((item, index) => {
                    return (
                      <Col
                        key={item.name + index}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                        className="pe-2"
                      >
                        <UserCard
                          btnTitle="View Profile"
                          img={doctor_img}
                          handleUserProfile={() => {
                            localStorage.setItem(
                              "current_doctor_details",
                              JSON.stringify(item)
                            );
                            navigate("/doctor-details");
                            // navigate("/all-doctors");
                          }}
                          userDetails={{
                            name: item.name,
                            treat: "Doctor Details",
                          }}

                          // userDetails={{
                          //   name: "John Smith",
                          //   treat: "Mild Anxiety",
                          // }}
                        />
                      </Col>
                    );
                  })
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </Header>
    </>
  );
}

export default PatientDashBoard;
