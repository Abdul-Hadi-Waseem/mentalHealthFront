import { useEffect, useState, useRef } from "react";
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
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "./../../configs/config";
import InstituteHeader from "./Header/Header";
import Button from "../../components/Common/Buttons/Button";

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
  console.log("currentUser", currentUserDetails);
  const institute_information = JSON.parse(
    localStorage.getItem("institute_information")
  );
  console.log(institute_information, "dedit inst data");
  const { name, id } = institute_information;
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
  // const handleShowOffCanvas = ({ name, treat, details }: any) => {
  const handleShowOffCanvas = (item: any) => {
    console.log("function");
    setShowOffCanvas(true);
    // setCurrentUserDetails({ name, treat, details });
    setCurrentUserDetails(item);
    localStorage.setItem("user", JSON.stringify(item));
  };
  const elementRef = useRef(null);
  const navigate = useNavigate();

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

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     setBtnTitle("Logout");
  //   } else {
  //     setBtnTitle("Login / Register");
  //   }
  // }, [token]);
  // function handleClick() {
  //   if (token) {
  //     Cookies.remove("token");
  //     navigate("/login");
  //   } else {
  //     navigate("/login");
  //   }
  // }

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
  return (
    <>
      <InstituteHeader />
      <Container>
        <Row className="d-flex flex-row flex-nowrap">
          <Col
            className="d-flex flex-column justify-content-start py-5"
            xs={12}
            md={6}
          >
            <h4 className="text-capitalize">Dashboard</h4>
          </Col>
          <Col
            className="d-flex justify-content-end align-items-center"
            xs={12}
            md={6}
          >
            <div>
              <Button
                variant="primary"
                title="Invite Teacher"
                className="px-5 py-3"
                onClick={() => {
                  // setCreatePrescModal(true);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col xs={12} xl={6} className="pe-md-3">
            <div
              className="d-flex w-100 h-100 justify-content-between px-2 align-items-end  upcomming-appointments"
              style={{ borderRadius: "12px", cursor: "pointer" }}
              onClick={() => {
                navigate("/upcoming-apointments");
              }}
            >
              <div className="text-light ps-5">
                <h3 className="text-light mb-4 text-break">
                  Upcoming Appointment
                </h3>
              </div>
              <div className="pe-4">
                <img src={d_db_female} />
              </div>
            </div>
          </Col>
          <Col xs={12} xl={6} className="ps-md-3 ">
            <div
              className="d-flex  mt-sm-4 m-xl-0  w-100 h-100 justify-content-between px-2 align-items-end  chats-section-heading"
              style={{ borderRadius: "12px", cursor: "pointer" }}
            >
              <div className="text-light ps-5">
                <h3 className="text-light mb-4 ">Chats</h3>
              </div>
              <div className="pe-4">
                <img src={d_db_male} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InstituteDashBoard;
