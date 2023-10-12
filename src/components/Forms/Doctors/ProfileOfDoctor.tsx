import React, { useEffect, useState } from "react";
import { Form, Row, Col, InputGroup, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../Common/Buttons/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker
import { Link, useNavigate } from "react-router-dom";
// import { useActionsUsersRegistrationMutation } from "../../gql/generated"
// import { usePatientRegistrationMutation } from "../../../gql/generated";
import { useDoctorRegistrationMutation } from "../../../gql/generated";
// import Tooltips from "../Common/Tooltips";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doctor_heart from "./../../../assets/images/doctor_heart.png";
import axios from "axios";
import config from "../../../configs/config";
import { FiUpload } from "react-icons/fi";
import "./doctor.css";

import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserInformation } from "../../../store/slices/UserSlice";
import { formatted_Date_In_Date_Type } from "../../../global_func";
import { getToken } from "../../../utils";

import moment from "moment";
interface FormValues {
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: number;

  level: number;

  college_name: string;
  course: string;
  year: string;
  certificates: string[];

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

const ProfileOfDoctor: React.FC = () => {
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [loader, setLoader] = useState(false);


  const [pickYear, setPickYear] = useState(new Date());
  const [file, setFile] = useState(null);
  const [result, executeMutation] = useDoctorRegistrationMutation();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const dispatch = useDispatch();
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 15 MB in bytes
  // const MAX_FILE_SIZE = 102; // 10 kb
  const supportedFormats = ["image/png", "application/pdf"];

  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );

  let { id, uid, name, phone, email, dob, gender, level } = reduxUserState;
  // let {
  //   address,
  //   state,
  //   zip_code,
  //   city,
  //   country,
  //   clinic_name,
  //   clinic_experience,
  //   specialities,
  //   clinic_address,
  //   description,
  // } = reduxUserState?.professional_experience;
  // let { certificates, course, year, college_name } =
  //   reduxUserState.doctor_details;

  const navigate = useNavigate();
  const initialValues: FormValues = {
    name,
    phone,
    email,
    dob: formatted_Date_In_Date_Type(dob),
    gender,
    level,

    college_name: reduxUserState?.doctor_details?.college_name,
    course: reduxUserState?.doctor_details?.course,
    year: moment(reduxUserState?.doctor_details?.year).format("YYYY"),
    certificates: reduxUserState?.doctor_details?.certificates,

    clinic_name: reduxUserState?.professional_experience?.clinic_name,
    clinic_experience: reduxUserState?.professional_experience?.clinic_experience,
    specialities: reduxUserState?.professional_experience?.specialities,
    clinic_address: reduxUserState?.professional_experience?.clinic_address,
    state: reduxUserState?.professional_experience?.state,
    zip_code: reduxUserState?.professional_experience?.zip_code,
    city: reduxUserState?.professional_experience?.city,
    country: reduxUserState?.professional_experience?.country,
    clinic_schedule: reduxUserState?.schedule,
    // clinic_schedule: [{ day: "", start_time: "", end_time: "" }],

    day: "Tuesday",
    start_time: "",
    end_time: "",
    professional_bio: reduxUserState?.professional_experience?.description,
    // professional_bio: reduxUserState?.professional_bio,
  };
  function isValidFileType(files: []) {
    for (let i = 0; i < files.length; i++) {
      if (!supportedFormats.includes(files[i]["type"])) {
        return false;
      } else {
        return true;
      }
    }
  }

