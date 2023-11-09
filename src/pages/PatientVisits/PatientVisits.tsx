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
import { getToken } from "../../utils";

function PatientVisits() {
  const location = useLocation();
  const navigate = useNavigate();
  let currentLocation = location.pathname.split("/").slice(-1).toString();
  const [doctorProfiles, setDoctorProfiles] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [conductedAppointments, setConductedAppointments] = useState([]);
  const [currentDoctorDetails, setCurrentDoctorDeatils] = useState<any>();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  // console.log("currentDoctorDetails", currentDoctorDetails)
  // console.log(" setShowOffCanvas",  showOffCanvas)

  console.log("conductedAppointments bookedAppointments", bookedAppointments);
  console.log("conductedAppointments booked", conductedAppointments);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = (item: any) => {
    setShowOffCanvas(true);
    console.log("Ammaaar", item);
    setCurrentDoctorDeatils(item);
    localStorage.setItem("current_doctor_details", JSON.stringify(item));
  };
  const [loader, setLoader] = useState(true);
  let booked = [];
  let conducted = [];
  const handleBookedAndConducted = (profiles: any) => {
    let data = [...profiles];
    data.forEach((data_item, index) => {
      let { schedule, ...res } = data_item;
      let conductedObj = { ...res, schedule: [] };
      let bookedObj = { ...res, schedule: [] };
      schedule.forEach((item, index) => {     
        if(item.appointment_status === "conducted")
        {          
          return conductedObj.schedule.push(item)
        }
        else{
          data_item.meeting_id? item.meeting_id = data_item.meeting_id: null;
          return bookedObj.schedule.push(item)
        }
      });
      if (conductedObj.schedule.length > 0) {
        conducted.push(conductedObj);
      }
      if (bookedObj.schedule.length > 0) {
        booked.push(bookedObj);
      }
    });
    setBookedAppointments(booked);
    setConductedAppointments(conducted);

    // console.log("conducted", conducted);
    // console.log("conducted booked", booked);
    // console.log("data", data);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${config.base_url}/patient/get_patient_upcoming_appointment/${
            JSON.parse(localStorage.getItem("user_complete_information")).id
          }`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
            },
          }
        );
        console.log("get_patient_upcoming_appointment res", res);
        if (res?.data?.data) {
          localStorage.setItem(
            "current_doctor_details",
            JSON.stringify(res?.data?.data[0])
          );
          setDoctorProfiles(res?.data?.data);
          setLoader(!loader);
        }
      } catch (error) {
        console.log("get_patient_upcoming_appointment error", error);
      }
    })();
  }, []);
  useEffect(() => {
    handleBookedAndConducted(doctorProfiles);
  }, [doctorProfiles]);

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
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "#243D4C",
                }}
              >
                My Visits
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
            <Container
              className="p-4 my-3"
              style={{ background: "#fff", borderRadius: "20px" }}
            >
              {bookedAppointments.length > 0 && (
                <Row>
                  <Col xs={12} className="py-2">
                    <h5>Upcomming Appoinments</h5>
                  </Col>
                  {bookedAppointments.map((item, index) => {
                    return (
                      <Col
                        key={"item" + index.toString()}
                        xs={12}
                        sm={12}
                        md={6}
                        lg={3}
                        className="py-2"
                      >
                        <UserCard
                          btnTitle="View Details"
                          key={"abcd" + index.toString()}
                          img={doctor_img}
                          userDetails={{ ...item, treat: item?.schedule[0]?.specialities }}
                          handleUserProfile={() => {
                            handleShowOffCanvas(item);
                          }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              )}
              {conductedAppointments.length > 0 && (
                <Row>
                  <Col xs={12} className="py-2">
                    <h5>Conducted Appoinments</h5>
                  </Col>
                  {conductedAppointments.map((item, index) => {
                    return (
                      <Col xs={12} sm={12} md={6} lg={3} className="py-2">
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
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Container>
          )}
        </div>
        {currentDoctorDetails && (
          <PatientSideBarModal
            placement={"end"}
            name={"end"}
            show={showOffCanvas}
            onHide={handleCloseOffCanvas}
            img={doctor_img}
            heading={currentDoctorDetails?.schedule[0]?.appointment_status}
            doctorDetails={{
              name: currentDoctorDetails.name,
              specialities: "Doctor Specialities",
              details: currentDoctorDetails,
            }}
            appointmentDetails={{
              Date: "Jan 1 2022",
              Time: "02:00 pm",
              Duration: "01 hour",
              Meeting_id: "123"
            }}
            downloadForms={"Downloadable Forms"}
          />
        )}
      </div>
    </Header>
  );
}

export default PatientVisits;
