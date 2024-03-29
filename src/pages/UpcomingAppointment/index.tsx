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
// // import Button from "../Common/Buttons/Button";
// import Button from "./../../components/Common/Buttons/Button";
// import Cookies from "js-cookie";
// import { getToken } from "./../../utils";
// FaArrowRight
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import BackButton from "../../components/Common/Buttons/BackButton";
import "./upcomingApp.css";
import DoctorSideBar from "../../components/DoctorSideBar";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "../../configs/config";
import moment from "moment";
import { formatted_Date, change_time_format } from "../../global_func";
import { getToken } from "../../utils";
function UpcomingAppointment() {
  // const token = getToken();
  // const [btnTitle, setBtnTitle] = useState("Login / Register");
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const [userProfiles, setUserProfiles] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<any>({});
  const [pdfData , setPDFData] = useState(null)


  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = async (item: any) => {
    try {
      let response = await axios.get(
        `${config.base_url}/patient/get_patient_psc_record/${item?.patient_id}`
      );
      console.log("response?.data?.data" , response?.data?.data)
      localStorage.setItem("current_doctor_details", JSON.stringify(item));
      setPDFData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setShowOffCanvas(true);
    setCurrentPatient(item);
    localStorage.setItem("user", JSON.stringify(item));
  };

  const elementRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const myLocations = location.pathname;
  let currentLocation = location.pathname.split("/").slice(-1).toString();  

  const goBack = () => {
    navigate(-1);
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
  const doctor_information = JSON.parse(
    localStorage.getItem("doctor_information")
  );
  const { name, uid } = doctor_information;
  useEffect(() => {
    try {
      setLoader(true);
      const getAllPatients = async () => {
        let bookedOrConducted = myLocations === "/upcoming-appointments" ? "booked" : "conducted" 
        const res = await axios.get(
          `${config.base_url}/doctor/get_upcomming_appointments/${name}/${uid}/${bookedOrConducted}`, {
            headers: {
              'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
            }
          }
        );
        console.log("get_upcomming_appointments res", res?.data?.data);
        setUserProfiles(res?.data?.data);
        setLoader(false);
      };
      getAllPatients();
    } catch (error) {
      console.log("error", error);
    }
  }, [myLocations]);

  return (
    <Header>
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
          {loader ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "100px",
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
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "90vh",
                width: "100%",
              }}
            >
              {" "}
              <div>No Data Found</div>
            </div>
          ) : (
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
                <Row
                  key={item.name + index}
                  className="border-bottom py-3 mx-4 p-0 "
                >
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
                    {formatted_Date(item.date)}
                  </Col>
                  <Col
                    className="d-flex align-items-center justify-content-center"
                    sm={3}
                  >
                    {change_time_format(item.time)}
                    {/* <p>Appointment Time</p> */}
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
          )}
        </Container>
        <DoctorSideBar
        heading={myLocations === "/upcoming-appointments" ? "Upcoming Appointments" : "Conducted Appointments" }
          placement={"end"}
          name={"end"}
          show={showOffCanvas}
          pdfData={pdfData}
          onHide={handleCloseOffCanvas}
          img={doctor_img}
          userDetails={{
            name: currentPatient.name,
            treat: "Patient condition",
            details: currentPatient,
          }}
          // userDetails={currentPatient}          
          appointmentDetails={{
            Date: currentPatient.date,
            Time: currentPatient.time,
            Duration: currentPatient.slot_duration,
          }}
          downloadForms={"Downloadable Forms"}
        />
      </Container>
    </Header>
  );
}

export default UpcomingAppointment;