  function isValidFileSize(files: []) {
    for (let i = 0; i < files.length; i++) {
      if (files[i]["size"] > MAX_FILE_SIZE) {
        // console.log("files[i] MAX_FILE_SIZE", files[i]["size"]);
        // console.log("files[i] MAX_FILE_SIZE", MAX_FILE_SIZE);
        return false;
      } else {
        // console.log("files[i] dsds MAX_FILE_SIZE", files[i]["size"]);
        // console.log("files[i] MAX_FILE_SIZE", MAX_FILE_SIZE);
        return true;
      }
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),
    gender: Yup.number().required("Gender is required"),
    college_name: Yup.string()
      .min(3)
      .max(30)
      .required("College name is required"),
    course: Yup.string().required("Course is required"),
    year: Yup.number()
      .required("Year is required")
      .max(Number(new Date().getFullYear()), "Year cannot be in the future"),

    certificates: Yup.mixed()
      .required("Certificates are required")
      .test("FILE_FORMAT", "Not a valid image type", (values: []) =>
        isValidFileType(values)
      )
      .test("is-valid-size", "Max allowed size is 10MB", (values: []) =>
        isValidFileSize(values)
      ),

    clinic_name: Yup.string().required("Clinic Name is required"),
    clinic_experience: Yup.string().required("Clinic Experience is required"),
    specialities: Yup.string().required("Specialities is required"),
    clinic_address: Yup.string().required("Clinic Address is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    start_time: Yup.string().nullable(),
    end_time: Yup.string().nullable(),
    professional_bio: Yup.string().required("Professional Bio is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log("Values ", values);
      event.preventDefault();
      values.gender = Number(values.gender);

      const dobDate = new Date(values.dob);
      const formattedDob = dobDate.toISOString();

      values.dob = formattedDob;

      const dataToSend = { ...values };
      console.log("dataToSend dataToSend", dataToSend);
      let { college_name,course,year,certificates,
        clinic_name,
        clinic_experience,
        specialities,
        clinic_address,
        state,
        zip_code,
        city,
        country,
        clinic_schedule,
       professional_bio,
      //   description:professional_bio,
      } = dataToSend
      let doctor_details = {
        college_name,course,year: year+"-01-01",certificates
      }
      let professional_experience = {
        clinic_name,
        clinic_experience,
        specialities,
        clinic_address,
        state,
        zip_code,
        city,
        country,
        clinic_schedule,
        description:professional_bio
      }

      const updatedData = {
        ...reduxUserState,
        ...dataToSend,
        doctor_details,
        professional_experience,
        updated_at: new Date().getTime(),
        updated_by: reduxUserState.id,
      };
      console.log("dataToSend updatedData", updatedData);
      let formattedClinicSchedule = [];
      let updated_clinic_schedule = [...updatedData.clinic_schedule];

      for (let i = 0; i < updated_clinic_schedule.length; i++) {
        const element = updated_clinic_schedule[i];
        let start_time = moment(element.start_time, "HH:mm").format(
          "HH:mm:ss Z"
        );
        const end_time = moment(element.end_time, "HH:mm").format("HH:mm:ss Z");
        let obj = {
          day: element.day,
          start_time: moment.utc(start_time, "HH:mm:ss Z").format("HH:mm:ss Z"),
          end_time: moment.utc(end_time, "HH:mm:ss Z").format("HH:mm:ss Z"),
        };
        formattedClinicSchedule.push(obj);
      }
      updatedData.clinic_schedule = formattedClinicSchedule;
      try {
        let { email, phone } = updatedData;
        const isRegisteredResponse = await axios.get(
          `${config.base_url}/user/isAlreadyRegister/${email}/${phone}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
            },
          }
        );
        let dbData = isRegisteredResponse?.data?.data;
        console.log("isRegisteredResponse", isRegisteredResponse.data);
        if (
          dbData.id != updatedData.id &&
          (updatedData.phone == dbData.phone ||
            updatedData.email == dbData.email)
        ) {
          toast.error("Email Or Phone is already registered");
          setDisableSaveBtn(false);
        } else {
          console.log("updateDoctorProfile send", updatedData);
          const formData = await handleFormData(updatedData);
          setDisableSaveBtn(true);
          const update_doctor_profile = await axios.put(
            `${config.base_url}/doctor/updateDoctorProfile`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
              },
            }
          );
          console.log("update_doctor_profile res", update_doctor_profile.data);
          let certificatesURL = [];
      
          for (let i = 0; i < updatedData.doctor_details.certificates.length; i++) {
            const imageName = updatedData[i]?.name;
            // Change 'image_name' to the column name in your table that stores the image names
            // const imageUrl = `http://your-domain/certificates/${imageName}`;
            const imageUrl = `${config.base_url}/certificates/${imageName}`;
            certificatesURL.push(imageUrl);
          }
          const reduxObj = {
            ...updatedData,
            doctor_details: 
            {...updatedData.doctor_details, certificates: certificatesURL}
          }
          
          dispatch(setUserInformation(reduxObj));
          toast.success("Profile Updated");
          setLoader(!loader)
          // navigate("/patient-dashboard")
        }
      } catch (error) {
        toast.error("Profile Updation is not successful");
        console.error(error);
      }
    },
  });

  // console.log("imagePreviews", imagePreviews)
  // console.log("imagePreviews formik", formik.values)

  const handlePicture = async () => {
    console.log(
      "imagePreviews formik certificates",
      formik.values.certificates
    );
    console.log("imagePreviews formik certificates", file);
    const formData = new FormData();
    formData.append("name", "John sdfasd");
    formData.append("email", "johndoe@example.com");
    // const file = formik.values.certificates[0];
    // file = file[0]
    //   const blob = new Blob([file], { type: file.type });
    //   formData.append("files", blob, file.name);
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    // formData.append("files", file[0]);
    try {
      const isProfileUploadResponse = await axios.post(
        `${config.base_url}/user/upload_picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
          },
        }
      );
      console.log("isProfileUploadResponse", isProfileUploadResponse);
    } catch (error) {
      console.error("Error uploading picture", error);
    }

    // const file = formik.values.certificates[0];
    // const blob = new Blob([file], { type: file.type });
    // formData.append('profile', blob, file.name);
    // const isProfileUploadResponse = await axios.post(
    //   `${config.base_url}/user/upload_picture`,
    //   formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
    // );
    // console.log("isProfileUploadResponse" ,  isProfileUploadResponse)
  };

  const handleFormData = async (formDataObject: any) => {
    console.log("formDataObject formik certificates", formDataObject);
    // let {certificates,doctor_details} = formDataObject?.doctor_details

    const formData = new FormData();

    // id,
    // name,
    // phone,
    // email,
    // dob,
    // gender,
    // doctor_details,
    // professional_experience,
    // clinic_schedule,
    // certificates,

    formData.append(
      "clinic_schedule",
      JSON.stringify(formDataObject.clinic_schedule)
    );
    formData.append(
      "professional_experience",
      JSON.stringify(formDataObject.professional_experience)
    );
    formData.append(
      "doctor_details",

      JSON.stringify(formDataObject.doctor_details)
    );
    for (let i = 0; i < formDataObject?.certificates?.length; i++) {
      formData.append("files", formDataObject?.certificates[i]);
    }

    // formData.append("user", JSON.stringify(formDataObject.user));
    // formData.append("year", formDataObject.year.toString());
    // formData.append("college_name", formDataObject.college_name);
    // formData.append("course", formDataObject.course);

    formData.append("id", formDataObject.id);
    formData.append("uid", formDataObject.uid);
    formData.append("name", formDataObject.name);
    formData.append("phone", formDataObject.phone);
    formData.append("email", formDataObject.email);
    formData.append("dob", formDataObject.dob);
    formData.append("gender", formDataObject.gender);
    // formData.append("doctor_details", formDataObject.doctor_details);
    // formData.append("clinic_schedule", formDataObject.clinic_schedule);
    // formData.append("professional_experience", formDataObject.professional_experience);
    // formData.append("certificates", formDataObject.certificates);

    return formData;
  };

  useEffect(() => {
    (async () => {
      // `${config.base_url}/doctor/get_doctor_complete_profile/9/cf247f80-0c5f-45c0-b29c-b019f8b90af1`
      try {
        const isProfileUploadResponse = await axios.get(
          `${config.base_url}/doctor/get_doctor_complete_profile/${id}/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
            },
          }
        );

        console.log("isProfileUploadResponse", isProfileUploadResponse);
        let { doctor_details, professional_experience, schedule } =
          isProfileUploadResponse?.data?.data[0];
        if (isProfileUploadResponse?.data?.data?.length > 0) {
          let myObj = {
            ...reduxUserState,
            doctor_details,
            professional_experience,
            schedule,
          };
          dispatch(setUserInformation(myObj));
        }
      } catch (error) {
        console.error("Error uploading picture", error);
      }
    })();
  }, []);
  useEffect(() => {
    if (
      // initialValues.name != formik.values.name ||
      // initialValues.phone != formik.values.phone ||
      // initialValues.email != formik.values.email ||
      // initialValues.dob != formik.values.dob ||
      // initialValues.gender != formik.values.gender ||
      // initialValues.state != formik.values.state ||
      // initialValues.zip_code != formik.values.zip_code ||
      // initialValues.city != formik.values.city ||
      // initialValues.country != formik.values.country
      initialValues.name != formik.values.name ||
      initialValues.phone != formik.values.phone ||
      initialValues.email != formik.values.email ||
      initialValues.dob != formik.values.dob ||
      initialValues.gender != formik.values.gender ||
      initialValues.level != formik.values.level ||
      initialValues.college_name != formik.values.college_name ||
      initialValues.course != formik.values.course ||
      initialValues.year != formik.values.year ||
      initialValues.certificates != formik.values.certificates ||
      initialValues.clinic_name != formik.values.clinic_name ||
      initialValues.clinic_experience != formik.values.clinic_experience ||
      initialValues.specialities != formik.values.specialities ||
      initialValues.clinic_address != formik.values.clinic_address ||
      initialValues.state != formik.values.state ||
      initialValues.zip_code != formik.values.zip_code ||
      initialValues.city != formik.values.city ||
      initialValues.country != formik.values.country ||
      initialValues.clinic_schedule != formik.values.clinic_schedule ||
      initialValues.professional_bio != formik.values.professional_bio
    ) {
      setDisableSaveBtn(false);
    } else {
      setDisableSaveBtn(true);
    }
  }, [formik.values]);

  return (
    <Form onSubmit={formik.handleSubmit} className="reg__form">
      <Row className="mb-3">
        <Form.Group as={Col} lg={6} sm={12}>
          <Form.Control
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && !!formik.errors.name}
          />
          {formik.touched.name && formik.errors.name && (
            <small className="text-danger">{formik.errors.name}</small>
          )}
        </Form.Group>
        <Form.Group as={Col} lg={6} sm={12}>
          <Form.Control
            type="text"
            placeholder="Phone Number"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.phone && !!formik.errors.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <small className="text-danger">{formik.errors.phone}</small>

            // <Form.Control.Feedback type="invalid">
            //   {formik.errors.phone}
            // </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} lg={12} sm={12}>
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-danger">{formik.errors.email}</small>
            // <Form.Control.Feedback type="invalid">
            //   {formik.errors.email}
            // </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} lg={6} sm={12}>
          <InputGroup className="customDatePickerWidth">
            <input
              style={{
                width: "100%",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
              type="date"
              value={formik.values.dob} // Make sure to use the correct value from your formik state
              // max="2019-12-25"
              max={moment().format("YYYY-MM-DD")}
              onChange={(event) =>
                formik.setFieldValue("dob", event.target.value)
              }
              onBlur={formik.handleBlur}
              id="dob"
              name="dob"
              className={
                formik.touched.gender && !!formik.errors.gender
                  ? "is-invalid"
                  : ""
              }
            />

            {/* <InputGroup.Text style={{ cursor: "pointer" }} className="icon">
                <BsCalendar />
              </InputGroup.Text> */}
          </InputGroup>
          {formik.touched.dob && formik.errors.dob && (
            <small className="text-danger">{formik.errors.dob}</small>
            // <Form.Control.Feedback type="invalid">
            //   {formik.errors.dob}
            // </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group as={Col} lg={6} sm={12}>
          <Form.Control
            as="select"
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="gender"
            isInvalid={formik.touched.gender && !!formik.errors.gender}
          >
            <option value={7}>Male</option>
            <option value={8}>Female</option>
          </Form.Control>
          {formik.touched.gender && formik.errors.gender && (
            <small className="text-danger">{formik.errors.gender}</small>
            // <Form.Control.Feedback type="invalid">
            //   {formik.errors.gender}
            // </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col xs={12}>
          <h6>Academic Information<small className="text-danger">*</small></h6>
        </Col>
      </Row>
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
            <small className="text-danger">{formik.errors.college_name}</small>
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
              if (new Date().getFullYear() < date.getFullYear()) {
                formik.setFieldError("year", "Year cannot be in the future");
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
        <h6>Upload Certificates<small className="text-danger">*</small></h6>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} sm={12} className="d-flex justify-content-center">
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
              formik.setFieldValue("certificates", e.target.files);
              // setFile(e.target.files);

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
            <small className="text-danger">{formik.errors.certificates}</small>
          )}
        </div>
      </Row>
      <Row className="mb-3 pe-3" xs={2} md={4}>
        {!formik.errors.certificates && imagePreviews?.length > 0
          ? imagePreviews.map((previewUrl, index) => (
              <Col key={index} className="p-2">
                <div className="d-flex h-100 w-100 border border-secondary">
                  <img
                    src={previewUrl}
                    alt={`Preview ${index}`}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </Col>
            ))
          : reduxUserState?.doctor_details?.certificates?.length &&
            !formik.errors.certificates &&
            imagePreviews &&
            reduxUserState?.doctor_details?.certificates?.map(
              (previewUrl, index) => (
                <Col key={index} className="p-2">
                  <div className="d-flex h-100 w-100 border border-secondary">
                    <img
                      src={previewUrl}
                      alt={`Preview ${index}`}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </Col>
              )
            )}
      </Row>

      <Row className="mb-3">
        <Col xs={12}>
          <h6>Professional Experience<small className="text-danger">*</small></h6>
        </Col>
      </Row>
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
            <small className="text-danger">{formik.errors.specialities}</small>
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
            id="start_time"
            name="start_time"
            value={formik.values.start_time}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.start_time && !!formik.errors.start_time}
          />
          {/* {formik.errors.start_time && (
              <small className="text-danger">{formik.errors.start_time}</small>
            )} */}
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
          className="rounded-3 p-0"
          style={{ border: "solid 2px #3773A9" }}
        >
          <button
            type="button"
            style={{ color: "#3773A9" }}
            className="d-flex w-100 justify-content-center py-3  align-item-center border-0 bg-transparent"
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
                  &nbsp;to&nbsp;
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
            formik.touched.professional_bio && !!formik.errors.professional_bio
          }
        />
        {formik.errors.end_time && (
          <small className="text-danger">
            {formik.errors.professional_bio}
          </small>
        )}
      </Form.Group>

      <div className="d-flex justify-content-end">
        {/* <button
          onClick={() => {
            handlePicture();
          }}
        >
          click
        </button> */}
        <Button
          title={"save"}
          className="px-5 py-3 mt-3"
          type="submit"
          disabled={disableSaveBtn}

          // disabled={formik.isSubmitting}
        />
      </div>

      <ToastContainer />
    </Form>
  );
};

