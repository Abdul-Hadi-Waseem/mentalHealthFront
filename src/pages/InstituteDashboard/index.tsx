import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
// import "./dashboard.css";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import Button from "../../components/Common/Buttons/Button";
import { getAllTeachers } from "../../components/Forms/Institutes/InstituteAPIs";
import TeacherDisplayComponent from "../../components/TeacherDisplayComponent";
import TeacherInvitation from "../../components/TeacherInvitation";
import TeacherReactivate from "../../components/TeacherReactivate";
import InstituteHeader from "./Header/Header";

function InstituteDashBoard() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showOffReactivateCanvas, setShowOffReactivateCanvas] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
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
    setShowOffReactivateCanvas(true);
  };
  const handleCloseOffReActivateCanvas = () =>
    setShowOffReactivateCanvas(false);
  const navigate = useNavigate();

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
        <Row className="d-flex justify-content-between">
          {isLoading || isRefetching ? (
            <p>Loading...</p>
          ) : (
            <TeacherReactivate
              onHide={handleCloseOffReActivateCanvas}
              show={showOffReactivateCanvas}
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
