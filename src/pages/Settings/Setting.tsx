import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../utils";
import config from "../../configs/config";
import { formatted_Date } from "../../global_func";
import Header from "../PatientDashboard/Header/Header";
import DoctorHeader from "../DoctorDashboard/Header/Header";
import BackButton from "../../components/Common/Buttons/BackButton";
import "./setting.css";
import editProfile from "./../../assets/icons/editProfile.svg";
import privacyPolicy from "./../../assets/icons/privacyPolicy.svg";
import termsAndCondition from "./../../assets/icons/termsAndCondition.svg";
import changePassword from "./../../assets/icons/changePassword.svg";
import { FaChevronRight } from "react-icons/fa6";
import Button from "../../components/Common/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";



function Setting({ children }) {
  const navigate = useNavigate();
  let location = useLocation();
  let currentLocation = location.pathname;
  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );
  // const [showDropDown, setShowDropDown] = useState(false);
  // const [btnTitle, setBtnTitle] = useState("Get Started");
  // const [currentPatient, setCurrentPatient] = useState(
  //   JSON.parse(localStorage.getItem("user_complete_information"))
  // );
  // const [currentRoute, setCurrentRoute] = useState("dashboard");

  // const token = getToken();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     setBtnTitle("Logout");
  //   } else {
  //     setBtnTitle("Get Started");
  //   }
  // }, [token]);

  // function handleClick() {
  //   if (token) {
  //     Cookies.remove("token");
  //     navigate("/doctor-login");
  //   } else {
  //     navigate("/doctor-login");
  //   }
  // }
  // let doctor_information = JSON.parse(
  //   localStorage.getItem("doctor_information")
  // );

  // const btnAvatar = (
  //   <div className="d-flex flex-row">
  //     <div className="w-8 h-8 pe-4">
  //       <Image alt="logo" src={logo} width={50} />
  //     </div>
  //     <div className="d-flex flex-column p-0">
  //       <small className="text-light  p-0">
  //         <strong>Bessie Cooper</strong>
  //       </small>
  //       <small className="text-light  p-0">Psychiatrist</small>
  //     </div>
  //   </div>
  // );

  const goBack = () => {
    navigate(-1);
  };

  const patientProfileRoutes = [
    { name: "Edit Profile", path: "/profile", icon: editProfile },
    { name: "Change Password", path: "/change-password", icon: changePassword },
    { name: "Privacy Policy", path: "/privacy-policy", icon: privacyPolicy },
    {
      name: "Terms and Conditions",
      path: "/terms-conditions",
      icon: termsAndCondition,
    },
  ];
  let abc = reduxUserState.level == 13 ? true : false;

  return abc ? (
    <Header>
      <Container>
        <Row className="d-flex justify-content-between align-items-center pt-3">
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
                Settings
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
      <Container
        className="py-3 my-3"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
        }}
      >
        <Row xs={24} sm={24} style={{ minHeight: "75vh" }}>
          <Col xs={12} sm={3} className="p-2">
            {/* Setting Routes */}
            <div className="routes-layout pb-0">
              <div>
                {patientProfileRoutes.map((item, index) => {
                  return (
                    <div
                      key={item.name + index.toString()}
                      className="setting-route"
                      onClick={() => {
                        navigate(item.path);
                      }}
                    >
                      <span className="info_img">
                        <img src={item.icon} />
                      </span>
                      <div className="sub-setting-route chevron-icon-right">
                        <span className="text-color-route">{item.name}</span>
                        <span
                          className={`icon-span chevron-icon-right ${
                            currentLocation !== item.path && "border-0"
                          }`}
                        >
                          <span className="icon-chevron chevron-icon-right">
                            <FaChevronRight
                              className="h-100 w-100 chevron-icon-right"
                              style={{
                                rotate:
                                  currentLocation !== item.path && "90deg",
                              }}
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <div className="d-flex justify-content-center">
                <Button
                  className="w-100 text-danger border-danger"
                  title="Remove Account"
                  variant="secondary"
                />
              </div> */}

              {/* <div className="setting-route">
            <span className="info_img">
              <img src={termsAndCondition} />
            </span>
            <div className="sub-setting-route">
              <span className="text-color-route">Edit Profile</span>
              <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
                <span className="icon-chevron">
                  <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
                </span>
              </span>
            </div>
          </div>
          <div className="setting-route">
            <span className="info_img">
              <img src={termsAndCondition} />
            </span>
            <div className="sub-setting-route">
              <span className="text-color-route">Edit Profile</span>
              <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
                <span className="icon-chevron">
                  <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
                </span>
              </span>
            </div>
          </div>
          <div className="setting-route">
            <span className="info_img">
              <img src={termsAndCondition} />
            </span>
            <div className="sub-setting-route">
              <span className="text-color-route">Edit Profile</span>
              <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
                <span className="icon-chevron">
                  <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
                </span>
              </span>
            </div>
          </div> */}
            </div>
          </Col>
          <Col xs={12} sm={9}>
            <div className="d-flex justify-content-center h-100 m-0 ">
              {children}
            </div>
          </Col>
        </Row>
      </Container>
    </Header>
  ) : (
    <DoctorHeader>
     <Container>
        <Row className="d-flex justify-content-between align-items-center pt-3">
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
                Settings
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
      <Container
        className="py-3 my-3"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
        }}
      >
        <Row xs={24} sm={24} style={{ minHeight: "75vh" }}>
          <Col xs={12} sm={3} className="p-2">
            {/* Setting Routes */}
            <div className="routes-layout pb-0">
              <div>
                {patientProfileRoutes.map((item, index) => {
                  return (
                    <div
                      key={item.name + index.toString()}
                      className="setting-route"
                      onClick={() => {
                        navigate(item.path);
                      }}
                    >
                      <span className="info_img">
                        <img src={item.icon} />
                      </span>
                      <div className="sub-setting-route chevron-icon-right">
                        <span className="text-color-route">{item.name}</span>
                        <span
                          className={`icon-span chevron-icon-right ${
                            currentLocation !== item.path && "border-0"
                          }`}
                        >
                          <span className="icon-chevron chevron-icon-right">
                            <FaChevronRight
                              className="h-100 w-100 chevron-icon-right"
                              style={{
                                rotate:
                                  currentLocation !== item.path && "90deg",
                              }}
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <div className="d-flex justify-content-center">
                <Button
                  className="w-100 text-danger border-danger"
                  title="Remove Account"
                  variant="secondary"
                />
              </div> */}

              {/* <div className="setting-route">
            <span className="info_img">
              <img src={termsAndCondition} />
            </span>
            <div className="sub-setting-route">
              <span className="text-color-route">Edit Profile</span>
              <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
                <span className="icon-chevron">
                  <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
                </span>
              </span>
            </div>
          </div>
          <div className="setting-route">
            <span className="info_img">
              <img src={termsAndCondition} />
            </span>
            <div className="sub-setting-route">
              <span className="text-color-route">Edit Profile</span>
              <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
                <span className="icon-chevron">
                  <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
                </span>
              </span>
            </div>
          </div>
          <div className="setting-route">
            <span className="info_img">
              <img src={termsAndCondition} />
            </span>
            <div className="sub-setting-route">
              <span className="text-color-route">Edit Profile</span>
              <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
                <span className="icon-chevron">
                  <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
                </span>
              </span>
            </div>
          </div> */}
            </div>
          </Col>
          <Col xs={12} sm={9}>
            <div className="d-flex justify-content-center h-100 m-0 ">
              {children}
            </div>
          </Col>
        </Row>
      </Container>
    </DoctorHeader>
  );
}

export default Setting;
// <Header>
//   <Container>
//     <Row className="d-flex justify-content-between align-items-center pt-3">
//       <Col
//         className="d-flex flex-column justify-content-start"
//         xs={12}
//         md={6}
//       >
//         <div className="d-flex flex-row justify-content-start align-items-center">
//           <BackButton onClick={goBack} />
//           <span className="px-2" style={{ fontSize: "10px" }}>
//             |
//           </span>
//           <span
//             style={{
//               fontSize: "24px",
//               fontWeight: 500,
//               color: "#243D4C",
//             }}
//           >
//             Settings
//             {/* {currentLocation
//                 .split("-")
//                 .map(
//                   (item, index) =>
//                     item.charAt(0).toUpperCase() +
//                     item.slice(1).toString() +
//                     " "
//                 )} */}
//           </span>
//         </div>
//       </Col>
//       <Col
//         className="d-flex justify-content-end align-items-center"
//         xs={12}
//         md={6}
//       >
//         {/* <button className="d-flex flex-column p-2 pm-green-btn border-0">
//             <small className="text-xs text-light">
//               Upcoming Appointment
//             </small>
//             <small className="text-xs text-light">8:00 AM - 4:00 PM</small>
//           </button> */}
//       </Col>
//     </Row>
//   </Container>
//   <Container
//     className="py-3 my-3"
//     style={{
//       backgroundColor: "#fff",
//       borderRadius: "12px",
//     }}
//   >
//     <Row xs={24} sm={24} style={{minHeight: "75vh"}}>
//       <Col xs={12} sm={3} className="p-2">
//         {/* Setting Routes */}
//         <div className="routes-layout pb-0">
//           <div>
//             {patientProfileRoutes.map((item, index) => {
//               return (
//                 <div
//                   key={item.name + index.toString()}
//                   className="setting-route"
//                   onClick={() => {
//                     navigate(item.path);
//                   }}
//                 >
//                   <span className="info_img">
//                     <img src={item.icon} />
//                   </span>
//                   <div className="sub-setting-route chevron-icon-right">
//                     <span className="text-color-route">{item.name}</span>
//                     <span
//                       className={`icon-span chevron-icon-right ${
//                         currentLocation !== item.path && "border-0"
//                       }`}
//                     >
//                       <span className="icon-chevron chevron-icon-right">
//                         <FaChevronRight
//                           className="h-100 w-100 chevron-icon-right"
//                           style={{
//                             rotate:
//                               currentLocation !== item.path && "90deg",
//                           }}
//                         />
//                       </span>
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="d-flex justify-content-center">
//             <Button className="w-100 text-danger border-danger" title="Remove Account" variant="secondary" />
//           </div>

//           {/* <div className="setting-route">
//             <span className="info_img">
//               <img src={termsAndCondition} />
//             </span>
//             <div className="sub-setting-route">
//               <span className="text-color-route">Edit Profile</span>
//               <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
//                 <span className="icon-chevron">
//                   <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
//                 </span>
//               </span>
//             </div>
//           </div>
//           <div className="setting-route">
//             <span className="info_img">
//               <img src={termsAndCondition} />
//             </span>
//             <div className="sub-setting-route">
//               <span className="text-color-route">Edit Profile</span>
//               <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
//                 <span className="icon-chevron">
//                   <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
//                 </span>
//               </span>
//             </div>
//           </div>
//           <div className="setting-route">
//             <span className="info_img">
//               <img src={termsAndCondition} />
//             </span>
//             <div className="sub-setting-route">
//               <span className="text-color-route">Edit Profile</span>
//               <span className={`icon-span ${currentLocation == "/profile" && "border-0"}`}>
//                 <span className="icon-chevron">
//                   <FaChevronRight className="h-100 w-100" style={{ rotate: currentLocation !== "/profile" &&  "90deg"}} />
//                 </span>
//               </span>
//             </div>
//           </div> */}
//         </div>
//       </Col>
//       <Col xs={12} sm={9}>
//           <div className="d-flex justify-content-center h-100 m-0 ">
//             {children}
//         </div>
//       </Col>
//     </Row>
//   </Container>
// </Header>

// <Row>
// <Col xs={12} xl={12}>
//   <Navbar collapseOnSelect expand="xl">
//     <Container className="py-3">
//       <div onClick={()=>{navigate("/")}}>
//         <Navbar.Brand>
//           <img alt="logo" src={logo} className="w-100" />
//         </Navbar.Brand>
//       </div>

//       <Navbar.Toggle aria-controls="responsive-navbar-nav " />
//       <Navbar.Collapse id="responsive-navbar-nav ">
//         <Nav className="ms-lg-auto ">
//           <div className="d-flex align-items-center justify-content-start pe-3">
//             <div
//               className="d-flex align-items-center justify-content-center rounded-circle "
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 backgroundColor: "#e4eed4",
//               }}
//             >
//               <FaBell
//                 className="w-75 h-75"
//                 style={{ color: "#77AC28" }}
//               />
//               {/* <Image alt="logo" className="rounded-circle pe-4"  style={{width: "20px", height: "20px"}} /> */}
//             </div>
//           </div>

//           <button
//             // className={`${
//             //   variant === "secondary" ? "secondary-btn" : "primary-btn"
//             // } ${className} ${disabled ? "disabled-btn" : ""}`}
//             className="primary-btn px-3 py-2 border-0 position-relative"
//             onClick={(e) => {
//               e.preventDefault();
//               setShowDropDown(!showDropDown);
//             }}
//           >
//             <div className="d-flex w-100 h-100 flex-row align-items-center justify-content-between">
//               <div
//                 className="d-block rounded-circle me-2 bg-success"
//                 style={{ width: "40px", height: "40px" }}
//               >
//                 <Image src={besse_cooper} className="w-100 h-100" />
//                 {/* <Image alt="logo" className="rounded-circle pe-4"  style={{width: "20px", height: "20px"}} /> */}
//               </div>
//               <div className="d-flex flex-column p-0 me-2">
//                 <small className="text-light p-0">
//                   {/* <strong className="text-light">Bessie Cooper</strong> */}
//                   <strong className="text-light text-capitalize">
//                     Mr {currentPatient.name}
//                   </strong>
//                 </small>
//                 <small className="text-light  p-0">
//                   Patient Condition
//                 </small>
//               </div>
//               <div>
//                 <FaChevronDown
//                   className="rotated-icon"
//                   style={{
//                     color: "white !important",
//                     rotate: showDropDown ? "180deg" : "0deg",
//                   }}
//                 />
//               </div>
//               <div
//                 className={`${
//                   showDropDown ? "d-block" : "d-none"
//                 }   position-absolute text-danger dropdown-transition`}
//                 style={{ top: "60px", right: "0px", zIndex: 10 }}
//               >
//                 <ul className="shadow border">
//                   <li className="my_account_li ">My Account</li>
//                   <div
//                     className="d-flex justify-content-center w-100"
//                     style={{ color: "GrayText" }}
//                   >
//                     <hr
//                       className=" d-flex border-bottom p-0 m-0"
//                       style={{ width: "80%" }}
//                     />
//                   </div>
//                   <li onClick={handleClick}>Log out</li>
//                   <div className="d-flex justify-content-center w-100 text-light">
//                     <hr
//                       className=" d-flex border-bottom p-0 m-0"
//                       style={{ width: "80%" }}
//                     />
//                   </div>
//                 </ul>
//               </div>
//             </div>
//           </button>
//         </Nav>
//       </Navbar.Collapse>
//     </Container>
//   </Navbar>
// </Col>
// <Col xs={12} md={3}  xl={2} className="patient-navbar">
//   <div className="patient-SideBar">
//     <div
//       className={
//        ` ${location.pathname === "/patient-dashboard"
//           ? `patient-nav-active`
//           : "patient-nav"} cursor-pointer`
//       }
//       onClick={() => {
//         navigate("/patient-dashboard")
//       }}
//     >
//       <div className="patient-nav-img">
//         <img src={dashboardIcon} alt="dashboardIcon" />
//       </div>
//       <div>
//         Dashboard
//       </div>
//     </div>
//     <div
//       className={
//        `${ location.pathname === "/patient-myvisits"
//           ? `patient-nav-active`
//           : "patient-nav"} cursor-pointer`
//       }
//       onClick={() => {
//         navigate("/patient-myvisits")
//       }}
//     >
//       <div className="patient-nav-img">
//         <img src={myVisitsIcon} alt="dashboardIcon" />
//       </div>
//       <div>My Visits</div>
//     </div>
//     <div
//          className={
//          `${location.pathname === "/schedule-appointment"
//             ? `patient-nav-active`
//             : "patient-nav"} cursor-pointer`
//         }
//         onClick={() => {
//           navigate("/schedule-appointment")
//         }}

//     >
//       <div className="patient-nav-img">
//         <img src={myVisitsIcon} alt="dashboardIcon" />
//       </div>
//       <div>Schedule</div>
//     </div>
//     <div   className={
//           `${location.pathname === "/all-doctors" || location.pathname === "/doctor-details"
//             ? `patient-nav-active`
//             : "patient-nav"} cursor-pointer`
//         }
//         onClick={() => {
//           navigate("/all-doctors")
//         }}>
//       <div className="patient-nav-img">
//         <img src={myVisitsIcon} alt="dashboardIcon" />
//       </div>
//       <div
//       >Doctors</div>
//     </div>
//     {/* <div className="patient-nav" onClick={"/patient-prescriptions"}> */}
//     <div
//      className={
//       `${location.pathname === "/patient-prescriptions"
//         ? `patient-nav-active`
//         : "patient-nav"} cursor-pointer`
//     }
//     onClick={() => {
//       navigate("/patient-prescriptions")
//     }}>
//       <div className="patient-nav-img">
//         <img src={prcsiptionIcon} alt="dashboardIcon" />
//       </div>
//       <div>Prescriptions</div>
//     </div>
//     <div
//      className={
//      `cursor-pointer ${ location.pathname === "/patient-settings"
//         ? `patient-nav-active`
//         : "patient-nav"}`
//     }
//     onClick={() => {
//       // navigate("/patient-settings")
//     }}
//     >
//       <div className="patient-nav-img">
//         <img src={settingsIcon} alt="dashboardIcon" />
//       </div>
//       <div>Settings</div>
//       {/* </div> */}
//     </div>
//   </div>
//   <div className="patient-SideBar">
//     {/* <div className="patient-nav" onClick={"/patient-Dashboard"}> */}
//     <div
//       className="patient-nav"
//       // onClick={"/patient-prescriptions"}
//     >
//       <div className="patient-nav-img">
//         <img src={logoutIcon} alt="dashboardIcon" />
//       </div>
//       <div className="patient-nav-text">Logout</div>
//       {/* </div> */}
//     </div>
//   </div>
// </Col>
// <Col xs={12}  md={9} xl={10}>
//   {children}
// </Col>
// </Row>
