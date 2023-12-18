import Container from "react-bootstrap/esm/Container";
import { services1 } from "../constants/constants";
import Services from "./Common/Services";

function Services1() {
  return (
    <Container className="service">
      {services1.map((service) => {
        return (
          <Services
          
            className="service__1"
            key={service.id}
            heading={service.heading}
            icon={service.icon}
          />
        );
      })}
    </Container>
  );
}

export default Services1;
