import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { appRoutes } from "./../../constants/constants";
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
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// // import Button from "../Common/Buttons/Button";
// import Button from "./../../components/Common/Buttons/Button";
// import Cookies from "js-cookie";
// import { getToken } from "./../../utils";
// FaArrowRight
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import UserCard from "../../components/Common/UserCard";
// import "./dashboard.css";
import DoctorSideBar from "../../components/DoctorSideBar";
import axios, { AxiosError } from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "./../../configs/config";
import InstituteHeader from "./Header/Header";
import Button from "../../components/Common/Buttons/Button";
import TeacherInvitation from "../../components/TeacherInvitation";
import DoctorCard from "../../components/Common/DoctorCard";
import TeacherCard from "../../components/Common/TeacherCard";
import SearchComponent from "../../components/Search";
import TeacherDisplayComponent from "../../components/TeacherDisplayComponent";
import { useQuery } from "react-query";
import { getAllTeachers } from "../../components/Forms/Institutes/InstituteAPIs";
import TeacherHeader from "./Header/Header";
import StudentInvitation from "../../components/StudentInvitation";
import StudentDisplayComponent from "../../components/StudentDisplayComponent";
import { getStudentsOfATeacher } from "../../components/Forms/Teachers/TeachersAPIs";

function TeacherDashboard() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const teacher_information = JSON.parse(
    localStorage.getItem("teacher_information")
  );

  const {
    data: students,
    isLoading,
    isRefetching,
  } = useQuery(
    "getAllOfTheStudentsForSingleTeacher",
    () => getStudentsOfATeacher(),
    {
      refetchOnWindowFocus: false,
      onError: (err: AxiosError) => {
        if (err?.response?.status)
          toast.error("An error occured fetching Students. Please try again");
      },
    }
  );
  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => {
    console.log("function");
    setShowOffCanvas(true);
  };

  // const navigate = useNavigate();
  return (
    <>
      <TeacherHeader />
      <Container>
        <Row className="d-flex flex-row">
          <Col
            className="d-flex flex-column justify-content-start py-5"
            xs={12}
            sm={8}
            md={9}
          >
            <h4 className="text-capitalize">Dashboard</h4>
          </Col>
          <Col className="d-flex align-items-center" xs={12} sm={4} md={3}>
            <div>
              <Button
                variant="primary"
                title="Invite Student"
                className="px-5 py-3 mb-3"
                onClick={() => handleShowOffCanvas()}
              />
            </div>
          </Col>
        </Row>
        <StudentDisplayComponent
          students={students?.data?.data}
          teacherName={teacher_information?.name}
        />
        <Row className="d-flex justify-content-between">
          {isLoading || isRefetching ? (
            <p>Loading...</p>
          ) : (
            <StudentInvitation
              onHide={handleCloseOffCanvas}
              show={showOffCanvas}
              placement="end"
            />
          )}
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default TeacherDashboard;