// doctor_id,
//     name,
//     phone,
//     email,
//     dob,
//     gender,
// collage_name,
// course,
// year,
// certificates,
// clinic_name,
// clinic_experience,
// specialities,
// clinic_address,
//     state,
//     zip_code,
//     city,
//     country,
// clinic_schedule,
// description,

export default ProfileOfDoctor;

// <Form onSubmit={formik.handleSubmit} className="reg__form">
// <Row className="mb-3">
//   <Form.Group as={Col} lg={6} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="Doctor Name"
//       id="name"
//       name="name"
//       value={formik.values.name}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.name && !!formik.errors.name
//       }
//     />
//     {formik.touched.name && formik.errors.name && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.name}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
//   <Form.Group as={Col} lg={6} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="Phone Number"
//       id="phone"
//       name="phone"
//       value={formik.values.phone}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.phone && !!formik.errors.phone
//       }
//     />
//     {formik.touched.phone && formik.errors.phone && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.phone}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
// </Row>
// <Row className="mb-3">
//   <Form.Group as={Col} lg={12} sm={12}>
//     <Form.Control
//       type="email"
//       placeholder="Email"
//       id="email"
//       name="email"
//       value={formik.values.email}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.email && !!formik.errors.email
//       }
//     />
//     {formik.touched.email && formik.errors.email && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.email}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
// </Row>
// <Row className="mb-3">
//   <Form.Group as={Col} lg={6} sm={12}>
//     <InputGroup className="customDatePickerWidth">
//       <input
//         style={{
//           width: "100%",
//           border: "1px solid rgba(0, 0, 0, 0.1)",
//         }}
//         type="date"
//         value={formik.values.dob} // Make sure to use the correct value from your formik state
//         onChange={(event) =>
//           formik.setFieldValue("dob", event.target.value)
//         }
//         onBlur={formik.handleBlur}
//         id="dob"
//         name="dob"
//         className={
//           formik.touched.gender && !!formik.errors.gender
//             ? "is-invalid"
//             : ""
//         }
//       />

