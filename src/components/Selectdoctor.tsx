import doctor_img from "../assets/images/doctor.svg";
import DoctorCard from "./Common/DoctorCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "../configs/config";
import { Col, Row, Container } from "react-bootstrap";
const Selectdoctor = () => {
  // const [doctorProfiles, setdoctorProfiles] = useState([
  //   { name: "Bessie Cooper", designation: "Psychiatrist" },
  //   { name: "John Smith", designation: "Psychiatrist" },
  //   { name: "Shaen Watson", designation: "Psychiatrist" },
  // ]);
  const [doctorProfiles, setdoctorProfiles] = useState([]);
  const [loader, setLoader] = useState(true);
  console.log("doctorProfile", doctorProfiles);

  let data = JSON.parse(localStorage.getItem("appointment_date"));
  console.log("data formated", data);

  // data: {
  //   day: "Wednesday",
  //   start_time: "2023-09-05T16:48:00.000Z",
  //   end_time: "2023-09-05T17:48:00.000Z",
  // }
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          `${config.base_url}/doctor/get_doctors_for_appointment`,
          {
            data,
          }
        );
        // console.log("res", res.data.data[0]);
        setdoctorProfiles(res.data.data);
        setLoader(!loader);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <>
      {loader ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "90vh",
            width: "100%",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ color: "#5E9CD3" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : doctorProfiles.length == 0 ? (
        <div className="d-flex  justify-content-center">
          No Doctors found in Your time range
        </div>
      ) : (
        <div className="select_doctorContainer">
          {doctorProfiles.map((item, index) => {
            return <DoctorCard doctor_details={{ ...item }} img={doctor_img} />;
          })}
        </div>
      )}
    </>
  );
};

export default Selectdoctor;

// {/* <DoctorCard img={doctor_img}/>
// <DoctorCard img={doctor_img}/>
// <DoctorCard img={doctor_img}/>
// <DoctorCard img={doctor_img}/>
// <DoctorCard img={doctor_img}/>
// <DoctorCard img={doctor_img}/>
// <DoctorCard img={doctor_img}/> */}
