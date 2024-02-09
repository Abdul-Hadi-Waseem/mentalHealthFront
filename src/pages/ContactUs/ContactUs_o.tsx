import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ContactUs.css";
import ContactForm from "../../components/Forms/ContactForm";
import Contact_img from "../../assets/images/contact__img.png";
import Phone from "../../assets/icons/phone.svg";
import Email from "../../assets/icons/email.svg";
import Tooltips from "../../components/Common/Tooltips";
import { socialIcons } from "../../constants/constants";
function ContactUs() {
  const [arbitrary, setArbitary] = useState<boolean | string>(false);

  function success(result : string) {
    setArbitary(result);
    setTimeout(()=>{
      setArbitary(false);
    }, 3000)
  }
  return (
    <>
      {arbitrary && <Tooltips arbitrary={arbitrary} />}
      <Container className="contact__section">
        <div className="text-center contact__heading">
          <h1>Contact Us</h1>
        </div>
        <Row className="g-5">
          <Col className="px-4" lg={7}>
            <h2>Get in Touch</h2>
            <ContactForm success={success} />
            <Row className="pt-4 align-items-center">
              <Col className="social-div d-flex" lg={6} sm={12}>
                <div className="d-flex align-items-center">
                  <img src={Email} />
                  <div className="ps-3">
                    <h5
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Email
                    </h5>
                    <span
                      className="txt__green"
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {/*info@mentalsupport*/}
			Help@mentalsupport.ca
                    </span>
                  </div>
                </div>
              </Col>
              <Col className="p-0 mt-2 text-center d-none d-lg-block" lg={1} sm={0}>
                <div className="vr"></div>
              </Col>
              <Col lg={5} sm={12}>
                <div className="social__icons d-flex justify-content-center">
                  {socialIcons.map((socialIcon) => {
                    return (
                      <a key={socialIcon.id} href={socialIcon.link}>
                        <img src={socialIcon.src} alt={socialIcon.name} />
                      </a>
                    )
                  })}
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <img src={Contact_img} className="w-100" />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ContactUs;
