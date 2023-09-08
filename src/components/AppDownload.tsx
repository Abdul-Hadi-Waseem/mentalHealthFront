import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Google from "../assets/images/google.png";
import Apple from "../assets/images/apple.png";
import Mobile from "../assets/images/mobile.png";
function AppDownload() {
  return (
    <Container fluid className="app__download ps-5">
      <Row className="g-4">
        <Col sm={12} lg={6} className="download__btn">
          <div className="py-3">
            <h2 style={{ color: "#fff" }}>
              Mobile App Are Available on Google Playstore
            </h2>
          </div>
          <div>
            <a href="#" className="me-3">
              <img src={Google} height={60} />
            </a>
            <a href="#">
              <img src={Apple} height={180} width={200} />
            </a>
          </div>
        </Col>
        <Col>
          <img src={Mobile} className=" img-fluid app__mobile" />
        </Col>
      </Row>
    </Container>
  );
}
export default AppDownload;
