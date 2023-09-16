import { json, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Selectdoctor from "../../components/Selectdoctor";
import "./PatientVisits.css";
// import Header from "../DoctorDashboard/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import BackButton from "../../components/Common/Buttons/BackButton";
import UserCard from "../../components/Common/UserCard";
import doctor_img from "./../../assets/images/doctor.svg";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "../../configs/config";
import Header from "../PatientDashboard/Header/Header";
import PatientSideBarModal from "../../components/PatientSideBarModal";

function PatientVisits() {
  const location = useLocation();
  const navigate = useNavigate();
  let currentLocation = location.pathname.split("/").slice(-1).toString();
  const [doctorProfiles, setDoctorProfiles] = useState([]);
  const [currentDoctorDetails, setCurrentDoctorDeatils] = useState<any>();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  // console.log("currentDoctorDetails", currentDoctorDetails)
  // console.log(" setShowOffCanvas",  showOffCanvas)

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = (item: any) => {
    setShowOffCanvas(true);
    setCurrentDoctorDeatils(item);
    localStorage.setItem("current_doctor_details", JSON.stringify(item));
  };

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${config.base_url}/patient/get_patient_upcoming_appointment/${
            JSON.parse(localStorage.getItem("user_complete_information")).id
          }`
        );
        console.log("get_patient_upcoming_appointment res", res);
        if (res?.data?.data) {
          localStorage.setItem(
            "current_doctor_details",
            JSON.stringify(res?.data?.data[0])
          );
          setDoctorProfiles(res?.data?.data);
          // setDoctorProfiles([{name: "fayyaz", treat: "anxiety"}]);
          setLoader(!loader);
        }
      } catch (error) {
        console.log("get_patient_upcoming_appointment error", error);
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
                My Visits
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
      <div>
        <div className="d-flex justify-content-center m-0">
          {loader ? (
            <div className="d-flex align-items-center justify-content-center h-100 w-100 ">
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#5E9CD3" }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : doctorProfiles.length == 0 ? (
            <div className="d-flex align-items-center justify-content-center h-100 w-100 ">
              <span>No Data Found</span>
            </div>
          ) : (
            <div className="select_doctorContainer">
              {doctorProfiles.map((item, index) => {
                return (
                  <UserCard
                    btnTitle="View Details"
                    key={"abcd" + index.toString()}
                    img={doctor_img}
                    // userDetails={{ name: item.name, treat: "Mild Anxiety" }}
                    userDetails={{ ...item, treat: "Psychiatrist" }}
                    handleUserProfile={() => {
                      handleShowOffCanvas(item);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {currentDoctorDetails && (
          <PatientSideBarModal
            placement={"end"}
            name={"end"}
            show={showOffCanvas}
            onHide={handleCloseOffCanvas}
            img={doctor_img}
            // userDetails={{
            //   name: "John Smith",
            //   treat: "Mild Anxiety",
            // }}
            doctorDetails={{
              name: currentDoctorDetails.name,
              specialities: "Doctor Specialities",
              details: currentDoctorDetails,
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
        )}
      </div>
    </Header>
  );
}

export default PatientVisits;
