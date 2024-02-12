import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { appRoutes } from "./../../../constants/constants";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import dashboardIcon from "../../../assets/images/dashboardicon.png";
// import myImage from "./../../../a"
import myVisitsIcon from "../../../assets/images/myVisitsIcon.png";
import prcsiptionIcon from "../../../assets/images/presciptionsIcon.png";
import settingsIcon from "../../../assets/images/settingsIcon.png";
import logoutIcon from "../../../assets/images/logoutIcon.svg";
// import logo from "../../assets/images/logo.svg";
import logo from "./../../../assets/images/logo.svg";
import besse_cooper from "./../../../assets/images/besse_cooper.png";
// import Button from "../Common/Buttons/Button";
import Button from "./../../../components/Common/Buttons/Button";
import Cookies from "js-cookie";
import { getToken } from "./../../../utils";
import { FaBell, FaChevronDown } from "react-icons/fa6";
import Avatar from "react-avatar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserInformation } from "./../../../store/slices/UserSlice";
import { Row, Col, Image, Modal } from "react-bootstrap";

function Header({ children }) {
  let location = useLocation();
  const [showDropDown, setShowDropDown] = useState(false);
  const [btnTitle, setBtnTitle] = useState("Get Started");
  const [showModal, setShowModal] = useState(false);

  const [currentPatient, setCurrentPatient] = useState(
    JSON.parse(localStorage.getItem("user_complete_information"))
  );
  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );
  const [currentRoute, setCurrentRoute] = useState("dashboard");

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setBtnTitle("Logout");
    } else {
      setBtnTitle("Get Started");
    }
  }, [token]);
  const handleCloseModal = () => {
    setShowModal(false);
    // navigate("/doctor-dashboard");
  };

  function handleClick() {
    if (token) {
      // Clear all keys from Local Storage
      localStorage.clear();

      // Clear all keys from Session Storage
      sessionStorage.clear();
      Cookies.remove("token");
      // navigate("/doctor-login");
      navigate("/login");
    } else {
      // navigate("/doctor-login");
      navigate("/login");
    }
  }
  let doctor_information = JSON.parse(
    localStorage.getItem("doctor_information")
  );

  const btnAvatar = (
    <div className="d-flex flex-row">
      <div className="w-8 h-8 pe-4">
        <Image alt="logo" src={logo} width={50} />
      </div>
      <div className="d-flex flex-column p-0">
        <small className="text-light  p-0">
          <strong>Bessie Cooper</strong>
        </small>
        <small className="text-light  p-0">Psychiatrist</small>
      </div>
    </div>
  );

  const goToDashBoard = () => {
    setShowModal(false);
    // navigate("/doctor-dashboard");
    handleClick();
  };
  return (
    <>
      <Row>
        <Col xs={12} xl={12}>
          <Navbar collapseOnSelect expand="xl">
            <Container className="py-3">
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <Navbar.Brand>
                  <img alt="logo" src={logo} className="w-100" />
                </Navbar.Brand>
              </div>

              <Navbar.Toggle aria-controls="responsive-navbar-nav " />
              <Navbar.Collapse id="responsive-navbar-nav ">
                <Nav className="ms-lg-auto ">
                  <div className="d-flex align-items-center justify-content-start pe-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle "
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e4eed4",
                      }}
                    >
                      <FaBell
                        className="w-75 h-75"
                        style={{ color: "#77AC28" }}
                      />
                      {/* <Image alt="logo" className="rounded-circle pe-4"  style={{width: "20px", height: "20px"}} /> */}
                    </div>
                  </div>

                  <button
                    // className={`${
                    //   variant === "secondary" ? "secondary-btn" : "primary-btn"
                    // } ${className} ${disabled ? "disabled-btn" : ""}`}
                    className="primary-btn px-3 py-2 border-0 position-relative"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDropDown(!showDropDown);
                    }}
                  >
                    <div className="d-flex w-100 h-100 flex-row align-items-center justify-content-between">
                      <div
                        className="d-block rounded-circle me-2 bg-success"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <Image src={besse_cooper} className="w-100 h-100" />
                        {/* <Image alt="logo" className="rounded-circle pe-4"  style={{width: "20px", height: "20px"}} /> */}
                      </div>
                      <div className="d-flex flex-column p-0 me-2">
                        <small className="text-light p-0">
                          {/* <strong className="text-light">Bessie Cooper</strong> */}
                          <strong className="text-light text-capitalize">
                            {currentPatient.name}
                          </strong>
                        </small>
                        {/* <small className="text-light  p-0">
                          Patient Condition
                        </small> */}
                        {/* <small className="text-light  p-0">
                         {reduxUserState?.psc_test_result?.condition?.replace(/[()]/g, '')}
                         
                        </small> */}
                      </div>
                      <div>
                        <FaChevronDown
                          className="rotated-icon"
                          style={{
                            color: "white !important",
                            rotate: showDropDown ? "180deg" : "0deg",
                          }}
                        />
                      </div>
                      <div
                        className={`${
                          showDropDown ? "d-block" : "d-none"
                        }   position-absolute text-danger dropdown-transition`}
                        style={{ top: "60px", right: "0px", zIndex: 10 }}
                      >
                        <ul className="shadow border">
                          <li
                            className="my_account_li "
                            onClick={() => {
                              navigate("/profile");
                            }}
                          >
                            My Account
                          </li>
                          <div
                            className="d-flex justify-content-center w-100"
                            style={{ color: "GrayText" }}
                          >
                            <hr
                              className=" d-flex border-bottom p-0 m-0"
                              style={{ width: "80%" }}
                            />
                          </div>
                          <li
                            onClick={
                              () => {
                                setShowModal(true);
                              } // modal to show
                            }
                          >
                            Logout
                          </li>
                          <div className="d-flex justify-content-center w-100 text-light">
                            <hr
                              className=" d-flex border-bottom p-0 m-0"
                              style={{ width: "80%" }}
                            />
                          </div>
                        </ul>
                      </div>
                    </div>
                  </button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col xs={12} md={3} xl={2} className="patient-navbar">
          <div className="patient-SideBar">
            <div
              className={` ${
                location.pathname === "/patient-dashboard"
                  ? `patient-nav-active`
                  : "patient-nav"
              } cursor-pointer`}
              onClick={() => {
                navigate("/patient-dashboard");
              }}
            >
              <div className="patient-nav-img">
                <img src={dashboardIcon} alt="dashboardIcon" />
              </div>
              <div>Dashboard</div>
            </div>
            <div
              className={`${
                location.pathname === "/patient-myvisits"
                  ? `patient-nav-active`
                  : "patient-nav"
              } cursor-pointer`}
              onClick={() => {
                navigate("/patient-myvisits");
              }}
            >
              <div className="patient-nav-img">
                <img src={myVisitsIcon} alt="dashboardIcon" />
              </div>
              <div>My Visits</div>
            </div>
            <div
              className={`${
                location.pathname === "/schedule-appointment" ||
                location.pathname === "/select-doctor" ||
                location.pathname === "/doctor-detail"
                  ? `patient-nav-active`
                  : "patient-nav"
              } cursor-pointer`}
              onClick={() => {
                navigate("/schedule-appointment");
              }}
            >
              <div className="patient-nav-img">
                <img src={myVisitsIcon} alt="dashboardIcon" />
              </div>
              <div>Schedule</div>
            </div>
            <div
              className={`${
                location.pathname === "/all-doctors" ||
                location.pathname === "/doctor-details"
                  ? `patient-nav-active`
                  : "patient-nav"
              } cursor-pointer`}
              onClick={() => {
                navigate("/all-doctors");
              }}
            >
              <div className="patient-nav-img">
                <img src={myVisitsIcon} alt="dashboardIcon" />
              </div>
              <div>Doctors</div>
            </div>
            {/* <div className="patient-nav" onClick={"/patient-prescriptions"}> */}
            <div
              className={`${
                location.pathname === "/patient-prescriptions"
                  ? `patient-nav-active`
                  : "patient-nav"
              } cursor-pointer`}
              onClick={() => {
                navigate("/patient-prescriptions");
              }}
            >
              <div className="patient-nav-img">
                <img src={prcsiptionIcon} alt="dashboardIcon" />
              </div>
              <div>Prescriptions</div>
            </div>
            <div
              className={`cursor-pointer ${
                location.pathname === "/profile"
                  ? `patient-nav-active`
                  : "patient-nav"
              }`}
              onClick={() => {
                navigate("/profile");
              }}
            >
              <div className="patient-nav-img">
                <img src={settingsIcon} alt="dashboardIcon" />
              </div>
              <div>Settings</div>
              {/* </div> */}
            </div>
          </div>
          <div className="patient-SideBar">
            {/* <div className="patient-nav" onClick={"/patient-Dashboard"}> */}
            <div
              className="patient-nav"
              // onClick={"/patient-prescriptions"}
            >
              <div className="patient-nav-img">
                <img src={logoutIcon} alt="dashboardIcon" />
              </div>
              <div className="patient-nav-text cursor-pointer"
              onClick={
                () => {
                  setShowModal(true);
                } // modal to show
              }
              >Logout</div>
              {/* </div> */}
            </div>
          </div>
        </Col>
        <Col xs={12} md={9} xl={10} className="pe-4">
          {children}
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Title className="p-4 pb-0" id="contained-modal-title-vcenter">
          Logout
        </Modal.Title>
        <Modal.Body className="d-flex flex-column justify-content-center p-4">
          {/* <span className="modal-title">Are you sure you want to logout?</span> */}
          <span>Are you sure you want to logout?</span>

          <div className="d-flex mt-3 w-100 align-items-center  ">
            <Button
              onClick={handleCloseModal}
              title="No"
              variant="secondary"
              className="p-0 py-2 me-1 w-100"
            />
            <Button
              onClick={goToDashBoard}
              title="Yes, Logout"
              className="p-0 py-2 ms-1 w-100 border-0"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;