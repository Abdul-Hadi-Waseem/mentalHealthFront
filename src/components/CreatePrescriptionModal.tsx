import { Modal, Form, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import config from "../configs/config";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface AppointmentSuccessfulModalProps {
  show: boolean;
  onHide: () => void;
  handleReload: any;
}

export default function CreatePrescriptionModal(
  props: AppointmentSuccessfulModalProps
) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [current_patient, setCurrentPatient] = useState<any>(
    JSON.parse(localStorage.getItem("user"))
  );
  console.log("current", current_patient);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
  const supportedFormats = ["image/png", "image/jpg", "application/pdf"];

  const initialValues = {
    medicalPrescription: "",
    medicalReports: "",
  };
  const validationSchema = Yup.object({
    medicalPrescription: Yup.string().required(""),
    medicalReports: Yup.mixed()
      .required("Certificates are required")

      .test("FILE_FORMAT", "Not a valid image type", (values: []) =>
        isValidFileType(values)
      )
      .test("is-valid-size", "Max allowed size is 10MB", (values: []) =>
        isValidFileSize(values)
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      let { medicalPrescription, medicalReports } = values;
      let { id, patient_id, doctor_id } = current_patient;

      const updated_date = moment().format("YYYY-MM-DD HH:mm:ss Z");

      const prescriptionDataToSend = {
        doctor_id,
        patient_id,
        appointment_id: id,
        description: medicalPrescription,
        attachments: medicalReports,
        updated_date,
      };
      console.log("prescriptionDataToSend", prescriptionDataToSend);
      (async () => {
        try {
          const response = await axios.post(
            `${config.base_url}/doctor/create_prescription`,
            { data: prescriptionDataToSend }
          );

          //  Prescription has been created successfully
          toast.success(response?.data?.message); // Show the success toast
          formik.resetForm();
          formik.setSubmitting(false)
          props.onHide();
          props.handleReload()
          console.log("response", response);
        } catch (error) {
          toast.error("Prescription creation not successful");
          formik.isSubmitting = false;
          console.log(`error in doctor registration`, error.message);
        }
      })();
    },
  });

  function isValidFileType(files: []) {
    for (let i = 0; i < files.length; i++) {
      if (!supportedFormats.includes(files[i]["type"])) {
        return false;
        break;
      } else {
        return true;
      }
    }
  }

  function isValidFileSize(files: []) {
    for (let i = 0; i < files.length; i++) {
      if (files[i]["size"] > MAX_FILE_SIZE) {
        return false;
      } else {
        return true;
      }
    }
  }
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={formik.handleSubmit} className="reg__form">
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
              <div>Create Clinical Feedback</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ border: "none", paddingBottom: "0px" }}>
            <Container>
              <Row>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="medicalPrescription">
                    <strong>Medical Prescription</strong>
                  </Form.Label>
                  <Form.Control
                    className="rounded-3"
                    id="medicalPrescription"
                    as="textarea"
                    placeholder="Prescription type here"
                    rows={5}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="medicalPrescription"
                    value={formik.values.medicalPrescription}
                    isInvalid={
                      formik.touched.medicalPrescription &&
                      !!formik.errors.medicalPrescription
                    }
                  />
                </Form.Group>
                <Form.Label>
                  <strong>Medical Reports</strong>
                </Form.Label>
                <Form.Group
                  as={Col}
                  sm={12}
                  className="d-flex justify-content-center mb-2"
                >
                  <Form.Label
                    className="files-input-label py-2"
                    htmlFor="medicalReports"
                  >
                    <div className="fs-3">
                      <FiUpload />
                    </div>

                    <div>Only .jpg .pdf .png files max size of 10 mb</div>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    className="d-none"
                    id="medicalReports"
                    name="medicalReports"
                    accept="image/jpeg', 'image/png', 'image/gif"
                    multiple
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue(
                        "medicalReports",
                        e.currentTarget.files
                      );
                      // console.log("values", e.currentTarget.files[0]);

                      const files = e.currentTarget.files;
                      if (files) {
                        const previews = Array.from(files).map((file) =>
                          URL.createObjectURL(file)
                        );
                        setImagePreviews(previews);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Form.Group>
                <div>
                  {formik.errors.medicalReports && (
                    <small className="text-danger">
                      {formik.errors.medicalReports}
                    </small>
                  )}
                </div>
              </Row>
              <Row className="mb-3 pe-3" xs={2} md={4}>
                {!formik.errors.medicalReports &&
                  imagePreviews?.map((previewUrl, index) => (
                    <Col key={index} className="p-2">
                      <div className="d-flex h-100 w-100 border border-secondary">
                        <img
                          src={previewUrl}
                          alt={`Preview ${index}`}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </Col>
                  ))}
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer style={{ border: "none", paddingTop: "0px" }}>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="form_submit_btn"
              style={{ marginTop: "0px", cursor: "pointer" }}
            >
              Create Prescription
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
}
