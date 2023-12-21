import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Google from "../assets/images/google.png";
import Apple from "../assets/images/apple.png";
import Mobile from "../assets/images/mobile.png";
function AppDownload() {
  const handleImageClick = () => {
    toast.warning("Mobile app is coming soon");
  };
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
            <a style={{'cursor':'pointer'}} className="me-3" onClick={handleImageClick}>
              <img src={Google} height={60} alt="Google" />
            </a>
            <a style={{'cursor':'pointer'}} onClick={handleImageClick}>
              <img src={Apple} height={180} width={200} alt="Apple" />
            </a>           
          </div>
        </Col>
        <Col>
          <img src={Mobile} className="img-fluid app__mobile" />
        </Col>
      </Row>
      <ToastContainer/>
    </Container>
  );
}
export default AppDownload;
