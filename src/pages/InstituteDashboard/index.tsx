import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { appRoutes } from "./../../constants/constants";
import { Container, Row, Col } from "react-bootstrap";
// import Image from "react-bootstrap/Image";
// import "./Header.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import logo from "../../assets/images/logo.svg";
// import d_db_female from "../../assets/images/d_db_female.png";
// import d_db_male from "../../assets/images/d_db_male.png";
// import doctor_img from "../../assets/images/doctor.svg";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
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

function InstituteDashBoard() {
  // const token = getToken();
  // const [btnTitle, setBtnTitle] = useState("Login / Register");
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  // console.log("userprofiles", userProfiles)
  const [loader, setLoader] = useState(true);

  const [currentUserDetails, setCurrentUserDetails] = useState<any>({});
  const institute_information = JSON.parse(
    localStorage.getItem("institute_information")
  );

  const { data, isLoading, isRefetching } = useQuery(
    "getAllTeachersInInstitute",
    () => getAllTeachers(),
    {
      refetchOnWindowFocus: false,
      onError: (err: AxiosError) => {
        if (err?.response?.status)
          toast.error("An error occured fetching Teachers. Please try again");
      },
    }
  );
  // const {
  //   currentAppointmentDate,
  //   currentAppointmentTime,
  //   currentAppointmentDuration,
  // } = currentUserDetails?.details

  // useEffect(() => {
  //   try {
  //     const getAllPatients = async () => {
  //       // const res = await axios.get(
  //       //   `${config.base_url}/doctor/get_all_users`
  //       // );
  //       const res = await axios.get(
  //         `${config.base_url}/doctor/get_upcomming_appointments/${name}/${uid}`
  //       );
  //       console.log("res", res?.data?.data);
  //       localStorage.setItem("patients", JSON.stringify(res?.data?.data));
  //       // Array.isArray(res.data);
  //       // setUserProfiles([{name:"fayyaz"}])
  //       // setUserProfiles(res.data.data);
  //       setUserProfiles(res?.data?.data);
  //       setLoader(false);
  //     };
  //     getAllPatients();
  //   } catch (error) {
  //     setUserProfiles([{ name: "fayyaz Ansari" }]);
  //     console.log("error", error);
  //   }
  // }, []);

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => {
    setShowOffCanvas(true);
  };
  const handleShowOffReActivateCanvas = () => {
    setShowOffCanvas(true);
  };
  const handleCloseOffReActivateCanvas = () => setShowOffCanvas(false);
  const navigate = useNavigate();

  // const handleHorizantalScroll = (element, speed, distance, step) => {
  //   element.scrollLeft += step;
  //   setscrollX(scrollX + step);
  //   console.log("scroll", element.scrollLeft);

  //   //For checking if the scroll has ended
  //   if (
  //     Math.floor(
  //       elementRef.current.scrollWidth - elementRef.current.scrollLeft
  //     ) <= elementRef.current.offsetWidth
  //   ) {
  //     setscrolEnd(true);
  //   } else {
  //     setscrolEnd(false);
  //   }

  // let whereScroll = leftArroDisable;
  // let minusScroll = leftArroDisable;
  //  whereScroll += step;
  // setLeftArroDisable(whereScroll)
  // if(leftArroDisable  >= 0){
  //   element.scrollRight += whereScroll;
  // }else{
  //   element.scrollLeft += whereScroll;
  // }
  // };

  //This will check scroll event and checks for scroll end
  // const scrollCheck = () => {
  //   setscrollX(elementRef.current.scrollLeft);
  //   if (
  //     Math.floor(
  //       elementRef.current.scrollWidth - elementRef.current.scrollLeft
  //     ) <= elementRef.current.offsetWidth
  //   ) {
  //     setscrolEnd(true);
  //   } else {
  //     setscrolEnd(false);
  //   }
  // };

  return (
    <>
      <InstituteHeader />
      <Container>
        <Row className="d-flex flex-row">
          <Col
            className="d-flex flex-column justify-content-start py-5"
            xs={12}
            sm={4}
            md={6}
          >
            <h4 className="text-capitalize">Dashboard</h4>
          </Col>
          <Col className="d-flex align-items-center" xs={12} sm={4} md={3}>
            <div>
              <Button
                variant="primary"
                title="Re-Activate Teacher"
                className="px-5 py-3 mb-3"
                onClick={() => handleShowOffReActivateCanvas()}
              />
            </div>
          </Col>
          <Col className="d-flex align-items-center" xs={12} sm={4} md={3}>
            <div>
              <Button
                variant="primary"
                title="Invite Teacher"
                className="px-5 py-3 mb-3"
                onClick={() => handleShowOffCanvas()}
              />
            </div>
          </Col>
        </Row>
        <TeacherDisplayComponent teachers={data?.data?.data} />
        <Row className="d-flex justify-content-between">
          {isLoading || isRefetching ? (
            <p>Loading...</p>
          ) : (
            <TeacherInvitation
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

export default InstituteDashBoard;
