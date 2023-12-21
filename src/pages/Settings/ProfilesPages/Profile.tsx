import { getToken } from "../../../utils";
import { FaBell, FaChevronDown } from "react-icons/fa6";
import Avatar from "react-avatar";
import { useLocation } from "react-router-dom";
import Setting from "../Setting";
// import doctor_img from "../../assets/images/doctor.svg";
import patient_img from "./../../../assets/images/patient_img.png";
import edit_icon from "./../../../assets/icons/edit_icon.svg";
import edit_circle from "./../../../assets/icons/edit_circle.svg";
import "./profilepages.css";

import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Container, Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Common/Buttons/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker
import { Link, useNavigate } from "react-router-dom";
// import { useActionsUsersRegistrationMutation } from "../../gql/generated"
import { usePatientRegistrationMutation } from "./../../../gql/generated";
// import { useDoctorRegistrationMutation } from "../../gql/generated";
// import Tooltips from "../Common/Tooltips";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "./../../../configs/config";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserInformation } from "../../../store/slices/UserSlice";
import ProfileOfPatient from "../../../components/Forms/ProfileOfPatient";
import ProfileOfDoctor from "../../../components/Forms/Doctors/ProfileOfDoctor";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: number;
  address: string;
  state: string;
  zip_code: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
  level: number;
}

function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [result, executeMutation] = usePatientRegistrationMutation();
  // const [result, executeMutation] = useDoctorRegistrationMutation();
  const navigate = useNavigate();
  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );
  // console.log("reduxUserState", reduxUserState)
  const initialValues: FormValues = {
    name: "",
    phone: "",
    email: "",
    dob: new Date("2004-06-30T19:00:00.000Z").toString(),
    gender: 7,
    address: "",
    state: "",
    zip_code: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
    level: 13,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),
    gender: Yup.number().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if(values.dob == new Date("2004-06-30T19:00:00.000Z").toString()){
        return toast.error("Date of Birth is required");
      }
      values.gender = Number(values.gender);

      const dobDate = new Date(values.dob);
      const formattedDob = dobDate.toISOString();

      values.dob = formattedDob;

      const { confirmPassword, ...dataToSend } = values;
      console.log("dataToSend", dataToSend);
      try {
        let { email, phone } = dataToSend;
        // const isRegisteredResponse = await axios.get(`${config.base_url}/user/isAlreadyRegister/uzair123@yopmail.com/03432345671`)
        const isRegisteredResponse = await axios.get(
          `${config.base_url}/user/isAlreadyRegister/${email}/${phone}/13`, {
            headers: {
              'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
            }
          }
        );
        console.log(
          "isRegisteredResponse",
          isRegisteredResponse?.data?.isRegistered
        );
        if (isRegisteredResponse?.data?.isRegistered) {
          return toast.error("Email Or Phone is already registered");
        } else {
          await executeMutation({ Data: dataToSend });
          console.log("signup result", result);
          toast.success("Registration Successful"); // Show the success toast

          await executeMutation({ Data: dataToSend });
          console.log("responseOfSignup", result);
          toast.success("Registration Successful"); // Show the success toast
          setTimeout(() => {
            navigate("/login"); // Navigate after 5 seconds
          }, 3000);
        }
      } catch (error) {
        toast.error("Registration not successful");
        console.error(error);
      }

      // try {
      //   await executeMutation({ Data: dataToSend });
      //   const response = await result;
      //   console.log("responseOfSignup", response)
      //   toast.success("Registration Successful"); // Show the success toast
      //   setTimeout(() => {
      //     navigate("/login"); // Navigate after 5 seconds
      //   }, 5000);
      // } catch (error) {
      //   toast.error("Registration not successful");
      //   console.error(error);
      // }
    },
  });

  return (
    <Setting>
      <Container fluid>
        <Container className="h-100 left-border px-2">
          <Row>
            <Col xs={12}>
              <h4 style={{ color: "#243D4C" }}>Edit Profile </h4>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="main_profile_image">
                <Image className="profile_image" src={patient_img} />
                <div className="edit_profile_div">
                  <div className="edit_profile_relative">
                    <Image className="edit_cirlce" src={edit_circle} />
                    <Image className="edit_icon" src={edit_icon} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Container className="pt-4 mb-2 px-0">
                {reduxUserState.level == 13 ? (
                  <ProfileOfPatient />
                ) : (
                 <ProfileOfDoctor />
                )}

                <ToastContainer />
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    </Setting>
  );
}

export default Profile;
