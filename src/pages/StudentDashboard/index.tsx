import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import { getAllTests } from "../../components/Forms/Students/StudentAPIs";
import StudentTestsDisplay from "../../components/StudentTestsDisplay";
import InstituteHeader from "./Header/Header";
import d_db_male from "../../assets/images/d_db_male.png";
import doctor_img from "../../assets/images/doctor.svg";
import { useEffect, useState, useRef } from "react";

function StudentDashboard() {
  const { data } = useQuery("getAllStudentTests", () => getAllTests());
  const [studentinfo, setStudentinfo] = useState({});
  useEffect(() => {
    setStudentinfo(JSON.parse(localStorage.getItem("student_information")));
  }, []);
  console.log(studentinfo);
  return (
    <>
      <InstituteHeader />
      <Container>
        <Row className="d-flex flex-row">
        <Container>
          <Row className="d-flex flex-row flex-nowrap">
            <Col
              className="d-flex flex-column justify-content-start py-5"
              xs={12}
              md={6}
            >
              <p className="text-muted py-2">Good Morning</p>
              {/* <h4>Welcome Dr. Bessie Cooper</h4> */}
              <h4 className="text-capitalize">
                Welcome {studentinfo.name}
              </h4>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between">
            {/* <Col xs={12} xl={4} className="pe-md-3 ">           
            </Col> */}
            <Col xs={12} xl={12} className="ps-md-3 ">
              <div
                className="d-flex  mt-sm-4 m-xl-0  w-100 h-100 justify-content-between px-2 align-items-end  upcomming-appointments"
                style={{ borderRadius: "12px" }}
              >
                <div className="text-light ps-5">
                  <h3
                    style={{ fontSize: "34px" }}
                    className="text-light"
                  >
                    No New Tests Assigned
                  </h3>        
                  <br/>         
                </div>
                <div className="pe-4">
                  <img src={d_db_male} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        </Row>
        <Row>
          {data?.data?.data?.map((each) => (
            <StudentTestsDisplay key={each?.test_id} testData={each as any} />
          ))}
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default StudentDashboard;
