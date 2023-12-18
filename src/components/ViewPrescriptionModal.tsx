import { Modal, Form, Row, Col } from "react-bootstrap";
interface AppointmentSuccessfulModalProps {
  show: boolean;
  onHide: () => void;
  view: string;
  showprescriptionmodal: () => void;
  currentprescription: any; 
}
import { FaXmark } from "react-icons/fa6";

import config from "../configs/config";
export default function ViewPrescriptionModal(
  props: AppointmentSuccessfulModalProps
) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <div className="d-flex w-100 justify-content-end p-0 m-0">
        <span
          onClick={() => {
            props.onHide();
          }}
          style={{ cursor: "pointer" }}
        >
          <FaXmark />
        </span>
      </div> */}
      <Modal.Header
        style={{ marginTop: 0, border: "none", paddingBottom: "0px" }}
      >
        <Modal.Title
          className="d-flex w-100 flex-column p-0 m-0"
          id="contained-modal-title-vcenter"
        >
          <div className="d-flex w-100 justify-content-end p-0 m-0">
            <span
              onClick={() => {
                props.onHide();
              }}
              style={{ cursor: "pointer" }}
            >
              <FaXmark />
            </span>
          </div>
          <div>Clinical Feedback</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ border: "none", paddingBottom: "0px" }}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="create_prescription">
            <strong>Medical Prescription</strong>
          </Form.Label>
          <Form.Control
            className="rounded-3"
            id="create_prescription"
            as="textarea"
            rows={5}
            // value={
            //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
            // }
            value={props?.currentprescription?.description}
            readOnly
          />
        </Form.Group>
        {props.view === "doctor" && (
          <div>
            <strong>Medical Reports</strong>
          </div>
        )}

        <Row className="mb-3 pe-3" xs={2} md={4}>
          {
            props?.currentprescription?.medical_reports?.map((imageName, index) => (
              <Col key={index} className="p-2">
                <div className="d-flex h-100 w-100 border border-secondary">
                  <img
                    // src={previewUrl}
                    src={config.base_url+"/certificates/"+imageName}
                    alt={`Preview ${index}`}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </Col>
            ))}
        </Row>
      </Modal.Body>
      {props.view === "doctor" && (
        <Modal.Footer style={{ border: "none", paddingTop: "0px" }}>
          <button
            onClick={() => {
              props.showprescriptionmodal();
            }}
            className="form_submit_btn"
            style={{ marginTop: "0px" }}
          >
            Edit Prescription
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
