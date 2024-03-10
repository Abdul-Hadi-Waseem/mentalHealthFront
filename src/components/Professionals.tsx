// import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import doc_group from "../assets/images/doc_group.png";
import des1 from "../assets/images/Vector 92.png";
import des2 from "../assets/images/Vector 360.png";

function Professionals() {
  return (
    <div className="pro" id="professionals">
      <Row className="pro__section pe-5">
        <Col sm={12} lg={6} className="pro__images">
          <img src={des1} className="des1" />
          <img src={des2} className="des2" />
          <img className="img-fluid" src={doc_group} />
        </Col>

        <Col className="px-4" sm={12} lg={6}>
          <h2 className="hero__txt pb-4">
            <span className="hero__txt__green">Professional</span>, licensed,
            <br /> and{" "}
            <span className="hero__txt__green">vetted therapists</span> <br />
            who you can trust
          </h2>
          <p className="pro__details">
            At Mental Support, you’re in good hands. Our team of clinicians are
            vetted and highly experienced at providing counseling services in a
            secure and confidential manner.
            <br /> <br /> Our clinicians focus on improving mental health and
            support our clients throughout their journey in life.
            <br /> <br /> All our clinicians go through a stringent verification
            process which ensures that you’re always matched with a vetted
            clinician.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Professionals;
