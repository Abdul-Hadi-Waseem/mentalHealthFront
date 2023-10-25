import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Button from "../../components/Common/Buttons/Button";
import InstituteHeader from "./Header/Header";

function StudentDashboard() {
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
          <Col className="d-flex align-items-center" xs={12} sm={4} md={3}>
            <div>
              <Button
                variant="primary"
                title="Student Tests"
                className="px-5 py-3 mb-3"
                // onClick={() => handleShowOffCanvas()}
              />
            </div>
          </Col>
        </Row>
        {/* <TeacherDisplayComponent teachers={data?.data?.data} /> */}
        {/* <Row className="d-flex justify-content-between">
          {isLoading || isRefetching ? (
            <p>Loading...</p>
          ) : (
            <TeacherInvitation
              onHide={handleCloseOffCanvas}
              show={showOffCanvas}
              placement="end"
            />
          )}
        </Row> */}
      </Container>
      <ToastContainer />
    </>
  );
}

export default StudentDashboard;
