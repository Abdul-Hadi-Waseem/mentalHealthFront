import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup, Container, Modal } from "react-bootstrap";
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
import { usePatientRegistrationMutation } from "../../../gql/generated";
// import { useDoctorProfileMutation } from "../../../gql/generated";
// import Tooltips from "../Common/Tooltips";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../Common/Buttons/BackButton";
import "react-datepicker/dist/react-datepicker.css";
import "./doctor.css";
import axios from "axios";
import config from "../../../configs/config";
import moment from "moment";

interface FormValues {
  clinic_name: string;
  clinic_experience: string;
  specialities: string;
  clinic_address: string;
  state: string;
  zip_code: string;
  city: string;
  country: string;
  clinic_schedule: { day: string; start_time: string; end_time: string }[];
  day: string;
  start_time: string;
  end_time: string;
  professional_bio: string;
}
// interface AcademicValues {
//   college_name: string;
//   course: string;
//   year: string;
//   certificates?: [];
// }
interface MyComponentProps {
  academicInformation: {
    college_name: string;
    course: string;
    year: string;
    certificates?: [] | any;
  };
  // handleProfessionExperience: (value: FormValues) => void;
}

const DoctorProfessionExperience: React.FC<MyComponentProps> = (props) => {
  const [result, executeMutation] = usePatientRegistrationMutation();
  const [mergeValues, setMergeValues] = useState({});
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const initialValues: FormValues = {
    clinic_name: "",
    clinic_experience: "",
    specialities: "",
    clinic_address: "",
    state: "",
    zip_code: "",
    city: "",
    country: "",
    clinic_schedule: [{ day: "", start_time: "", end_time: "" }],
    day: "Tuesday",
    start_time: "",
    end_time: "",
    professional_bio: "",
  };
  const validationSchema = Yup.object({
    clinic_name: Yup.string().required("Clinic Name is required"),
    clinic_experience: Yup.string().required("Clinic Experience is required"),
    specialities: Yup.string().required("Specialities is required"),
    clinic_address: Yup.string().required("Clinic Address is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    start_time: Yup.string().required("Start Time is required"),
    end_time: Yup.string().required("End Time is required"),
    professional_bio: Yup.string().required("Professional Bio is required"),
  });

  const goBack = () => {
    navigate("/academic-information");
  };
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/doctor-dashboard");
  };
  const goToDashBoard = () => {
    setShowModal(false);
    navigate("/doctor-dashboard");
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values) => {
      setMergeValues({ name: "abcd" });
      // event.preventDefault();
      const formData = new FormData();
      let { clinic_schedule, ...professional_experience } = values;
      // professional_experience = JSON.stringify(professional_experience);
      let { certificates, ...academicInformation } = props.academicInformation;
      let certificatesArr = [];
      console.log("academic", props.academicInformation);

      // certificates.array.forEach(element => {
      //   certificatesArr.push(element)
      // });

      // certificates = JSON.stringify(certificates);
      let user = JSON.parse(localStorage.getItem("doctor_information"));
      delete user.dictionary;
      delete user.assessment;
      let dataToSend = {
        ...academicInformation,
        clinic_schedule,
        professional_experience,
        certificates,
        user,
      };
      console.log("dataTosend", dataToSend);

      // for (let i=0;i< dataToSend.certificates.length;i++) {
      //   formData.append(`certificates${i}`, dataToSend["certificates"][i]);
      // }
      // dataToSend.clinic_schedule
      // dataToSend.college_name
      // dataToSend.course
      // dataToSend.professional_experience
      // dataToSend.year
      // // dataToSend.certificates

      // let clinic_scheduleToSend = JSON.stringify(dataToSend['clinic_schedule']);
      // let professional_experienceToSend = JSON.stringify(dataToSend['professional_experience']);

      // formData.append("clinic_schedule", clinic_scheduleToSend );
      // formData.append("college_name", dataToSend["college_name"])
      // formData.append('course', "abcd")
      // formData.append("professional_experience", professional_experienceToSend)
      // formData.append("year", dataToSend["year"]);
      // formData.append("course", dataToSend["course"])

      // For FormData
      // formData.append("name", "osama");
      // let headers = {
      //   "Content-Type": "multipart/form-data"
      // }
      // let body = {
      //   "name": "osama"
      // }
      // console.log("header",headers);
      // console.log("dataToSend",dataToSend);
      // const response = await axios.post('http://localhost:5000/doctor/create_profile', formData, {headers});
      try {
        let updated_clinic_schedule = [...clinic_schedule];
        let formattedClinicSchedule = [];

        for (let i = 0; i < updated_clinic_schedule.length; i++) {
          const element = updated_clinic_schedule[i];
          let start_time = moment(element.start_time, "HH:mm").format(
            "HH:mm:ss Z"
          );
          const end_time = moment(element.end_time, "HH:mm").format(
            "HH:mm:ss Z"
          );
          let obj = {
            day: element.day,
            start_time: moment
              .utc(start_time, "HH:mm:ss Z")
              .format("HH:mm:ss Z"),
            end_time: moment.utc(end_time, "HH:mm:ss Z").format("HH:mm:ss Z"),
          };
          formattedClinicSchedule.push(obj);
        }
        console.log("formattedClinicSchedule", formattedClinicSchedule);

        dataToSend.clinic_schedule = formattedClinicSchedule;
        const response = await axios.post(
          `${config.base_url}/doctor/create_profile`,
          dataToSend
        );
        if (response?.data?.data) {
          localStorage.setItem("user", response.data.data);
        }
        toast.success("Registration Successful"); // Show the success toast
        setShowModal(true); // modal to show
        console.log("response", response);
      } catch (error) {
        toast.error("Registration not successful");
        console.log(`error in doctor registration`, error);
      }

      // console.log("formData", formData)

      //  {data:dataToSend}

      // const response = await axios.post(
      //   `http://localhost:5000/doctor/create_profile`,
      //   formData,
      //   config
      // );
      // console.log("response", response)

      // console.log("values dataToSend", dataToSend);
      // console.log("values in Doctor Profession Experience", values);
      // console.log("values dataTosend", professional_experience);
      // console.log("values clinic_schedule", clinic_schedule);
      // console.log("values Academic", props.academicInformation.certificates[0]);
      // console.log("values Academic", certificatesArr);

      // event.preventDefault();
      // const dataToSend = {
      //   college_name: "Adamjee College",
      //   course: "Dentist",
      //   year: "2022",
      // };
      // try {
      //   await executeMutation({
      //    dataToSend
      //     },
      //   });
      //   // toast.success("Doctor Registration Successful"); // Show the success toast
      //   // setTimeout(() => {
      //   //   navigate("/doctor-login"); // Navigate after 5 seconds
      //   // }, 5000);
      // } catch (error) {
      //   toast.error("Doctor Registration not successful");
      //   console.error(error);
      // }

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

  // useEffect(()=> {
  //   let formData = new FormData();
  //   formData.append("firstName", "John");
  //   console.log("formdata", formData);

  //   const response = axios.post(
  //     `http://localhost:5000/doctor/create_profile`,
  //     { data: formData }
  //     //  {data:formData}
  //   );
  //   console.log("response", response);
  // }, [mergeValues]);

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
            Professional
            <br />
            <span className="txt__green">Experience</span>
          </h1>
        </Col>
      </Row>

      <Form onSubmit={formik.handleSubmit} className="reg__form">
        {/* clinic_name */}
        <Row className="mb-3">
          <Form.Group as={Col} sm={12}>
            <Form.Control
              type="text"
              placeholder="Clinic Name"
              id="clinic_name"
              name="clinic_name"
              value={formik.values.clinic_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.clinic_name && !!formik.errors.clinic_name
              }
            />
            {formik.touched.clinic_name && formik.errors.clinic_name && (
              <small className="text-danger">{formik.errors.clinic_name}</small>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} lg={6} sm={12}>
            <Form.Control
              type="text"
              placeholder="Clinic Experience"
              id="clinic_experience"
              name="clinic_experience"
              value={formik.values.clinic_experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.clinic_experience &&
                !!formik.errors.clinic_experience
              }
            />
            {formik.touched.clinic_experience &&
              formik.errors.clinic_experience && (
                <small className="text-danger">
                  {formik.errors.clinic_experience}
                </small>
              )}
          </Form.Group>
          <Form.Group as={Col} lg={6} sm={12}>
            <Form.Control
              type="text"
              placeholder="Specialities"
              id="specialities"
              name="specialities"
              value={formik.values.specialities}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.specialities && !!formik.errors.specialities
              }
            />
            {formik.touched.specialities && formik.errors.specialities && (
              <small className="text-danger">
                {formik.errors.specialities}
              </small>
            )}
          </Form.Group>
        </Row>

        {/* clinic address and state */}
        <Row className="mb-3">
          <Form.Group as={Col} lg={6} sm={12}>
            <Form.Control
              type="text"
              placeholder="Clinic Address"
              id="clinic_address"
              name="clinic_address"
              value={formik.values.clinic_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.clinic_address && !!formik.errors.clinic_address
              }
            />
            {formik.touched.clinic_address && formik.errors.clinic_address && (
              <small className="text-danger">
                {formik.errors.clinic_address}
              </small>
            )}
          </Form.Group>
          <Form.Group as={Col} lg={6} sm={12}>
            <Form.Control
              type="text"
              placeholder="State"
              id="state"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.state && !!formik.errors.state}
            />
            {formik.touched.state && formik.errors.state && (
              <small className="text-danger">{formik.errors.state}</small>
            )}
          </Form.Group>
        </Row>

        {/* zip code and city */}
        <Row className="mb-3">
          <Form.Group as={Col} lg={6} sm={12}>
            <Form.Control
              type="text"
              placeholder="Zip Code"
              id="zip_code"
              name="zip_code"
              value={formik.values.zip_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.zip_code && !!formik.errors.zip_code}
            />
            {formik.touched.zip_code && formik.errors.zip_code && (
              <small className="text-danger">{formik.errors.zip_code}</small>
            )}
          </Form.Group>
          <Form.Group as={Col} lg={6} sm={12}>
            <Form.Control
              type="text"
              placeholder="City"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.city && !!formik.errors.city}
            />
            {formik.touched.city && formik.errors.city && (
              <small className="text-danger">{formik.errors.city}</small>
            )}
          </Form.Group>
        </Row>

        {/* Country */}
        <Row className="mb-3">
          <Form.Group as={Col} sm={12}>
            <Form.Control
              type="text"
              placeholder="Country"
              id="country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.country && !!formik.errors.country}
            />
            {formik.touched.country && formik.errors.country && (
              <small className="text-danger">{formik.errors.country}</small>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <strong>Clinic Schedule</strong>
        </Row>
        {/* Week Pills */}
        <Row className="mb-3 px-1" xs={2} md={3}>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day, index) => (
            <Col key={day + index} className="mb-3 px-2">
              <div
                className="d-flex justify-content-center align-items-center rounded-pill h-100 w-100 py-3 "
                style={{
                  background:
                    day == (formik.values.day || "Tuesday")
                      ? "#77AC28"
                      : "#E9EEF3",
                  color: day == (formik.values.day || "Tuesday") && "#FAFCFF",
                }}
                onClick={() => {
                  formik.setFieldValue("day", day);
                }}
              >
                {day.split("").slice(0, 3)}
              </div>
            </Col>
          ))}
        </Row>

        {/* start time and end time */}
        <Row className="mb-3">
          <Form.Group as={Col} lg={6} sm={12}>
            <Form.Control
              type="time"
              placeholder="Start Time"
              id="end_time"
              name="start_time"
              value={formik.values.start_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.start_time && !!formik.errors.start_time
              }
            />
            {formik.errors.end_time && (
              <small className="text-danger">{formik.errors.end_time}</small>
            )}
            {/* {formik.touched.zip_code && formik.errors.zip_code && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.zip_code}
              </Form.Control.Feedback>
            )} */}
          </Form.Group>
          <Form.Group as={Col} lg={6} sm={12}>
            <Form.Control
              type="time"
              placeholder="End Time"
              id="end_time"
              name="end_time"
              value={formik.values.end_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.end_time && !!formik.errors.end_time}
            />
            {formik.errors.end_time && (
              <small className="text-danger">{formik.errors.end_time}</small>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3" style={{ padding: "0px 12px" }}>
          <Col
            sm={12}
            className="py-3 rounded-3"
            style={{ border: "solid 2px #3773A9" }}
          >
            <button
              type="button"
              style={{ color: "#3773A9" }}
              className="d-flex w-100 justify-content-center align-item-center border-0 bg-light"
              onClick={() => {
                let { day, start_time, end_time } = formik.values;
                let newSchedule = { day, start_time, end_time };
                if (!start_time || !end_time) {
                  switch ("") {
                    case start_time:
                      return formik.setFieldError(
                        "start_time",
                        "Start Time is required to Create a new Schedule "
                      );
                    case end_time:
                      return formik.setFieldError(
                        "end_time",
                        "End Time is required to Create a new Schedule "
                      );
                  }
                } else {
                  if (formik.values.clinic_schedule[0].day) {
                    formik.setFieldValue("clinic_schedule", [
                      ...formik.values.clinic_schedule,
                      newSchedule,
                    ]);
                    formik.setFieldValue("day", "Tuesday");
                    formik.setFieldValue("start_time", "");
                    formik.setFieldValue("end_time", "");
                  } else {
                    formik.setFieldValue("clinic_schedule", [newSchedule]);
                    formik.setFieldValue("day", "Tuesday");
                    formik.setFieldValue("start_time", "");
                    formik.setFieldValue("end_time", "");
                  }
                }
              }}
            >
              <strong>Add</strong>
            </button>
          </Col>
        </Row>
        {formik.values.clinic_schedule[0].day &&
          formik.values.clinic_schedule.map((item, index) => {
            return (
              <Row className="mb-3" key={`${item} ${index}`}>
                <Col className="d-flex justify-content-between">
                  <span>{item.day}</span>
                  <span>
                    {
                      <span>
                        {moment(item.start_time, "HH:mm").format("hh:mm A")}
                      </span>
                    }
                    {/* {Number(item.start_time.slice(0, 2)) > 12
                      ? (Number(item.start_time.slice(0, 2)) - 12 < 10
                          ? (Number(item.start_time.slice(0, 2)) - 12)
                              .toString()
                              .padStart(2, "0")
                          : item.start_time.slice(0, 2)) +
                        item.start_time.slice(2) +
                        "PM "
                      : item.start_time.slice(0, 2) == "00"
                      ? "12" + item.start_time.slice(2, 6) + "AM "
                      : item.start_time + "AM "} */}
                    to{" "}
                    {
                      <span>
                        {moment(item.end_time, "HH:mm").format("hh:mm A")}
                      </span>
                    }
                  </span>
                </Col>
              </Row>
            );
          })}
        {/* // moment(item.end_time).format("hh:mm A") */}
        {/* <Row className="mb-3">
          <Col className="d-flex justify-content-between">
            <span>Thursday</span>
            <span>02:00pm to 05:00pm</span>
          </Col>
        </Row> */}
        <Form.Group className="mb-3" controlId="professional_bio">
          <Form.Control
            className="rounded-3"
            as="textarea"
            rows={10}
            placeholder="Describe your professional bio"
            value={formik.values.professional_bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.professional_bio &&
              !!formik.errors.professional_bio
            }
          />
          {formik.errors.end_time && (
            <small className="text-danger">
              {formik.errors.professional_bio}
            </small>
          )}
        </Form.Group>

        <Button
          className="w-100 my-4"
          type="submit"
          //  disabled={formik.isSubmitting}
          title={"Register"}
          // onClick={()=>{console.log("values Academic", props.academicInformation);}}
          // disabled={formik.isSubmitting}
        />
      </Form>
      <ToastContainer />
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Body className="d-flex flex-column justify-content-center py-3 px-8">
          <span className="modal-title">Schedule a Interview</span>
          <span className="modal-text py-4 ">
            You will be send email a link for an interview
            <br />
          </span>
          <div className="d-flex w-100 align-items-center  ">
            {/* <Button
              onClick={handleCloseModal}
              title="Exit"
              variant="secondary"
              className="me-4 w-100"
            /> */}
            <Button
              onClick={goToDashBoard}
              title="Done"
              className="mt-3 w-100 border-0"
            />
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DoctorProfessionExperience;

// <Form onSubmit={formik.handleSubmit} className="reg__form">
// {/* College Name */}
// <Row className="mb-3">
//   <Form.Group as={Col} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="College Name"
//       id="college_name"
//       name="college_name"
//       value={formik.values.college_name}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.college_name && !!formik.errors.college_name
//       }
//     />
//     {formik.touched.college_name && formik.errors.college_name && (
//       <small className="text-danger">
//         {formik.errors.college_name}
//       </small>
//     )}
//   </Form.Group>
// </Row>

// {/* course and year */}
// <Row className="mb-3">
//   <Form.Group as={Col} lg={7} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="Course"
//       id="course"
//       name="course"
//       value={formik.values.course}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={formik.touched.course && !!formik.errors.course}
//     />
//     {formik.touched.course && formik.errors.course && (
//       <small className="text-danger">{formik.errors.course}</small>
//     )}
//   </Form.Group>
//   <Form.Group as={Col} lg={5} sm={12}>
//     {/* <input name="year"   id="year"   value={pickYear.getFullYear().toString()} /> */}
//     <DatePicker
//       className="d-flex cursor-pointer w-100"
//       selected={pickYear}
//       onChange={(date) => {
//         let a = date.toString().split(" ");
//         // console.log("date ", a[3]);
//         setPickYear(date);
//         formik.setFieldValue("year", Number(date.getFullYear()));
//       }}
//       showYearPicker
//       dateFormat="yyyy"
//     />
//     {formik.touched.year && formik.errors.year && (
//       <small className="text-danger">{formik.errors.year}</small>
//     )}
//   </Form.Group>
// </Row>

// {/* <Form.Group controlId="formFileMultiple" className="mb-3">
//   <Form.Label>Multiple files input example</Form.Label>
//   <Form.Control type="file" onChange={(e)=>{console.log("values in files ", e.target.value)}} multiple />
// </Form.Group> */}
// {/* <input

//   onChange={(e) => {
//     console.log("values in files ", e.target.files);
//   }}
//   multiple
// /> */}

// <Row className="mb-3">
//   <strong>Upload Certificates</strong>
// </Row>
// <Row className="mb-3">
//   <Form.Group
//     as={Col}
//     sm={12}
//     className="d-flex justify-content-center"
//   >
//     <Form.Label className="files-input-label" htmlFor="certificates">
//       <div className="fs-1">
//         <FiUpload />
//       </div>

//       <div>Only .jpg .pdf .png files max size of 15 mb</div>
//     </Form.Label>
//     <Form.Control
//       type="file"
//       className="d-none"
//       id="certificates"
//       name="certificates"
//       multiple
//       // onChange={formik.handleChange}
//       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//         // formik.setFieldValue("certificates", e.currentTarget.files)
//         const files = e.currentTarget.files;
//         if (files) {
//           const previews = Array.from(files).map((file) =>
//             URL.createObjectURL(file)
//           );
//           setImagePreviews(previews);
//           console.log("previews ", previews);
//         }
//         console.log("value dfwe", e.currentTarget.files);
//         // console.log("error", formik.errors);
//       }}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.college_name && !!formik.errors.college_name
//       }
//     />
//     {formik.touched.certificates && formik.errors.certificates && (
//       <small className="text-danger">
//         {/* {formik.errors.certificates[0]} */}
//       </small>
//     )}
//   </Form.Group>
// </Row>

// <Row className="mb-3 pe-3" xs={2} md={4} >
//   {imagePreviews.map((previewUrl, index) => (
//     <Col key={index} className="p-2">
//       <div  className="d-flex h-100 w-100 border border-secondary m-2">
//         <img
//           src={previewUrl}
//           alt={`Preview ${index}`}
//           style={{ width: "100%", height: "100%" }}
//         />
//       </div>
//     </Col>
//   ))}
// </Row>
// <Button
//   title={"Continue"}
//   className="w-100 my-4"
//   type="submit"
//   disabled={formik.isSubmitting}
// />
// </Form>
