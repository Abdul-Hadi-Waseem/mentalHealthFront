import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import { getAllTests } from "../../components/Forms/Students/StudentAPIs";
import StudentTestsDisplay from "../../components/StudentTestsDisplay";
import InstituteHeader from "./Header/Header";

function StudentDashboard() {
  const { data } = useQuery("getAllStudentTests", () => getAllTests());
  return (
    <>
      <InstituteHeader />
      <Container>
        <Row className="d-flex flex-row">
          <Col
            className="d-flex flex-column justify-content-start py-5"
            xs={12}
            sm={8}
            md={9}
          >
            <h4 className="text-capitalize">Dashboard</h4>
          </Col>
          {/* <Col className="d-flex align-items-center" xs={12} sm={4} md={3}>
            <div>
              <Button
                variant="primary"
                title="Student Tests"
                className="px-5 py-3 mb-3"
                // onClick={() => handleShowOffCanvas()}
              />
            </div>
          </Col> */}
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
