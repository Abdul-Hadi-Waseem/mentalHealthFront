import { Container } from "react-bootstrap";
import Button from "./Common/Buttons/Button";

function Appointment() {
  return (
    <Container
      fluid
      className="text-center appointment__section d-flex flex-column justify-content-center"
    >
      <h2>
        Take the first step to <br />
        better mental health!
      </h2>
      <p className="py-4">
        Get in touch today to take charge of your <br />
        mental well being!
      </p>
      {/* <div className="text-center">
        <Button title="Book an Appointment" />
      </div> */}
    </Container>
  );
}

export default Appointment;