//       {/* <InputGroup.Text style={{ cursor: "pointer" }} className="icon">
// <BsCalendar />
// </InputGroup.Text> */}
//     </InputGroup>
//     {formik.touched.dob && formik.errors.dob && (
//       // {formik.errors.dob}
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.dob}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
//   <Form.Group as={Col} lg={6} sm={12}>
//     <Form.Control
//       as="select"
//       id="gender"
//       name="gender"
//       value={formik.values.gender}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       placeholder="gender"
//       isInvalid={
//         formik.touched.gender && !!formik.errors.gender
//       }
//     >
//       <option value={7}>Male</option>
//       <option value={8}>Female</option>
//     </Form.Control>
//     {formik.touched.gender && formik.errors.gender && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.gender}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
// </Row>
// <Row className="mb-3">
//   <Form.Group as={Col} lg={12} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="Address"
//       id="address"
//       name="address"
//       value={formik.values.address}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.address && !!formik.errors.address
//       }
//     />
//     {formik.touched.address && formik.errors.address && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.address}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
// </Row>
// <Row className="mb-3">
//   <Form.Group as={Col} lg={6} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="State"
//       id="state"
//       name="state"
//       value={formik.values.state}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.state && !!formik.errors.state
//       }
//     />
//     {formik.touched.state && formik.errors.state && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.state}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
//   <Form.Group as={Col} lg={6} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="Zip Code"
//       id="zip_code"
//       name="zip_code"
//       value={formik.values.zip_code}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.zip_code && !!formik.errors.zip_code
//       }
//     />
//     {formik.touched.zip_code && formik.errors.zip_code && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.zip_code}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
// </Row>
// <Row className="mb-3">
//   <Form.Group as={Col} lg={6} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="City"
//       id="city"
//       name="city"
//       value={formik.values.city}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.city && !!formik.errors.city
//       }
//     />
//     {formik.touched.city && formik.errors.city && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.city}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
//   <Form.Group as={Col} lg={6} sm={12}>
//     <Form.Control
//       type="text"
//       placeholder="Country"
//       id="country"
//       name="country"
//       value={formik.values.country}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       isInvalid={
//         formik.touched.country && !!formik.errors.country
//       }
//     />
//     {formik.touched.country && formik.errors.country && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.country}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
// </Row>
// <Row className="mb-3">
//   <Form.Group as={Col} lg={6} sm={12}>
//     <InputGroup>
//       <Form.Control
//         type={showPassword ? "text" : "password"}
//         placeholder="Password"
//         id="password"
//         name="password"
//         value={formik.values.password}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         isInvalid={
//           formik.touched.password &&
//           !!formik.errors.password
//         }
//       />
//       <InputGroup.Text
//         onClick={() => setShowPassword(!showPassword)}
//         style={{ cursor: "pointer" }}
//         className="icon"
//       >
//         {showPassword ? <FaEyeSlash /> : <FaEye />}
//       </InputGroup.Text>
//     </InputGroup>
//     {formik.touched.password && formik.errors.password && (
//       <Form.Control.Feedback type="invalid">
//         {formik.errors.password}
//       </Form.Control.Feedback>
//     )}
//   </Form.Group>
//   <Form.Group as={Col} lg={6} sm={12}>
//     <InputGroup>
//       <Form.Control
//         type={showConfirmPassword ? "text" : "password"}
//         placeholder="Confirm Password"
//         id="confirmPassword"
//         name="confirmPassword"
//         value={formik.values.confirmPassword}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         isInvalid={
//           formik.touched.confirmPassword &&
//           !!formik.errors.confirmPassword
//         }
//       />
//       <InputGroup.Text
//         onClick={() =>
//           setShowConfirmPassword(!showConfirmPassword)
//         }
//         style={{ cursor: "pointer" }}
//         className="icon"
//       >
//         {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//       </InputGroup.Text>
//     </InputGroup>
//     {formik.touched.confirmPassword &&
//       formik.errors.confirmPassword && (
//         <Form.Control.Feedback type="invalid">
//           {formik.errors.confirmPassword}
//         </Form.Control.Feedback>
//       )}
//   </Form.Group>
// </Row>
// <Button
//   title={"save"}
//   className="w-100 my-4"
//   type="submit"
//   disabled={formik.isSubmitting}
// />
// </Form>
