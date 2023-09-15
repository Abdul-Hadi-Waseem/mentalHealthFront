import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Selectdoctor from "../../components/Selectdoctor";
import "./ShowAllDoctors.css";
// import Header from "../DoctorDashboard/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import BackButton from "../../components/Common/Buttons/BackButton";
import UserCard from "../../components/Common/UserCard";
import doctor_img from "./../../assets/images/doctor.svg";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "../../configs/config";
import Header from "../PatientDashboard/Header/Header";

function ShowAllDoctors() {
  const location = useLocation();
  const navigate = useNavigate();
  let currentLocation = location.pathname.split("/").slice(-1).toString();
  const [doctorProfiles, setDoctorProfiles] = useState([]);
  const [loader, setLoader] = useState(true);
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${config.base_url}/doctor/get_all_doctors`
        );
        console.log("get_all_doctors_response", res.data.data);
        if (res?.data?.data) {
          setDoctorProfiles(res?.data?.data);
          // setDoctorProfiles([{name: "fayyaz", treat: "anxiety"}]);
          setLoader(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);
  //   <Container>
  //   <Row className="d-flex justify-content-between align-items-center pt-3">
  //     <Col
  //       className="d-flex flex-column justify-content-start"
  //       xs={12}
  //       md={6}
  //     >
  //       <div className="d-flex flex-row justify-content-start align-items-center">
  //         <BackButton onClick={goBack} />
  //         <span className="px-2" style={{ fontSize: "10px" }}>
  //           |
  //         </span>
  //         <span
  //           style={{
  //             fontSize: "24px",
  //             fontWeight: 500,
  //             color: "#243D4C",
  //           }}
  //         >
  //           {currentLocation
  //             .split("-")
  //             .map(
  //               (item, index) =>
  //                 item.charAt(0).toUpperCase() +
  //                 item.slice(1).toString() +
  //                 " "
  //             )}
  //         </span>
  //       </div>
  //     </Col>
  //     <Col
  //       className="d-flex justify-content-end align-items-center"
  //       xs={12}
  //       md={6}
  //     >
  //       <button className="d-flex flex-column p-2 pm-green-btn border-0">
  //         <small className="text-xs text-light">
  //           Upcoming Appointment
  //         </small>
  //         <small className="text-xs text-light">8:00 AM - 4:00 PM</small>
  //       </button>
  //     </Col>
  //   </Row>
  // </Container>

  return (
    <Header>
      <Container>
        <Row className="d-flex justify-content-between align-items-center pt-3">
          <Col
            className="d-flex flex-column justify-content-start"
            xs={12}
            md={6}
          >
            <div className="d-flex flex-row justify-content-start align-items-center">
              {/* <BackButton onClick={goBack} />
                <span className="px-2" style={{ fontSize: "10px" }}>
                  |
                </span> */}
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "#243D4C",
                }}
              >
                All Doctors
                {/* {currentLocation
                    .split("-")
                    .map(
                      (item, index) =>
                        item.charAt(0).toUpperCase() +
                        item.slice(1).toString() +
                        " "
                    )} */}
              </span>
            </div>
          </Col>
          <Col
            className="d-flex justify-content-end align-items-center"
            xs={12}
            md={6}
          >
            {/* <button className="d-flex flex-column p-2 pm-green-btn border-0">
                <small className="text-xs text-light">
                  Upcoming Appointment
                </small>
                <small className="text-xs text-light">8:00 AM - 4:00 PM</small>
              </button> */}
          </Col>
        </Row>
      </Container>
      <div className="d-flex justify-content-center m-0">
        {loader ? (
          <Spinner
            animation="border"
            role="status"
            style={{ color: "#5E9CD3" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : doctorProfiles.length == 0 ? (
          <div className="d-flex align-items-center justify-content-center h-100 w-100 align-items-center">
            <span>No Data Found</span>
          </div>
        ) : (
          <div className="select_doctorContainer">
            
            {doctorProfiles.map((item, index) => {
              return (
                <UserCard
                  btnTitle="View Profile"
                  key={"abcd" + index.toString()}
                  img={doctor_img}
                  // userDetails={{ name: item.name, treat: "Mild Anxiety" }}
                  userDetails={{ ...item, treat: "Ortho" }}
                  handleUserProfile={() => {
                    localStorage.setItem(
                      "current_doctor_details",
                      JSON.stringify(item)
                    );
                    navigate("/doctor-details");
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </Header>
  );
}

export default ShowAllDoctors;
