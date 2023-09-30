import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import InstituteHeader from "../pages/InstituteDashboard/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import BackButton from "./Common/Buttons/BackButton";
import { useQuery } from "react-query";
import { getTeacherDetail } from "./Forms/Institutes/InstituteAPIs";

const TeacherDetail = () => {
  const { id } = useParams();

  const {} = useQuery("getInstitute'sTeacherDetail", () =>
    getTeacherDetail(id)
  );

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
    </>
  );
};

export default TeacherDetail;
