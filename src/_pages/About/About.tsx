import "./style.css";
import Heading from "../../components/Common/Heading";
import { Col, Container, Row } from "react-bootstrap";
import About__Image from "../../assets/images/Group 2.png";
import Advisor from "../../assets/images/advisor.png";
import { teams } from "../../constants/constants";
import Appointment from "../../components/Appointment";
const About = () => {
  return (
    <div className="about__section">
      <Heading title="About Us" />
      <Container className="about__support">
        <Row className="mt-4">
          <Col sm={12} lg={6} className="mb-4">
            <h2 className="about__hd px-2 ">
              Mental <span className="txt__green">Support</span> <br />
              was
              <span className="txt__green"> conceptualized</span>
            </h2>
            <p className="pt-3 px-2">
              Out of the desire to provide access to mental health services as
              early in a person’s life as possible.
              <br />
              <br /> As a team of parents and educators, we saw the impact of
              COVID-19 lock downs on children’s mental health.
              <br />
              <br /> Seventy percent (70%) of mental health problems have their
              onset in childhood and adolescence. Yet 75% of children with
              mental disorders do not access specialized services.
              <br />
              <br /> We’re on a mission to improve access to quality services
              for the most vulnerable populations of society..
              <br />
              <br /> Our team has extensive experience working with vulnerable
              populations and understand their needs exceptionally well.
            </p>
          </Col>
          <Col className="px-2 mt-4">
            <img src={About__Image} className="img-fluid" alt="About"/>
          </Col>
        </Row>
        <Row
          style={{
            background: "linear-gradient(180deg, #5693CA 0%, #3975AB 100%)",
            borderRadius: "12px",
          }}
          className="py-5 px-4 my-5"
        >
          <h2 className="text-white">
            Empowering parents, teachers and
            <br /> healthcare professionals
          </h2>
          <hr
            style={{
              borderBottom: "3px solid #fff",
              color: "#fff",
              width: "5%",
              marginLeft: "14px",
            }}
            className="my-4"
          />
          <p className="text-white">
            According to research, approximately 70% of mental illnesses have
            their onset during childhood or adolescence. Some common mental
            health disorders that can emerge during this time include anxiety
            disorders, depression, ADHD, and behavioral disorders such as
            conduct disorder or oppositional defiant disorder.
            <br />
            <br /> Early intervention and treatment for mental health disorders
            can be crucial for preventing the development of more serious
            problems later in life. It is important for parents, teachers, and
            healthcare professionals to be aware of the signs and symptoms of
            mental health problems in children and to take action to get them
            the help they need.
            <br />
            <br /> At Mental Support, we’re committed to empowering parents,
            teachers and healthcare professionals by providing them with the
            tools they need to identify early signs of mental health problems
            and seek help as early as possible. Early intervention can help
            improve outcomes and increase the chances of a successful recovery.
          </p>
        </Row>
        <Row className="justify-content-center text-center gy-4 px-3">
          <h2 className="py-5">Our Team</h2>
          {teams.map((team) => {
            return (
              <Col xs={12} sm={6} md={4} lg={4} key={team.id}>
                <div
                  className="team__box text-start pt-4 me-4 mb-4 "
                  style={{
                    backgroundImage: `url(${team.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: "500px",
                  }}
                >
                  <h4
                    style={{ fontSize: "20px" }}
                    className="text-white team__name"
                  >
                    {team.name}
                  </h4>
                  <span className="team__designation">{team.designation}</span>
                </div>
              </Col>
            );
          })}
        </Row>      
      </Container>
      <Appointment />
    </div>
  );
};

export default About;
