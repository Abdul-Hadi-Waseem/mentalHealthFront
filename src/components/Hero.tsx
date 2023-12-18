import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "./Common/Buttons/Button";
import heroImage from "../assets/images/hero_img.png";
import { useNavigate } from "react-router-dom";
import scrollDown from "../assets/icons/scroll_down.svg";

function Hero() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/select-user");
  }
  return (
    <div className="hero py-5">
      <Container className="pt-5">
        <Row>
          <Col sm={12} lg={6}>
            <h1 className="hero__txt pb-3">
              Adult and{" "}
              <span className="hero__txt__green">Youth Mental Health</span>{" "}
              Services at <br />
              your <span className="hero__txt__green">Fingertips</span>
            </h1>
            <p className="hero__sub pb-4">
              Mental Support offers access to a trained and qualified team of
              clinicians though our on demand network for individuals seeking
              counseling services.
            </p>
            <Button
              title="Get Started"
              className="hero__btn"
              onClick={handleClick}
            />
          </Col>

          <Col sm={12} lg={6}>
            <img src={heroImage} className="w-100" />
          </Col>
        </Row>
        <div className="text-center">
          <a className="scroll__down d-flex flex-column" href="#professionals">
            <img
              src={scrollDown}
              alt="scroll down"
              className="w-100 pb-2"
              height={35}
              width={35}
            />
            <span>Scroll Down</span>
          </a>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
