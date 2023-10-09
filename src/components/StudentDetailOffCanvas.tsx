import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import Button from "./Common/Buttons/Button";
import { useQuery } from "react-query";
import img from "../assets/images/team-1.png";
import { BsArrowRight } from "react-icons/bs";
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { FaCakeCandles, FaCalendarDays, FaComputer } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface StudentDetailPropsType {
  show: boolean;
  onHide: () => void;
  placement: "start" | "end" | "top" | "bottom";
  studentData: SingleStudentType;
  teacherName: string;
}

type SingleStudentType = {
  id: string;
  name: string;
  age: string;
  class: string;
  teacher_id: number;
  psc_score: number;
  psc_result: string;
};

// const {data} = useQuery("GetSingleStudentDetail", ()=>)

const StudentDetailOffCanvas: React.FC<StudentDetailPropsType> = ({
  placement,
  show,
  onHide,
  studentData,
  teacherName,
}) => {
  const navigate = useNavigate();
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
          Student Profile
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
              src={img}
              alt="Student"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <div>
            <h6 style={{ color: "white", fontWeight: "600" }}>
              {studentData?.name}
            </h6>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Student
            </span>
            {/* <br /> */}
            <span style={{ color: "white", fontSize: "14px" }}>
              Invited by {teacherName}
            </span>
          </div>
        </div>

        {/* Second Row */}
        <div
          style={{
            background:
              "linear-gradient(167.39deg, #5E9CD3 0%, #3773A9 100.87%)",
          }}
          className="p-3 rounded"
        >
          {studentData?.psc_result === null ? (
            <div className="d-flex justify-content-center">
              <Button
                variant="success"
                title="Start PSC Test"
                className="px-5 py-3"
                type="submit"
                onClick={() => navigate("/psc-test-node")}
              />
            </div>
          ) : (
            <div>
              <div>
                <h6 className="text-white">PSC Test</h6>
              </div>
              <div>
                <div>
                  <span className="text-white" style={{ fontSize: "14px" }}>
                    Score: {studentData?.psc_score}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      className="text-white"
                      style={{
                        fontSize: "14px",
                        // marginTop: "-8px",
                      }}
                    >
                      {studentData?.psc_result}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "-6px",
                    }}
                  >
                    <span
                      className="text-white "
                      style={{
                        fontSize: "14px",
                        marginTop: "-6px",
                        fontWeight: "300",
                        cursor: "pointer",
                      }}
                    >
                      Share with Administration
                    </span>
                    <p
                      className="text-white px-2"
                      style={{ marginTop: "-6px" }}
                    >
                      <BsArrowRight />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Third Row */}
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
                <FaCreditCard />
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
                  <h6>Student Id</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {studentData?.id}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Fourth Row */}
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
                <FaCakeCandles />
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
                  <h6>Age</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {studentData?.age} Years Old
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Fifth Row */}
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
                <FaComputer />
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
                  <h6>Class</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  Class {studentData?.class}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default StudentDetailOffCanvas;
