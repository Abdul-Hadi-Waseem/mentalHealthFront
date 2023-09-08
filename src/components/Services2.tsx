import Container from "react-bootstrap/esm/Container";
import { services2 } from "../constants/constants";
import Services from "./Common/Services";

function Services2() {
  return (
    <Container className="service">
      {services2.map((service) => {
        return (
          <Services
            className=""
            key={service.id}
            heading={service.heading}
            icon={service.icon}
            description={service.description}
          />
        );
      })}
    </Container>
  );
}

export default Services2;
