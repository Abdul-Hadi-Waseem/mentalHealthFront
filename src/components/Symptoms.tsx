import { Container } from "react-bootstrap";
import { symptoms } from "../constants/constants";

function Symptoms() {
  return (
    <Container>
      <h2 className=" mb-4 px-2">What are the symptoms of Depression?</h2>
      <h5 className="py-4 px-2">
        The symptoms of depression can vary from person to person, but common
        symptoms include:
      </h5>
      <ol className="list-group list-group-numbered px-2">
        {symptoms.map((symptom) => (
          <li
            key={symptom.id}
            className="list-group-item list-group-item-action border-0 bg-transparent ps-0"
            style={{ color: "#243D4C" }}
          >
            {symptom.description}
          </li>
        ))}
      </ol>
      <p style={{ color: "#DB5A5A" }} className="pt-3 text-center px-2">
        It's important to note that everyone experiences these symptoms to some
        degree at times in their life, but depression is diagnosed when these
        symptoms persist for two weeks or more and significantly impair an
        individual's daily functioning and quality of life. If you or someone
        you know is experiencing symptoms of depression, it's important to seek
        help from a mental health professional.
      </p>
    </Container>
  );
}

export default Symptoms;
