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
const PatientsHistory = () => {
  const location = useLocation();
  const navigate = useNavigate()
  let currentLocation = location.pathname.split("/").slice(-1).toString();
  const [userProfiles, setUserProfiles] = useState([]);
  // console.log("userProfile", userProfiles[0].name);
  const goBack=()=>{
    navigate(-1)
  }

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
        setUserProfiles(JSON.parse(localStorage.getItem("patients")))
      };
      getAllPatients();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

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
          <Spinner animation="border" role="status" style={{color: "#5E9CD3"}}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <Container>
            <Row className="d-flex justify-content-between align-items-center pt-5">
              <Col
                className="d-flex flex-column justify-content-start"
                xs={12}
                md={6}
              >
                <div className="d-flex flex-row justify-content-start align-items-center">
                  <BackButton
                   onClick={goBack}
                  /> 
                  <span className="px-2" style={{fontSize:"10px"}}>
                        |
                  </span>
                  <span  style={{fontSize: "24px", fontWeight: 500, color: "#243D4C"}}>
                 
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
                  <small className="text-xs text-light">
                    8:00 AM - 4:00 PM
                  </small>
                </button>
              </Col>
            </Row>
          </Container>
          <div className="d-flex justify-content-center m-4">
            {/* <Selectdoctor /> */}
            <div className="select_doctorContainer">
              {userProfiles.map((item, index) => {
                return (
                  <UserCard
                  btnTitle="View Details"
                    img={doctor_img}
                    userDetails={{ name: item.name, treat: "Mild Anxiety" }}
                    handleUserProfile={() => {
                      console.log("handleUserProfile");
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientsHistory;
