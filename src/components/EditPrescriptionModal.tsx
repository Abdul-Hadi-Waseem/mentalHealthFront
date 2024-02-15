import { Modal, Form, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import config from "../configs/config";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../utils";
interface AppointmentSuccessfulModalProps {
  show: boolean;
  onHide: () => void;
  currentPrescription: any;
  handleReload: any;
}
interface FormDataObject {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_id: number;
  updated_date: string;
  description: string;
  attachments: File[] | Blob[] | null;
}

interface initialValues {
  medicalPrescription: string;
  medicalReports: File[] | Blob[] | null;
}

export default function EditPrescriptionModal(
  props: AppointmentSuccessfulModalProps
) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [current_prescription, setCurrentPrescription] = useState<any>(
    JSON.parse(localStorage.getItem("current_prescription"))
  );
  const [updatePrescription, setUpdatePrescription] = useState(
    props.currentPrescription
  );
  console.log("updatePrescription", updatePrescription);

  // console.log("current", current_patient);
  const handleFormData = async (formDataObject: FormDataObject) => {
    console.log("formDataObject formik certificates", formDataObject);

    const formData = new FormData();

    formData.append("patient_id", formDataObject.patient_id.toString());
    formData.append("doctor_id", formDataObject.doctor_id.toString());
    formData.append("appointment_id", formDataObject.appointment_id.toString());
    formData.append("id", formDataObject.id.toString());
    formData.append("description", formDataObject.description);
    formData.append("updated_date", formDataObject.updated_date);

    for (let i = 0; i < formDataObject?.attachments?.length; i++) {
      // formData.append("files", formDataObject?.attachments[i]);
      formData.append("files", formDataObject?.attachments[i]);
    }

    return formData;
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
  const supportedFormats = ["image/png", "image/jpg", "application/pdf"];

  const initialValues: initialValues = {
    medicalPrescription: updatePrescription.description,
    medicalReports: null,
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
      // let { id, patient_id, doctor_id,appointment_id } = current_prescription;
      let { id, patient_id, doctor_id, appointment_id } = updatePrescription;

      const updated_date = moment().format("YYYY-MM-DD HH:mm:ss Z");

      const updatPrescriptionDataToSend = {
        doctor_id,
        patient_id,
        appointment_id,
        description: medicalPrescription,
        attachments: medicalReports,
        updated_date,
        id,
      };
      console.log("updatPrescriptionDataToSend", updatPrescriptionDataToSend);

      (async () => {
        try {
          const updatedDataToSend = await handleFormData(
            updatPrescriptionDataToSend
          );

          const response = await axios.put(
            `${config.base_url}/doctor/update_prescription`,
            updatedDataToSend,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
              },
            }
          );

          //  Prescription has been created successfully
          toast.success(response?.data?.message); // Show the success toast
          formik.resetForm();
          formik.setSubmitting(false);
          props.onHide();
          props.handleReload();
          console.log("edit prescription response", response);
        } catch (error) {
          toast.error("Prescription creation not successful");
          formik.isSubmitting = false;
          console.log(`error in clinician registration`, error.message);
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

  useEffect(() => {
    setUpdatePrescription(props.currentPrescription);
    formik.setFieldValue(
      "medicalPrescription",
      props.currentPrescription.description
    );
  }, [props.currentPrescription]);
  console.log("useFormik ", formik.values);

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
              <div>Edit Clinical Feedback</div>
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
                  {Array.isArray(formik.errors.medicalReports) ? (
                    formik.errors.medicalReports.map((error, index) => (
                      <div key={index} className="text-danger">
                        {error}
                      </div>
                    ))
                  ) : (
                    <small className="text-danger">
                      { imagePreviews?.length > 0 ? formik.errors.medicalReports : ""}
                    </small>
                  )}
                  {/* {formik.errors.medicalReports && (
                    <small className="text-danger">
                      {formik.errors.medicalReports}
                    </small>
                  )} */}
                </div>
              </Row>
              {imagePreviews?.length == 0 ? (
                <Row className="mb-3 pe-3" xs={2} md={4}>
                  {props?.currentPrescription?.medical_reports?.map(
                    (imageName, index) => (
                      <Col key={index} className="p-2">
                        <div className="d-flex h-100 w-100 border border-secondary">
                          <img
                            // src={previewUrl}
                            src={config.base_url + "/certificates/" + imageName}
                            alt={`Preview ${index}`}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      </Col>
                    )
                  )}
                </Row>
              ) : (
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
              )}
            </Container>
          </Modal.Body>
          <Modal.Footer style={{ border: "none", paddingTop: "0px" }}>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="form_submit_btn"
              style={{ marginTop: "0px", cursor: "pointer" }}
            >
              Edit Prescription
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
}

// import { Modal, Form, Row, Col, Container } from "react-bootstrap";
// import { FaXmark } from "react-icons/fa6";
// import { FiUpload } from "react-icons/fi";
// import { useState, useEffect } from "react";
// interface AppointmentSuccessfulModalProps {
//   show: boolean;
//   onHide: () => void;
//   currentPrescription: any;
// }

// export default function EditPrescriptionModal(
//   props: AppointmentSuccessfulModalProps
// ) {
//   const [updatePrescription, setUpdatePrescription] = useState(
//     props.currentPrescription
//   );
//   console.log("updatePrescription", updatePrescription);

//   useEffect(() => {
//     setUpdatePrescription(props.currentPrescription);
//   }, [props.currentPrescription]);

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       {/* <div className="d-flex w-100 justify-content-end p-0 m-0">
//         <span
//           onClick={() => {
//             props.onHide();
//           }}
//           style={{ cursor: "pointer" }}
//         >
//           <FaXmark />
//         </span>
//       </div> */}
//       <Modal.Header
//         style={{ marginTop: 0, border: "none", paddingBottom: "0px" }}
//       >
//         <Modal.Title
//           className="d-flex w-100 flex-column p-0 m-0"
//           id="contained-modal-title-vcenter"
//         >
//           <div className="d-flex w-100 justify-content-end p-0 m-0">
//             <span
//               onClick={() => {
//                 props.onHide();
//               }}
//               style={{ cursor: "pointer" }}
//             >
//               <FaXmark />
//             </span>
//           </div>
//           <div>Edit Clinical Feedback</div>
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body style={{ border: "none", paddingBottom: "0px" }}>
//         <Container>
//           <Row>
//             <Form.Group className="mb-2">
//               <Form.Label htmlFor="create_prescription">
//                 <strong>Medical Prescription</strong>
//               </Form.Label>
//               <Form.Control
//                 className="rounded-3"
//                 id="create_prescription"
//                 as="textarea"
//                 placeholder="Prescription type here"
//                 rows={5}
//                 value={updatePrescription.description}
//                 onChange={(e) => {
//                   console.log(e.target.value);

//                   setUpdatePrescription(e.target.value);
//                 }}
//               />
//             </Form.Group>
//             <Form.Label>
//               <strong>Medical Reports</strong>
//             </Form.Label>
//             <Form.Group
//               as={Col}
//               sm={12}
//               className="d-flex justify-content-center mb-2"
//             >
//               <Form.Label
//                 className="files-input-label py-2"
//                 htmlFor="certificates"
//               >
//                 <div className="fs-3">
//                   <FiUpload />
//                 </div>

//                 <div>Only .jpg .pdf .png files max size of 10 mb</div>
//               </Form.Label>
//               <Form.Control
//                 type="file"
//                 className="d-none"
//                 id="certificates"
//                 name="certificates"
//                 // accept="application/pdf , image/png , image/jpg"
//                 accept="image/jpeg', 'image/png', 'image/gif"
//                 multiple
//                 // onChange={formik.handleChange}
//                 // onChange={handleFileChange}
//                 // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                 //   formik.setFieldValue("certificates", e.currentTarget.files);
//                 //   // console.log("values", e.currentTarget.files[0]);

//                 //   const files = e.currentTarget.files;
//                 //   if (files) {
//                 //     const previews = Array.from(files).map((file) =>
//                 //       URL.createObjectURL(file)
//                 //     );
//                 //     setImagePreviews(previews);
//                 //     // console.log("previews ", previews);
//                 //   }
//                 //   // console.log("value dfwe", e.currentTarget.files);
//                 //   // console.log("error", formik.errors);
//                 // }}
//                 // onBlur={formik.handleBlur}
//               />
//             </Form.Group>
//             {/* <div>
//             {formik.errors.certificates && (
//               <small className="text-danger">
//                 {formik.errors.certificates}
//               </small>
//             )}
//           </div> */}
//           </Row>
//         </Container>
//       </Modal.Body>
//       <Modal.Footer style={{ border: "none", paddingTop: "0px" }}>
//         <button className="form_submit_btn" style={{ marginTop: "0px" }}>
//           Edit Prescription
//         </button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
