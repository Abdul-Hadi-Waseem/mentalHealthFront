import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Selectdoctor from "../../components/Selectdoctor";
import "./PatientDetails.css";
import Header from "../DoctorDashboard/Header/Header";
import { Container, Row, Col, Image } from "react-bootstrap";
import BackButton from "../../components/Common/Buttons/BackButton";
import UserCard from "../../components/Common/UserCard";
import doctor_img from "./../../assets/images/doctor.svg";
import patient_details from "./../../assets/images/patient_details.png";
// import patient_details from "./../../assets/images/d_db_female.png";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import config from "../../configs/config";
import Button from "../../components/Common/Buttons/Button";
import ClinicalFeedback from "../../components/Common/ClinicalFeedback/ClinicalFeedback";
// import CreatePrescriptionModal from "../../components/ViewPrescriptionModal";
import ViewPrescriptionModal from "../../components/ViewPrescriptionModal";
import CreatePrescriptionModal from "../../components/CreatePrescriptionModal";
import EditPrescriptionModal from "../../components/EditPrescriptionModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../utils";

const PatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let currentLocation = location.pathname.split("/").slice(-1).toString();
  const [current_patient, setCurrentPatient] = useState<any>(
    JSON.parse(localStorage.getItem("user"))
  );
  const [createPrescModal, setCreatePrescModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editPrescModal, setEditPrescModal] = useState(false);

  const [loader, setLoader] = useState(true);
  const [reLoad, setreLoad] = useState(false);
  const [prescriptions, setUserPrescriptions] = useState([]);
  const [currentPrescription, setCurrentPrescription] = useState({ id: "" });

  // console.log("userProfile", userProfiles[0].name);
  // console.log("currentPrescription",currentPrescription);

  const goBack = () => {
    navigate(-1);
  };
  const modalToShow = (current_prescription: any) => {
    setViewModal(true);
    setCurrentPrescription(current_prescription);
  };
  const handleReload = () => {
    setreLoad(!reLoad);
  };

  useEffect(() => {
    (async () => {
      try {
        const { patient_id, doctor_id, id } = current_patient;
        const response = await axios.get(
          `${config.base_url}/doctor/get_prescriptions/${doctor_id}/${patient_id}/${id}`, {
            headers: {
              'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
            }
          }
        );
        console.log("get_prescriptionsResponse", response);
        if (response?.data?.data) {
          setUserPrescriptions(response?.data?.data);
          setLoader(false);
        } else {
          toast.error("Prescriptions Not Found");
          setLoader(false);
        }
      } catch (error) {
        console.log(`error in get_prescriptionsResponse`, error.message);
      }
    })();
  }, [reLoad]);
  useEffect(() => {
    if (currentPrescription?.id)
      localStorage.setItem(
        "current_prescription",
        JSON.stringify(currentPrescription)
      );
  }, [currentPrescription]);

  return (
    <Header>
      <div>
        <Container>
          <Row className="d-flex justify-content-between align-items-center pt-5">
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
          </Row>
        </Container>
        <Container
          className="mt-3 p-3"
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            paddingLeft: "12px !important",
            paddingRight: "12px",
          }}
        >
          <Row className="px-3 ">
            <Col xs={8} md={4} lg={2} className="p-0 ">
              <Image
                className="w-100"
                style={{
                  maxHeight: 205,
                  maxWidth: 236,
                }}
                rounded
                src={patient_details}
              />
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={10}
              className="d-flex ps-3 align-items-start  p-0"
            >
              <div className="d-flex  w-100 pb-3 justify-content-between align-items-center border-bottom">
                <div className="d-flex flex-column">
                  <span
                    className="text-capitalize"
                    style={{
                      fontWeight: 500,
                      fontSize: 34,
                      lineHeight: "50px",
                    }}
                  >
                    {/* Jenny wilson */}
                    {current_patient.name}
                  </span>
                  <small className="text-muted">Patient Condition</small>
                </div>
                <div>
                  <Button
                    variant="primary"
                    title="Create Prescription"
                    className="p-0 p-3"
                    onClick={() => {
                      setCreatePrescModal(true);
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="p-3">
              <strong>Visits</strong>
            </Col>
          </Row>

          <Row>
            {loader ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  height: "auto",
                  width: "100%",
                }}
              >
                {" "}
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#5E9CD3" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : prescriptions.length == 0 ? (
              <div className="d-flex  justify-content-center">
                No Prescription found
              </div>
            ) : (
              prescriptions.map((item, index) => {
                return (
                  <Col xs={12} sm={6} md={6} lg={4} xl={3} className="p-3">
                    <ClinicalFeedback item={item} setModalShow={modalToShow} />
                  </Col>
                );
              })
            )}
          </Row>
          <CreatePrescriptionModal
            show={createPrescModal}
            onHide={() => setCreatePrescModal(false)}
            handleReload={handleReload}
          />
          <ViewPrescriptionModal
            show={viewModal}
            onHide={() => setViewModal(false)}
            view="doctor"
            currentprescription={currentPrescription}
            showprescriptionmodal={() => {
              setViewModal(false);
              setEditPrescModal(true);
            }}
          />
          <EditPrescriptionModal
            show={editPrescModal}
            onHide={() => setEditPrescModal(false)}
            currentPrescription={currentPrescription}
            handleReload={handleReload}
          />
        </Container>
        <ToastContainer />
      </div>
    </Header>
  );
};

export default PatientDetails;

// <div
//   className="d-flex justify-content-center align-items-center"
//   style={{
//     height: "90vh",
//     width: "100%",
//   }}
// >
//   {" "}
//   <Spinner
//     animation="border"
//     role="status"
//     style={{ color: "#5E9CD3" }}
//   >
//     <span className="visually-hidden">Loading...</span>
//   </Spinner>
// </div>
