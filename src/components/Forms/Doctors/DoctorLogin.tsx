import { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, InputGroup, Container } from "react-bootstrap";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../Common/Buttons/Button";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useActionLoginQuery } from "../../../gql/generated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../../configs/config";

import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserInformation } from "../../../store/slices/UserSlice";
import { getToken } from "../../../utils";

interface FormValues {
  email: string;
  password: string;
  level: number;
}

const DoctorLoginForm = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate("/psc-test");
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .matches(
        /[\^\$\\.\[\]|{}()?\*\+\-\@]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    level: Yup.number().required("level is Required"),
  });
  const [result, reExecuteQuery] = useActionLoginQuery({
    variables: {
      Data: {
        email: Email,
        password: Password,
        level: 11,
      },
    },
    pause: true,
  });

  useEffect(() => {
    if (Email !== "" && Password !== "") {
      reExecuteQuery({
        requestPolicy: "network-only",
      });
    }
  }, [Email, Password, reExecuteQuery]);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      // email: "uzair123@yopmail.com",
      // password: "uzair@123",
      level: 11,
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log("doctor login value", values);
      setEmail(values.email);
      setPassword(values.password);
      setFormSubmitted(true);
    },
  });

  useEffect(() => {
    (async () => {
      try {
        if (formSubmitted) {
          // Check the result only if the form has been submitted
          if (result?.data?.login?.data?.token) {
            console.log("login result", result);
            const { age, uid, name } = result?.data?.login?.data;
            localStorage.setItem("age", age);

            const token = result?.data?.login?.data?.token;
            Cookies.set("token", token);
            // `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
            let user = JSON.stringify({ ...result?.data?.login?.data });

            if (token) {
              const res = await axios.get(
                `${config.base_url}/doctor/is_doctor_registered/${name}/${uid}`, {
                  headers: {
                    'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
                  }
                }
              );
              const updateUser = { age, name, uid, ...res.data.data };
              console.log("is_registered_respose", res);
              localStorage.setItem(
                "doctor_information",
                JSON.stringify(updateUser)
              );
              localStorage.setItem(
                "user_complete_information",
                JSON.stringify(updateUser)
              );

           
            

              // const email = formik.values.email.trim()
              // console.log("resOfUserLogin", email);
              // const resOfUserLogin = await axios.get(
              //   `${config.base_url}/user/get_user_information/${email}`, {
          //   headers: {
          //     'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
          //   }
          // }
              // );
              // console.log("resOfUserLogin", resOfUserLogin);
              // localStorage.setItem("user_complete_information", JSON.stringify(resOfUserLogin.data.data));

              // {uid:"6adbbd88-1c45-4f65-b48c-c7af549bf6b5"}
              // { uid: "a3323143-b20b-40bd-b2f1-1036fe1bde40" }
              if (res?.data?.data) {
                // The login was successful, navigate after 5 seconds
                toast.success("Login Successful"); // Show the success toast

                const getDoctorCompleteProfileRes = await axios.get(
                  `${config.base_url}/doctor/get_doctor_complete_profile/${res.data.data.id}/${uid}`, {
                    headers: {
                      'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
                    }
                  }
                );
        
                console.log("getDoctorCompleteProfileRes", getDoctorCompleteProfileRes);
                let { doctor_details, professional_experience, schedule } =
                  getDoctorCompleteProfileRes?.data?.data[0];
                if (getDoctorCompleteProfileRes?.data?.data?.length > 0) {
                  let myObj = {
                    ...res?.data?.data,
                    doctor_details,
                    professional_experience,
                    schedule,
                  };
                  dispatch(setUserInformation(myObj));
                  setTimeout(() => {
                    navigate("/doctor-dashboard"); // Navigate after 5 seconds
                  }, 5000);
                }



                // let schedule =  [{ day: "", start_time: "", end_time: "" }];
                // let doctor_details = { certificates : "", course : "", year : "", college_name: "" };
                // let professional_experience = {
                //   address: "",
                //   state: "",
                //   zip_code: "",
                //   city: "",
                //   country: "",
                //   clinic_name: "",
                //   clinic_experience: "",
                //   specialities: "",
                //   clinic_address: "",
                //   description: "",
                // };
                // let myObj = {...res?.data?.data, professional_experience, doctor_details,schedule}
                // dispatch(setUserInformation(myObj));
              
              } else {
                // The login was successful, navigate after 5 seconds
                toast.success("Login Successful"); // Show the success toast
                let schedule =  [{ day: "", start_time: "", end_time: "" }];
                let doctor_details = { certificates : "", course : "", year : "", college_name: "" };
                let professional_experience = {
                  address: "",
                  state: "",
                  zip_code: "",
                  city: "",
                  country: "",
                  clinic_name: "",
                  clinic_experience: "",
                  specialities: "",
                  clinic_address: "",
                  description: "",
                };
                let myObj = {...res?.data?.data, professional_experience, doctor_details,schedule}
                dispatch(setUserInformation(myObj));

                localStorage.setItem("doctor_information", user);
                setTimeout(() => {
                  navigate("/academic-information"); // Navigate after 5 seconds
                }, 5000);
              }
            }
            setFormSubmitted(false);
          }
          if (result.error) {
            // If there's an error or the token is not present, show the error toast
            toast.error("Invalid Email/Password");
          }
        }
      } catch (error) {
        console.log(
          "error in doctor dashboard checkIsRegistered",
          error.message
        );
      }
    })();
    // console.log(result,"");
    // if (formSubmitted) {
    //   // Check the result only if the form has been submitted
    //   if (result?.data?.login?.data?.token) {
    //     console.log("login result", result);
    //     const { age, uid, name } = result?.data?.login?.data?.age;
    //     localStorage.setItem("age", age);

    //     const token = result?.data?.login?.data?.token;
    //     Cookies.set("token", token);

    //     if (token) {
    //       // The login was successful, navigate after 5 seconds
    //       toast.success("Login Successful"); // Show the success toast

    //       let user = JSON.stringify({ ...result?.data?.login?.data });
    //       localStorage.setItem("doctor_information", user);
    //       setTimeout(() => {
    //         navigate("/academic-information"); // Navigate after 5 seconds
    //       }, 5000);
    //     }
    //     setFormSubmitted(false);
    //   }
    //   if (result.error) {
    //     // If there's an error or the token is not present, show the error toast
    //     toast.error("Invalid Email/Password");
    //   }
    // }
  }, [formSubmitted, navigate, result]);

  return (
    <Container className="login__section">
      <Row className="mb-3 ">
        <Col sm={12} className="">
          <h1 className="">
            Very good work
            <br /> are waiting for <br />
            you <span className="txt__green">login now</span> 👋
          </h1>
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit} className="login__form mt-5">
        <Row className="mb-3">
          <Form.Group as={Col} sm={12}>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>

              // <Form.Control.Feedback type="invalid">
              // {formik.errors.email}
              // </Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} sm={12}>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
                className="show__pass"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </InputGroup.Text>
            </InputGroup>
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger">{formik.errors.password}</small>
              // <Form.Control.Feedback type="invalid">
              //   {formik.errors.password}
              // </Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>
        <Row className=" my-5">
          <Col xs={12} className="text-center">
            <Button title="Login" className="w-100" type="submit" />
          </Col>
        </Row>
        <Row className="text-center">
          <span style={{ fontSize: "14px" }}>
            Don’t have an account yet?{" "}
            <Link to="/doctor-registration" className="account__link">
              Register
            </Link>
          </span>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default DoctorLoginForm;
