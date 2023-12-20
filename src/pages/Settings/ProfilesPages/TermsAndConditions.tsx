import { getToken } from "../../../utils";
import { FaBell, FaChevronDown } from "react-icons/fa6";
import Avatar from "react-avatar";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Setting from "../Setting";
import "./profilepages.css";

function TermsAndConditions() {
  return (
    <Setting>
      <Container fluid>
        <Container className="h-100 left-border px-2">
          <Row>
            <Col xs={12}>
              <h4 style={{ color: "#243D4C" }}>Term and Conditons</h4>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p>             
              </p>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={6}></Col>
          </Row>
        </Container>
      </Container>
    </Setting>
  );
}

export default TermsAndConditions;
