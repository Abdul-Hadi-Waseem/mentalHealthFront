import moment from "moment";
import React, { useState } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { FaCalendar, FaCreditCard, FaPhone, FaUser } from "react-icons/fa";
import { FaCakeCandles, FaComputer } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/team-1.png";
import Button from "./Common/Buttons/Button";
import { registerStudentForTest } from "./Forms/Teachers/TeachersAPIs";
import { TeacherDetailsType } from "./StudentDisplayComponent";
import { toast } from "react-toastify";

interface StudentDetailPropsType {
  show: boolean;
  onHide: () => void;
  placement: "start" | "end" | "top" | "bottom";
  studentData: SingleStudentType;
  teacherData: TeacherDetailsType;
}

export interface SingleStudentType {
  id: number;
  name: string;
  age: number;
  class: string;
  teacher_id: number;
  psc_score: number | null;
  psc_result: null | string;
  dob: string;
  section: string;
  guardian_name: string;
  phone: string;
}

const StudentDetailOffCanvas: React.FC<StudentDetailPropsType> = ({
  placement,
  show,
  onHide,
  studentData,
  teacherData,
}) => {
  const [selectedTest, setSelectedTest] = useState<null | number>(null);

  const handleTestSelect = (test) => {
    setSelectedTest(test);
  };
  function handleTestAssignment(testId: number): void {
    registerStudentForTest(testId, studentData?.id).then((res) => {
      console?.log(res, "dedit regiter res");
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message);
        onHide();
      } else {
        toast.error(res?.data?.message);
        onHide();
      }
    });
  }

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
              Invited by {teacherData?.name}
            </span>
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(167.39deg, #5E9CD3 0%, #3773A9 100.87%)",
          }}
          className="p-3 rounded"
        >
          {teacherData?.qualification === "qualified" ? (
            <div>
              {studentData?.psc_result === null ? (
                <div className="d-flex justify-content-center">
                  <div className="d-flex align-items-center">
                    <Row className="d-flex d-sm-flex-column justify-content-center align-items-center">
                      <Col className="w-100">
                        <select
                          className="mx-2"
                          value={selectedTest}
                          onChange={(e) => handleTestSelect(e.target.value)}
                          style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            backgroundColor: "white",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            outline: "0",
                          }}
                        >
                          <option value="">Select Test</option>
                          <option value="1">PSC</option>
                          <option value="2">ASQ</option>
                          <option value="3">SDQ</option>
                          <option value="4">ACE-Q</option>
                          <option value="5">SNAP-IV</option>
                          <option value="6">CES-DC</option>
                          <option value="7">MOVES</option>
                          <option value="8">SMQ</option>
                          <option value="9">CRAFT</option>
                          <option value="10">WFIRS-P</option>
                        </select>
                      </Col>
                      <Col className="d-flex justify-content-center align-items-center w-100">
                        <Button
                          title="Assign"
                          className="mx-2 px-5 py-3"
                          onClick={() => handleTestAssignment(selectedTest)}
                        />
                      </Col>
                    </Row>
                  </div>
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
                            // marginTop: '-8px',
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
                          className="text-white"
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
          ) : (
            <div>
              {studentData?.psc_result === null ? (
                <div className="d-flex justify-content-center">
                  <div className="d-flex flex-column align-items-center">
                    <Button
                      variant="success"
                      title="Register PSC Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(1)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register ASQ Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(2)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register SDQ Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(3)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register ACE-Q Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(4)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register SNAP-IV Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(5)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register CES-DC Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(6)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register MOVES Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(7)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register SMQ Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(8)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register CRAFT Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(9)
                      }
                    />
                    <br/>
                     <Button
                      variant="success"
                      title="Register WFIRS-P Test"
                      className="px-5 py-3"
                      type="submit"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTestAssignment(10)
                      }
                    />
                  </div>
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
                            // marginTop: '-8px',
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
                          className="text-white"
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
                  {studentData?.class}-{studentData?.section}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Display Date of Birth */}
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
                <FaCalendar />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Date of Birth</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {moment(studentData?.dob).format("DD-MM-YYYY")}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Display Guardian Name */}
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
                <FaUser />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Guardian Name</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {studentData?.guardian_name}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        {/* Display Phone */}
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
                <FaPhone />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 15px",
                }}
              >
                <div>
                  <h6>Phone</h6>
                </div>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {studentData?.phone}
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
