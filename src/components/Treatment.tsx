import { Col, Container, Row } from "react-bootstrap";
import Treatment_Img from "../assets/images/treatment.png";
function Treatment() {
  return (
    <Container className="treatment__section">
      <Row className="g-5 align-items-center">
        <Col lg={6} sm={12}>
          <img src={Treatment_Img} className="w-100" />
        </Col>
        <Col lg={6} sm={12} className="ps-5">
          <h2>
            How is depression <span className="txt__green">treated?</span>
          </h2>
          <p className="pt-4">
            Depression can be treated in a variety of ways. The most effective
            treatment for depression in adults is usually a combination of
            psychotherapy and medication, but the best approach depends on the
            individual's needs and preferences. It's important to work with a
            mental health professional to determine the most appropriate
            treatment plan.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
export default Treatment;
