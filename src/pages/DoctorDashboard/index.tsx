import { useEffect, useState, useRef } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { appRoutes } from "./../../constants/constants";
import Header from "./Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
// import "./Header.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import logo from "../../assets/images/logo.svg";
import d_db_female from "../../assets/images/d_db_female.png";
import d_db_male from "../../assets/images/d_db_male.png";
import doctor_img from "../../assets/images/doctor.svg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// // import Button from "../Common/Buttons/Button";
// import Button from "./../../components/Common/Buttons/Button";
// import Cookies from "js-cookie";
// import { getToken } from "./../../utils";
// FaArrowRight
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import UserCard from "../../components/Common/UserCard";
import "./dashboard.css";
import DoctorSideBar from "../../components/DoctorSideBar";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "./../../configs/config";
import { getToken } from "../../utils";

function DoctorDashBoard() {
  // const token = getToken();
  // const [btnTitle, setBtnTitle] = useState("Login / Register");
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  // console.log("userprofiles", userProfiles)


  

  const [currentUserDetails, setCurrentUserDetails] = useState<any>({});
  console.log("currentUser", currentUserDetails);
  const doctor_information = JSON.parse(
    localStorage.getItem("doctor_information")
  );
  const [loader, setLoader] = useState(true);
  const { name, uid } = doctor_information;
  useEffect(() => {
    try {
      const getAllPatients = async () => {
        const res = await axios.get(
          `${config.base_url}/doctor/doctors_all_appointments/${name}/${uid}`, {
            headers: {
              'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
            }
          }
        );
        console.log("res", res?.data?.data);
        localStorage.setItem("patients", JSON.stringify(res?.data?.data));
        setUserProfiles(res?.data?.data);
        setLoader(false);
      };
      getAllPatients();
    } catch (error) {
      setUserProfiles([{ name: "fayyaz Ansari" }]);
      console.log("error", error);
    }
  }, []);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  // const handleShowOffCanvas = ({ name, treat, details }: any) => {
  const handleShowOffCanvas = (item: any) => {
    console.log("function");
    setShowOffCanvas(true);
    // setCurrentUserDetails({ name, treat, details });
    setCurrentUserDetails(item);
    localStorage.setItem("user", JSON.stringify(item));
  };
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

    // let whereScroll = leftArroDisable;
    // let minusScroll = leftArroDisable;
    //  whereScroll += step;
    // setLeftArroDisable(whereScroll)
    // if(leftArroDisable  >= 0){
    //   element.scrollRight += whereScroll;
    // }else{
    //   element.scrollLeft += whereScroll;
    // }
  };

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

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     setBtnTitle("Logout");
  //   } else {
  //     setBtnTitle("Login / Register");
  //   }
  // }, [token]);
  // function handleClick() {
  //   if (token) {
  //     Cookies.remove("token");
  //     navigate("/login");
  //   } else {
  //     navigate("/login");
  //   }
  // }

  useEffect(() => {
    //Check width of the scollings
    if (
      elementRef.current &&
      elementRef?.current?.scrollWidth === elementRef?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    return () => {};
  }, [elementRef?.current?.scrollWidth, elementRef?.current?.offsetWidth]);
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
              <p className="text-muted py-2">Good Morning</p>
              {/* <h4>Welcome Dr. Bessie Cooper</h4> */}
              <h4 className="text-capitalize">
                Welcome Dr.{" "}
                {JSON.parse(localStorage.getItem("doctor_information")).name}
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
            <Col xs={12} xl={6} className="pe-md-3 ">
              <div
                className="d-flex w-100 h-100 justify-content-between px-2 align-items-end  upcomming-appointments"
                style={{ borderRadius: "12px", cursor: "pointer" }}
                onClick={() => {
                  navigate("/upcoming-appointments");
                }}
              >
                <div className="text-light ps-5">
                  <h3 className="text-light mb-4 text-break">
                    Upcoming Appointment
                  </h3>
                </div>
                <div className="pe-4">
                  <img src={d_db_female} />
                </div>
              </div>
            </Col>
            <Col xs={12} xl={6} className="ps-md-3 ">
              <div
                className="d-flex  mt-sm-4 m-xl-0  w-100 h-100 justify-content-between px-2 align-items-end  chats-section-heading"
                style={{ borderRadius: "12px", cursor: "pointer" }}
              >
                <div className="text-light ps-5">
                  <h3 className="text-light mb-4 ">Chats</h3>
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
            className="mt-5 pt-4 mb-5"
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
                      <strong>Patients History</strong>
                    </p>
                    <Link
                      style={{ cursor: "pointer", color: "#3874AB" }}
                      to={"/patients-history"}
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
                ) : userProfiles.length == 0 ? (
                  <div className="d-flex  justify-content-center">
                    No data found
                  </div>
                ) : (
                  userProfiles.map((item, index) => {
                    return (
                      <Col
                        key={item.name + index}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                        className="pe-2"
                      >
                        {/* <Card
                      style={{ width: "18rem" , }}
                      key={"card_id" + index.toString()}
                    >
                      <div className="d-flex flex-column justify-content-center align-items-center pt-5">
                          <Image style={{height: "5rem", width: "5rem"}} src={d_db_male} roundedCircle />
                             <div className="d-flex align-items-center  flex-column">
                             <Card.Text className="mt-2">{item + "fayyaz"}</Card.Text>
                            <small className="mt-2 text-muted">{item + "fayyaz"}</small>
                          </div>
                          <hr   />
                      </div>
                      <Card.Body className="d-flex justify-content-center">
                        
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                    </Card> */}
                        <UserCard
                          btnTitle="View Profile"
                          img={doctor_img}
                          handleUserProfile={() => {
                            // handleShowOffCanvas({
                            //   name: item.name,
                            //   treat: "Patient Condition",
                            //   details: item,
                            // });
                            handleShowOffCanvas(item);
                          }}
                          userDetails={{
                            name: item.name,
                            treat: "Patient Condition",
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
          <DoctorSideBar
            placement={"end"}
            name={"end"}
            show={showOffCanvas}
            onHide={handleCloseOffCanvas}
            heading={
              currentUserDetails?.appointment_status === "booked"
                ? "Upcomming Appointments"
                : "Conducted Appointments"
            }
            img={doctor_img}
            // userDetails={{
            //   name: "John Smith",
            //   treat: "Mild Anxiety",
            // }}
            userDetails={{
              // name: "John Smith",
              // treat: "Mild Anxiety",
              name: currentUserDetails.name,
              treat: "Patient condition",
              details: currentUserDetails,
            }}
            // userDetails={currentUserDetails}
            appointmentDetails={{
              Date: "Jan 1 2022",
              Time: "02:00 pm",
              Duration: "01 hour",
              // Date: currentAppointmentDate,
              // Time: currentAppointmentTime,
              // Duration: currentAppointmentDuration,
            }}
            downloadForms={"Downloadable Forms"}
          />
        </Container>
      </Header>
    </>
  );
}

export default DoctorDashBoard;
