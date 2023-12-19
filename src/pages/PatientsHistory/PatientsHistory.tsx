import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Selectdoctor from "../../components/Selectdoctor";
import "./PatientsHistory.css";
import Header from "../DoctorDashboard/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import BackButton from "../../components/Common/Buttons/BackButton";
import UserCard from "../../components/Common/UserCard";
import doctor_img from "./../../assets/images/doctor.svg";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "../../configs/config";
import DoctorSideBar from "../../components/DoctorSideBar";
const PatientsHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let currentLocation = location.pathname.split("/").slice(-1).toString();
  const [userProfiles, setUserProfiles] = useState([]);
  const [loader, setLoader] = useState(true);
  // console.log("userProfile", userProfiles[0].name);

  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [pdfData, setPDFData] = useState(null);

  const [currentUserDetails, setCurrentUserDetails] = useState<any>({});

  const goBack = () => {
    navigate(-1);
  };
  const handleCloseOffCanvas = () => setShowOffCanvas(false);

  useEffect(() => {
    try {
      const getAllPatients = async () => {
        // const res = await axios.get(
        //   `${config.base_url}/doctor/get_all_users`
        // );
        // console.log("res", res.data.data[0]);
        // Array.isArray(res.data);
        // setUserProfiles([{name:"fayyaz"}])
        // setUserProfiles(res.data.data);
        setUserProfiles(JSON.parse(localStorage.getItem("patients")));
        setLoader(false);
      };
      getAllPatients();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  // const handleShowOffCanvas = (item: any) => {
  //   console.log("function", item);
  //   setShowOffCanvas(true);
  //   // setCurrentUserDetails({ name, treat, details });
  //   setCurrentUserDetails(item);
  //   localStorage.setItem("user", JSON.stringify(item));
  // };

  const handleShowOffCanvas = async (item: any) => {
    try {
      let response = await axios.get(
        `${config.base_url}/patient/get_patient_psc_record/${item?.patient_id}`
      );
      console.log("response?.data?.data", response?.data?.data);
      setPDFData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    console.log("function");
    setShowOffCanvas(true);
    // setCurrentUserDetails({ name, treat, details });
    setCurrentUserDetails(item);
    localStorage.setItem("user", JSON.stringify(item));
  };

  return (
    <Header>
      <div>
        <Container>
          <Row className="d-flex justify-content-between align-items-center pt-5">
            <Col
              className="d-flex flex-column justify-content-start"
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
        <div className="d-flex justify-content-center m-4">
          {loader ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "100%",
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
            <div className="d-flex w-100 justify-content-center align-items-center pt-5">
              <span> No Data Found</span>
            </div>
          ) : (
            <div className="select_doctorContainer">
              {userProfiles.map((item, index) => {
                return (
                  <UserCard
                    btnTitle="View Details"
                    img={doctor_img}
                    userDetails={{
                      name: item.name,
                      treat: "Patient Condition",
                    }}
                    handleUserProfile={() => {
                      console.log("handleUserProfile", item);
                      handleShowOffCanvas(item);
                    }}
                  />
                );
              })}
              <DoctorSideBar
                placement={"end"}
                pdfData={pdfData}
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
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default PatientsHistory;
