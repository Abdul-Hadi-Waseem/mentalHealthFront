import React from "react";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa6";
import { FaAddressCard, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import moment from "moment";
import { useQuery } from "react-query";
import { removeTeacherAccount } from "./Forms/Institutes/InstituteAPIs";
import { useNavigate } from "react-router-dom";

interface TeacherDetailPropsType {
  show: boolean;
  onHide: () => void;
  placement: "start" | "end" | "top" | "bottom";
  teacherData: TeacherDetailsType;
}

type TeacherDetailsType = {
  id: number;
  name: string;
  dob: string;
  gender: string;
  address: string;
  state: string;
  zip_code: string;
  city: string;
  country: string;
  institute_id: number;
  email: string;
  image: string;
  phone?: string;
  qualification: "qualified" | "unqualified";
  classes: string;
};

// const {data} = useQuery("GetSingleStudentDetail", ()=>)

const TeacherProfileOffCanvas: React.FC<TeacherDetailPropsType> = ({
  placement,
  show,
  onHide,
  teacherData,
}) => {
  const navigate = useNavigate();
  const { refetch: deleteTeacherAccount, isRefetching } = useQuery(
    "removeasingleteacheraccount",
    () => removeTeacherAccount(teacherData?.id),
    {
      onSuccess: (res) => {
        if (res?.status === 200) {
          toast.success(res?.data?.message);
          setTimeout(() => {
            navigate(-1);
          }, 1500);
        }
      },
      onError: (err: any) => {
        console.log(err, "ERROR DELETED");
        toast.error(err?.response?.data?.message);
      },
      enabled: false,
    }
  );

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement={placement}
      style={{
        width: "280px",
        maxWidth: "83%",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title
          style={{ textAlign: "left", width: "100%", marginTop: "3rem" }}
        >
          Teacher Profile
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{
            background:
              "linear-gradient(167.39deg, #A0D256 0%, #77AC28 100.87%)",
          }}
          className="d-flex flex-column align-items-center py-2 w-100 rounded my-2"
        >
          <div
            className="doctor_img rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "80px", // Adjust the width as needed
              height: "80px", // Make it square to maintain a circular shape
              objectFit: "cover", // This ensures the image is fully contained within the circle
              border: "4px solid white",
            }}
          >
            <img
              src={teacherData?.image}
              alt="Teacher Image"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <div>
            <h6 style={{ color: "white", fontWeight: "600" }}>
              {teacherData?.name}
            </h6>
          </div>
          <div>
            <span
              style={{ color: "white", fontSize: "14px", textAlign: "center" }}
            >
              {teacherData?.qualification === "qualified" ? (
                <span>
                  {teacherData.qualification.charAt(0).toUpperCase() +
                    teacherData.qualification.slice(1)}{" "}
                  Teacher
                </span>
              ) : (
                <span>Teacher</span>
              )}
            </span>
          </div>
        </div>

        {/* Second Row */}
        <Container fluid className="my-2">
          <Row>
            <Col
              style={{ background: "#F6F7F9" }}
              className="px-3 py-2 rounded d-flex"
            >
              <div
                style={{
                  fontSize: "24px",
                  background: "#E3EAF1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "18px",
                  borderRadius: "20px",
                  color: "#3773A9",
                }}
              >
                <FaEnvelope />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  //   alignItems: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Email Address</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "12px" }}>
                  {teacherData?.email}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* third */}
        <Container fluid className="my-2">
          <Row>
            <Col
              style={{ background: "#F6F7F9" }}
              className="px-3 py-2 rounded d-flex"
            >
              <div
                style={{
                  fontSize: "24px",
                  background: "#E3EAF1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "18px",
                  borderRadius: "20px",
                  color: "#3773A9",
                }}
              >
                <FaBuilding />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  //   alignItems: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Institute Name</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "12px" }}>
                  {teacherData?.institute_id}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* fourth */}
        <Container fluid className="my-2">
          <Row>
            <Col
              style={{ background: "#F6F7F9" }}
              className="px-3 py-2 rounded d-flex"
            >
              <div
                style={{
                  fontSize: "24px",
                  background: "#E3EAF1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "18px",
                  borderRadius: "20px",
                  color: "#3773A9",
                }}
              >
                <FaCalendarAlt />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  //   alignItems: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Date of Birth</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "12px" }}>
                  {moment(teacherData?.dob).format("DD-MMMM-YYYY")}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* fifth */}
        <Container fluid className="my-2">
          <Row>
            <Col
              style={{ background: "#F6F7F9" }}
              className="px-3 py-2 rounded d-flex"
            >
              <div
                style={{
                  fontSize: "24px",
                  background: "#E3EAF1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "18px",
                  borderRadius: "20px",
                  color: "#3773A9",
                }}
              >
                <BsGenderAmbiguous />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  //   alignItems: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Gender</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "12px" }}>
                  {teacherData?.gender}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* sixth */}
        <Container fluid className="my-2">
          <Row>
            <Col
              style={{ background: "#F6F7F9" }}
              className="px-3 py-2 rounded d-flex"
            >
              <div
                style={{
                  fontSize: "24px",
                  background: "#E3EAF1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "18px",
                  borderRadius: "20px",
                  color: "#3773A9",
                }}
              >
                <PiStudent />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  //   alignItems: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Classes</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "12px" }}>
                  {teacherData?.classes ? teacherData?.classes : "-"}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* seventh */}
        <Container fluid className="my-2">
          <Row>
            <Col
              style={{ background: "#F6F7F9" }}
              className="px-3 py-2 rounded d-flex"
            >
              <div
                style={{
                  fontSize: "24px",
                  background: "#E3EAF1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "18px",
                  borderRadius: "20px",
                  color: "#3773A9",
                }}
              >
                <FaAddressCard />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  //   alignItems: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Address</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "12px" }}>
                  {teacherData?.address}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Classes */}

        {/* REmove */}
        <Container fluid className="my-2">
          <Row>
            <Col className="px-3 py-2 rounded d-flex justify-content-center">
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={() => deleteTeacherAccount()}
                disabled={isRefetching}
              >
                Remove Teacher
              </Button>
            </Col>
          </Row>
        </Container>
      </Offcanvas.Body>
      <ToastContainer />
    </Offcanvas>
  );
};

export default TeacherProfileOffCanvas;
