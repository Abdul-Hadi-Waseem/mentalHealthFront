import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../Common/Buttons/Button";
import { FaEye, FaEyeSlash, FaChevronLeft } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

import { BsCalendar } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker
import { Link, useNavigate } from "react-router-dom";
// import { useActionsUsersRegistrationMutation } from "../../gql/generated"
// import { usePatientRegistrationMutation } from "../../../gql/generated";
import { useDoctorRegistrationMutation } from "../../../gql/generated";
// import Tooltips from "../Common/Tooltips";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../Common/Buttons/BackButton";
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  college_name: string;
  course: string;
  year: string;
  certificates: [];
}
interface MyComponentProps {
  handleAcademicInformation: (value: FormValues) => void;
}

const AcademicInformation: React.FC<MyComponentProps> = (props) => {
  const [pickYear, setPickYear] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [result, executeMutation] = usePatientRegistrationMutation();
  const [result, executeMutation] = useDoctorRegistrationMutation();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxFileSize = 15 * 1024 * 1024; // 15 MB in bytes
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 15 MB in bytes
  // const MAX_FILE_SIZE = 102; // 10 kb
  const supportedFormats = ["image/png", "image/jpg","image/jpeg", "application/pdf"];
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const navigate = useNavigate();
  const initialValues: FormValues = {
    college_name: "",
    course: "",
    year: "",
    certificates: [],
    // clinic_name: "",
    // clinic_experience: "",
    // specialities: "",
    // clinic_address: "",
    // state: "",
    // zip_code: "",
    // city: "",
    // country: "",
    // clinic_schedule: "",
    // start_time: "",
    // end_time: "",
    // professional_bio: "",
  };

  function isValidFileType(files: []) {
    for (let i = 0; i < files.length; i++) {
      if (!supportedFormats.includes(files[i]["type"])) {
        return false;
        break;
      } 
      else {
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

  const validationSchema = Yup.object({
    college_name: Yup.string()
      .min(3)
      .max(30)
      .required("College name is required"),
    course: Yup.string().required("Course is required"),
    year: Yup.number()
      .required("Year is required")
      .max(Number(new Date().getFullYear()), "Year cannot be in the future"),

    certificates: Yup.mixed().required("Certificates are required")
      
      .test("FILE_FORMAT", "Not a valid image type", (values: []) =>
        isValidFileType(values)
      )
      .test("is-valid-size", "Max allowed size is 10MB", (values: []) =>
        isValidFileSize(values)
      ),
    // certificates : Yup.files().required("certificates is required")

    // certificates: Yup.mixed()
    //   .nullable()
    //   .required()
    //   .test(
    //     "FILE_FORMAT",
    //     "Invalid file format. Supported formats: PNG, JPEG, PDF",
    //     (value: File | null) =>
    //       !value || (value && supportedFormats.includes(value?.type))
    // certificates: Yup.array().test('fileFormats', 'Unsupported file format', (files) => {
    //   console.log("files ", files)
    //   if (!files) {
    //     return true; // No files provided, validation will be handled by the required() check
    //   }
    //   const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    //   const isValid = files.forEach((file) => supportedFormats.includes(file.type));
    //   return isValid;
    // }),

    // ),

    // certificates: Yup.array().required("certificates is required").of(
    //   Yup.mixed()
    //     .test(
    //       "fileFormat",
    //       "Invalid file format. Supported formats: PNG, JPEG, PDF",
    //       (value: File | null) =>
    //         !value || supportedFormats.includes(value.type)
    //     )
    //     .test(
    //       "fileSize",
    //       "File size is too large. Max size: 15MB",
    //       (value: File | null) => !value || value.size <= maxFileSize
    //     )
    // ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // console.log("values in academic ", values);
      // console.log("errors in academic ", formik.errors);
      props.handleAcademicInformation(values);
      navigate("/professional-experience");

      // const dobDate = new Date(values.dob);
      // const formattedDob = dobDate.toISOString();

      // values.dob = formattedDob;

      // const { confirmPassword, ...dataToSend } = values;

      // try {
      //   await executeMutation({ Data: dataToSend });
      //   toast.success("Registration Successful"); // Show the success toast
      //   setTimeout(() => {
      //     navigate("/doctor-login"); // Navigate after 5 seconds
      //   }, 5000);
      // } catch (error) {
      //   toast.error("Registration not successful");
      //   console.error(error);
      // }
    },
  });

  const goBack = () => {
    navigate("/doctor-login");
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newFiles = Array.from(event.target.files || []);

  //   const invalidFiles = newFiles.filter((file) => {
  //     if (!allowedFileTypes.includes(file.type)) {
  //       return true;
  //     }
  //     if (file.size > maxFileSize) {
  //       return true;
  //     }
  //     return false;
  //   });

  //   if (invalidFiles.length > 0) {
  //     setErrorMessage(
  //       "Invalid files detected. Allowed types: .jpg, .png, .pdf. Max size: 15 MB."
  //     );
  //   } else {
  //     setSelectedFiles([...selectedFiles, ...newFiles]);
  //     setErrorMessage(null);
  //   }
  // };

  return (
    <Container className="login__section">
      <Row className="mb-4 ">
        <Col sm={12}>
          <BackButton onClick={goBack} />
        </Col>
      </Row>
      <Row className="mb-4 ">
        <Col sm={12} className="">
          <h1>
            Academic
            <br />
            <span className="txt__green">Information</span>
            {/* <span className="txt__green">Information</span> 👋 */}
          </h1>
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit} className="reg__form">
        {/* College Name */}
        <Row className="mb-3">
          <Form.Group as={Col} sm={12}>
            <Form.Control
              type="text"
              placeholder="College Name"
              id="college_name"
              name="college_name"
              value={formik.values.college_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.college_name && !!formik.errors.college_name
              }
            />
            {formik.touched.college_name && formik.errors.college_name && (
              <small className="text-danger">
                {formik.errors.college_name}
              </small>
            )}
          </Form.Group>
        </Row>

        {/* course and year */}
        <Row className="mb-3">
          <Form.Group as={Col} lg={7} sm={12}>
            <Form.Control
              type="text"
              placeholder="Course"
              id="course"
              name="course"
              value={formik.values.course}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.course && !!formik.errors.course}
            />
            {formik.touched.course && formik.errors.course && (
              <small className="text-danger">{formik.errors.course}</small>
            )}
          </Form.Group>
          <Form.Group as={Col} lg={5} sm={12}>
            {/* <input name="year"   id="year"   value={pickYear.getFullYear().toString()} /> */}
            <DatePicker
              className="d-flex cursor-pointer w-100"
              selected={pickYear}
              onChange={(date) => {
                setPickYear(date);
                formik.setFieldValue("year", Number(date.getFullYear()));
                if(new Date().getFullYear() < date.getFullYear()){
                  formik.setFieldError("year", "Year cannot be in the future")
                }
              }}
              showYearPicker
              dateFormat="yyyy"
            />
            {formik.errors.year && (
              <small className="text-danger">{formik.errors.year}</small>
            )}
          </Form.Group>
        </Row>

        {/* <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Multiple files input example</Form.Label>
          <Form.Control type="file" onChange={(e)=>{console.log("values in files ", e.target.value)}} multiple />
        </Form.Group> */}
        {/* <input
          
         
          onChange={(e) => {
            console.log("values in files ", e.target.files);
          }}
          multiple
        /> */}

        <Row className="mb-3">
          <strong>Upload Certificates</strong>
        </Row>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            sm={12}
            className="d-flex justify-content-center"
          >
            <Form.Label
              className="files-input-label cursor-pointer py-4"
              htmlFor="certificates"
            >
              <div className="fs-1">
                <FiUpload />
              </div>

              <div>Only .jpg .pdf .png files max size of 10 mb</div>
            </Form.Label>
            <Form.Control
              type="file"
              className="d-none"
              id="certificates"
              name="certificates"
              // accept="application/pdf , image/png , image/jpg"
              accept="image/jpeg', 'image/png', 'image/gif"
              multiple
              // onChange={formik.handleChange}
              // onChange={handleFileChange}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue("certificates", e.currentTarget.files);
                // console.log("values", e.currentTarget.files[0]);

                const files = e.currentTarget.files;
                if (files) {
                  const previews = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                  );
                  setImagePreviews(previews);
                  // console.log("previews ", previews);
                }
                // console.log("value dfwe", e.currentTarget.files);
                // console.log("error", formik.errors);
              }}
              onBlur={formik.handleBlur}
            />
          </Form.Group>
          <div>
            {formik.errors.certificates && (
              <small className="text-danger">
                {formik.errors.certificates}
              </small>
            )}
          </div>
        </Row>
        <Row className="mb-3 pe-3" xs={2} md={4}>
          {!formik.errors.certificates && imagePreviews.map((previewUrl, index) => (
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
        <Button
          title={"Continue"}
          className="w-100 my-4"
          // onClick={() => {
          //   navigate("/professional-experience");
          // }}
          type="submit"
          disabled={formik.isSubmitting}
        />
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default AcademicInformation;
