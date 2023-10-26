import { Col, Container, Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa6";
import Button from "./Common/Buttons/Button";
import { useNavigate } from "react-router-dom";

export interface TestDataType {
  student_id: number;
  teacher_id: number;
  test_id: number;
  score: number | null;
  teacher_name: string;
  test_name: string;
}

const StudentTestsDisplay = ({ testData }: TestDataType | any) => {
  const navigate = useNavigate();

  function handleAttempt(): void {
    if (testData?.test_id === 1) navigate("/psc-test-node");
  }

  console?.log(testData, "dedit test data");

  return (
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
            <FaPen />
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
              <h6>{testData?.test_name} Test</h6>
            </div>
            <span className="text-secondary" style={{ fontSize: "14px" }}>
              Invited by {testData?.teacher_name}
            </span>
          </div>
        </Col>
        <Col
          style={{ background: "#F6F7F9" }}
          className="px-3 py-2 rounded d-flex justify-content-center align-items-center"
        >
          Score:{" "}
          {testData?.score === null ? "Not Attempted Yet" : testData?.score}
        </Col>
        {testData?.score === null ? (
          <Col
            style={{ background: "#F6F7F9" }}
            className="px-3 py-2 rounded d-flex"
          >
            <Button
              variant="success"
              title="Attempt Test"
              className="px-5 py-3"
              type="submit"
              onClick={handleAttempt}
            />
          </Col>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
};

export default StudentTestsDisplay;
