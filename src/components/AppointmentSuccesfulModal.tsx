import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
interface AppointmentSuccessfulModalProps {
  show: boolean;
  onHide: () => void;
}

export default function AppointmentSuccessfulModal(
  props: AppointmentSuccessfulModalProps
) {
  const navigate = useNavigate();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ border: "none", paddingBottom: "0px" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Congratulations!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ border: "none", paddingBottom: "0px" }}>
        <p className="modal_p_text">
          Appointment Successfully Booked. You will receive a notification and
          the doctor you selected will contact you.
        </p>
      </Modal.Body>
      <Modal.Footer style={{ border: "none", paddingTop: "0px" }}>
        <button
          className="form_submit_btn"
          style={{ marginTop: "0px" }}
          onClick={() => {
            navigate("/psc-test");
          }}
        >
          Go to PSC Test
        </button>
      </Modal.Footer>
    </Modal>
  );
}
