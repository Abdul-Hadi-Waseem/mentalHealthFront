import Container from "react-bootstrap/esm/Container";
import { workSteps } from "../constants/constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pointer from "../assets/icons/pointer.svg";
import line from "../assets/images/Vector 2.png";

function HowDoesItWork() {
  return (
    <Container className="work__section">
      <h3 className="text-sm text-end">How does it Work?</h3>
      <img src={line} className="work__steps__bg" />
      <Row className="work__section_steps ">
        {workSteps.map((steps) => {
          return (
            <Col sm={12} lg={4} key={steps.id} className={`${steps.align}`}>
              <div className="text-center">
                <img src={Pointer} className="steps__pointer" />
              </div>
              <Row className="pt-5 pe-5 g-0">
                <Col>
                  <h3 className="step__num">{steps.id}</h3>
                </Col>
                <Col>
                  <h4>{steps.title}</h4>
                  <p>{steps.description}</p>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default HowDoesItWork;
