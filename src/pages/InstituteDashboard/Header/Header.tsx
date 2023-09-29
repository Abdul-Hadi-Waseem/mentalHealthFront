import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { appRoutes } from "./../../../constants/constants";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import logo from "../../assets/images/logo.svg";
import logo from "./../../../assets/images/logo.svg";
import besse_cooper from "./../../../assets/images/besse_cooper.png";
// import Button from "../Common/Buttons/Button";
import Button from "./../../../components/Common/Buttons/Button";
import Cookies from "js-cookie";
import { getToken } from "./../../../utils";
import { FaBell, FaChevronDown } from "react-icons/fa6";
import Avatar from "react-avatar";
import { Row, Col, Image, Modal } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

function InstituteHeader() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [btnTitle, setBtnTitle] = useState("Get Started");
  const token = getToken();
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setShowModal(false);
    // navigate("/doctor-dashboard");
  };

  useEffect(() => {
    if (token) {
      setBtnTitle("Logout");
    } else {
      setBtnTitle("Get Started");
    }
  }, [token]);
  function handleClick() {
    if (token) {
      Cookies.remove("token");
      navigate("/doctor-login");
    } else {
      navigate("/doctor-login");
    }
  }
  const goToDashBoard = () => {
    setShowModal(false);
    // navigate("/doctor-dashboard");
    handleClick();
  };
  let institute_information = JSON.parse(
    localStorage.getItem("institute_information")
  );

  // const btnAvatar = (
  //   <div className="d-flex flex-row">
  //     <div className="w-8 h-8 pe-4">
  //       <Image alt="logo" src={logo} width={50} circle />
  //     </div>
  //     <div className="d-flex flex-column p-0">
  //       <small className="text-light  p-0">
  //         <strong>Bessie Cooper</strong>
  //       </small>
  //       <small className="text-light  p-0">Psychiatrist</small>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <Navbar collapseOnSelect expand="xl">
        <Container className="py-3">
          <Link to="/">
            <Navbar.Brand>
              <img alt="logo" src={logo} className="w-100" />
            </Navbar.Brand>
          </Link>

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
                  <FaBell className="w-75 h-75" style={{ color: "#77AC28" }} />
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
                        {institute_information.name}
                      </strong>
                    </small>
                    <small className="text-light  p-0">Psychiatrist</small>
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
                      <li className="my_account_li ">My Account</li>
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

export default InstituteHeader;
