import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InstituteHeader from "../pages/InstituteDashboard/Header/Header";
import { Container, Row, Col, Placeholder } from "react-bootstrap";
import BackButton from "./Common/Buttons/BackButton";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import {
  getStudentsOfATeacher,
  getTeacherDetail,
} from "./Forms/Institutes/InstituteAPIs";
import StudentDisplayComponent from "./StudentDisplayComponent";
import TeacherProfileOffCanvas from "./TeacherProfileOffCanvas";

const TeacherDetail = () => {
  const { id } = useParams();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const { data, isLoading, isRefetching } = useQuery(
    "getInstitute'sTeacherDetail",
    () => getTeacherDetail(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: students,
    isLoading: studentsIsLoading,
    isRefetching: studentsIsRefetching,
  } = useQuery(
    "getInstitute'sTeacher'sStudets",
    () => getStudentsOfATeacher(id),
    {
      refetchOnWindowFocus: false,
      enabled: !!data?.data?.data?.id,
      onError: (err: any) => {
        toast.error("Error Fetching Students, Please try again");
      },
    }
  );

  const handleCloseOffCanvas = () => setShowOffCanvas(false);

  const handleShowOffCanvas = () => {
    console.log("function");
    setShowOffCanvas(true);
  };
  const navigate = useNavigate();
  return (
    <>
      <InstituteHeader />
      <Container>
        <Row className="d-flex justify-content-between align-items-center pt-5">
          <Col
            className="d-flex flex-column justify-content-start"
            xs={12}
            md={6}
          >
            <div className="d-flex flex-row justify-content-start align-items-center">
              <BackButton onClick={() => navigate(-1)} />
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
                Teacher Detail
              </span>
            </div>
          </Col>
        </Row>
      </Container>
      {isLoading || isRefetching ? (
        <Container>Loading...</Container>
      ) : (
        <Container>
          <Row
            className="flex flex-wrap justify-content-start w-100 border pt-4 mb-1"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              marginRight: "0px",
              marginLeft: "0px",
            }}
          >
            <Row>
              <Col
                xs={12}
                md={2}
                className="d-flex justify-content-center align-items-center"
              >
                <div
                  className="doctor_img "
                  style={{ width: "100px", objectFit: "contain" }}
                >
                  <img
                    src={data?.data?.data?.image}
                    alt="doctor"
                    style={{ width: "100%", borderRadius: "15%" }}
                  />
                </div>
              </Col>
              <Col xs={12} md={10}>
                <Row className="px-3">
                  <Col xs={12} md={9}>
                    {/* <h3 className="doctor-name">Richard Muldoone</h3> */}
                    <h3 className="doctor-name">{data?.data?.data?.name}</h3>
                    <p>Teacher</p>
                  </Col>
                  <Col xs={12} md={3}>
                    <button
                      className="doctor_card_btn text-center"
                      onClick={handleShowOffCanvas}
                    >
                      {"View Profile"}
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <hr style={{ width: "100%" }} />
              </Col>
              <Row className="m-3"></Row>
            </Row>
          </Row>
        </Container>
      )}
      <Container>
        <StudentDisplayComponent
          students={students?.data?.data}
          teacherData={data?.data?.data}
        />
      </Container>
      <Container>
        <TeacherProfileOffCanvas
          teacherData={data?.data?.data}
          onHide={handleCloseOffCanvas}
          placement="end"
          show={showOffCanvas}
        />
      </Container>
      <ToastContainer />
    </>
  );
};

export default TeacherDetail;
