import { useEffect, useState, useRef } from "react";
import { Link, useMatch, useNavigate, useLocation } from "react-router-dom";
import { appRoutes } from "../../constants/constants";
import Header from "../DoctorDashboard/Header/Header";
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
import DoctorCard from "../../components/Common/DoctorCard";
import BackButton from "../../components/Common/Buttons/BackButton";
import "./upcomingApp.css";
import DoctorSideBar from "../../components/DoctorSideBar";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "../../configs/config";
import moment from "moment";

function UpcomingAppointment() {
  // const token = getToken();
  // const [btnTitle, setBtnTitle] = useState("Login / Register");
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  // const [userProfiles, setUserProfiles] = useState(JSON.parse(localStorage.getItem("patients")));
  const [userProfiles, setUserProfiles] = useState(JSON.parse(localStorage.getItem("patients")));
  console.log("userprofile", JSON.parse(localStorage.getItem("patients")))

  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<any>({});



  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = (item: any) => {
    console.log("item", item)
    setShowOffCanvas(true);
    setCurrentPatient(item)
    localStorage.setItem("user", JSON.stringify(item));
  };

  const elementRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  let currentLocation = location.pathname.split("/").slice(-1).toString();
  // let currentLocation = "fayyaz";
  // console.log("location ", location);

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

  const goBack = () => {
    navigate(-1);
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
  // useEffect(() => {

  //   // try {
  //   //   const getAllPatients = async () => {
  //   //     // const res = await axios.get(
  //   //     //   `${config.base_url}/doctor/get_all_users`
  //   //     // );
  //   //     // console.log("res", res.data.data[0]);
  //   //     // Array.isArray(res.data);
  //   //     // setUserProfiles([{name:"fayyaz"}])
  //   //     setUserProfiles(JSON.parse(localStorage.getItem("patients")));
  //   //   };
  //   //   getAllPatients();
  //   // } catch (error) {
  //   //   console.log("error", error);
  //   // }
  // }, []);

  return (
    <>
      <Header />
      {userProfiles.length == 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "90vh",
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
      ) : (
        <Container>
          <Row>
            <Col
              className="d-flex flex-column justify-content-start pt-5"
              xs={12}
              md={6}
            >
              <div className="d-flex flex-row justify-content-start align-items-center">
                <BackButton onClick={goBack} />
                <span className="px-2" style={{ fontSize: "10px" }}>
                  |
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 500,
                    color: "#243D4C",
                  }}
                >
                  {currentLocation
                    .split("-")
                    .map(
                      (item, index) =>
                        item.charAt(0).toUpperCase() +
                        item.slice(1).toString() +
                        " "
                    )}
                </span>
              </div>
              {/* <div className="d-flex flex-row justify-content-start">
              <BackButton

              //  onClick={goBack}
              />
              <span className="ps-2">
                {" "}
                |{" "}
                {currentLocation
                  .split("-")
                  .map(
                    (item, index) =>
                      item.charAt(0).toUpperCase() +
                      item.slice(1).toString() +
                      "  "
                  )}
              </span>
            </div> */}
            </Col>
          </Row>
          <Container
            className="mt-4"
            style={{ backgroundColor: "#fff", borderRadius: "24px" }}
            fluid
          >
            <Row className="table_heading py-3 px-4">
              <Col className="d-flex justify-content-start" sm={4}>
                <strong>Patient Name</strong>
              </Col>
              <Col className="d-flex justify-content-center" sm={2}>
                <strong>Appointment Date</strong>
              </Col>
              <Col className="d-flex justify-content-center" sm={3}>
                <strong>Appointment Time</strong>
              </Col>
              <Col className="d-flex justify-content-center" sm={3}>
                <strong>Action</strong>
              </Col>
            </Row>
            {
              // [
              //   "Alber Flores",
              //   "Esther Howar",
              //   "Jhon Watson",
              //   "Bessie Cooper",
              //   "Alber Flores",
              //   "Esther Howar",
              //   "Jhon Watson",
              //   "Bessie Cooper",
              // ]
              userProfiles.map((item, index) => {
                return (
                  <Row key={item.name + index} className="border-bottom py-3 mx-4 p-0 ">
                    <Col
                      className="d-flex h-100 align-items-center p-0 justify-content-start"
                      sm={4}
                    >
                      <img className="doctor_img_upcomming" src={d_db_female} />
                      <p>{item.name}</p>
                    </Col>
                    <Col
                      className="d-flex align-items-center justify-content-center"
                      sm={2}
                    >
                      <p>Appointment Date</p>
                    </Col>
                    <Col
                      className="d-flex align-items-center justify-content-center"
                      sm={3}
                    >
                      <p>Appointment Time</p>
                    </Col>
                    <Col
                      className="d-flex align-items-center justify-content-center"
                      sm={3}
                    >
                      <button
                        onClick={() => {
                          handleShowOffCanvas(item);
                        }}
                        className="doctor_card_btn_d"
                      >
                        View Detials
                      </button>
                    </Col>
                  </Row>
                );
              })
            }
          </Container>
          <DoctorSideBar
            placement={"end"}
            name={"end"}
            show={showOffCanvas}
            onHide={handleCloseOffCanvas}
            img={doctor_img}
            userDetails={{
              // name: "John Smith",
              // treat: "Mild Anxiety",
              name: currentPatient.name,
              treat: "Patient condition",
              details: currentPatient
            }}
            // userDetails={currentPatient}
            appointmentDetails={{
              Date: "Jan 1 2022",
              Time: "02:00 pm",
              Duration: "01 hour",
              // Date: currentPatient.date,
              // Time: currentPatient.time,
              // Duration: currentPatient.slot_duration,
            }}
            downloadForms={"Downloadable Forms"}
          />
        </Container>
      )}
    </>
  );
}

export default UpcomingAppointment;
