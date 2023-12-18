import { Col, Container, Row } from "react-bootstrap";
import Button from "./Common/Buttons/Button";
import Depression_Img from "../assets/images/depression.png";
import { useNavigate } from "react-router-dom"; 

function Depression() {
  const navigate = useNavigate();
  return (
    <Container className="depression__section">
      <Row className="g-5 align-items-center">
        <Col md={6} className="pe-md-5 ">
          <h1 className=" px-2">
            What is <span className="txt__green">Depression?</span>
          </h1>
          <p className="py-4 px-2">
            Depression is a mental health condition characterized by persistent
            feelings of sadness, hopelessness, and a loss of interest in
            activities that a person once enjoyed. It can also include physical
            symptoms such as changes in appetite or sleep, fatigue, and
            difficulty concentrating. Depression is a serious illness that
            requires professional treatment.
          </p>
          <h5 className=" px-2">How can we help?</h5>
          <p className="py-4 px-2">
            Our trained and qualified clinicians can play a key role in the
            treatment and management of depression by providing a range of
            interventions tailored to your needs.
          </p>
          <Button title="Get Started" className="depression__btn" onClick={()=> navigate("/select-user")}/>
        </Col>
        <Col md={6} sm={12}>
          <img src={Depression_Img} className="img-fluid w-100 px-2" alt="Depression" />
        </Col>
      </Row>
    </Container>
  );
}

export default Depression;
