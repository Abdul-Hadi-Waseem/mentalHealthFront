import { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, InputGroup, Container } from "react-bootstrap";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Common/Buttons/Button";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useActionLoginQuery } from "../../gql/generated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../configs/config";

import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserInformation } from "../../store/slices/UserSlice";
import { getToken } from "../../utils";
interface FormValues {
  email: string;
  password: string;
  level: number;
}

const LoginForm = () => {
  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate("/psc-test");
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    level: Yup.number().required("Required"),
  });
  // const [result, reExecuteQuery] = useActionLoginQuery({
  //   variables: {
  //     Data: {
  //       email: Email,
  //       password: Password,
  //       level: 13,
  //     },
  //   },
  //   pause: true,
  // });

  // useEffect(() => {
  //   if (Email !== "" && Password !== "") {
  //     reExecuteQuery({
  //       requestPolicy: "network-only",
  //     });
  //   }
  // }, [Email, Password, reExecuteQuery]);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      level: 13,
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log("values", values);
      setEmail(values.email);
      setPassword(values.password);
      setFormSubmitted(true);
    },
  });
  useEffect(() => {
    (async () => {
      try {
        if (formSubmitted && Email !== "" && Password !== "") {
          // Check the result only if the form has been submitted
          // console.log(Email, Password);
          const result = await axios.post(`${config.base_url}/api/login`, {
            email: Email,
            password: Password,
          });
          console.log("resultOfLogin ", result);
          // THIS IS FOR PATIENT
          if (result?.data?.accessToken && result?.data?.data?.level == 13) {
            console.log("userData", result.data.data);
            const { age, uid, name } = await result?.data?.data;
            localStorage.setItem("age", age);
            let token = result?.data?.accessToken;
            // const { token, ...remaining } = result?.data?.login?.data;
            // localStorage.setItem(
            //   "user_information",
            //   JSON.stringify(result.data.login.data)
            // );
            localStorage.setItem(
              "user_information",
              JSON.stringify(result?.data?.data)
            );

            // const token = result?.data?.login?.data?.token;
            Cookies.set("token", token);

            if (token) {
              const res = await axios.post(
                `${config.base_url}/patient/psc_test_check`,
                { uid, name },
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Add the authorization token here with the "Bearer" prefix
                  },
                }
                // {uid:"6adbbd88-1c45-4f65-b48c-c7af549bf6b5"}
                // { uid: "a3323143-b20b-40bd-b2f1-1036fe1bde40" }
              );
              console.log("resOfPatient Check ", res.data);
              dispatch(setUserInformation(res.data.data));
              localStorage.setItem(
                "user_complete_information",
                JSON.stringify(res.data.data)
              );
              // IF USER ALREADY GIVEN THE TEST THEN IT WILL REDIRECT TO PATIENT DASHBOARD
              if (res?.data?.program_data_uid) {
                // The login was successful, navigate after 5 seconds
                toast.success("Login Successful"); // Show the success toast
                setTimeout(() => {
                  // navigate("/schedule-appointment"); // Navigate after 5 seconds
                  navigate("/patient-dashboard"); // Navigate after 5 seconds
                  // navigate("/psc-test"); // Navigate after 5 seconds
                }, 3000);
              } else {
                // The login was successful, navigate after 5 seconds
                toast.success("Login Successful"); // Show the success toast
                setTimeout(() => {
                  navigate("/psc-test"); // Navigate after 5 seconds
                  // navigate("/patient-dashboard"); // Navigate after 5 seconds
                }, 3000);
              }
            }
            setFormSubmitted(false);
          }

          // THIS IS FOR DOCTOR
          else if (
            result?.data?.accessToken &&
            result?.data?.data?.level == 11
          ) {
            console.log("login result", result);
            const { age, uid, name } = result?.data?.data;
            localStorage.setItem("age", age);

            const token = result?.data?.accessToken;
            Cookies.set("token", token);
            // `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
            let user = JSON.stringify(result?.data?.data);

            if (token) {
              const res = await axios.get(
                `${config.base_url}/doctor/is_doctor_registered/${name}/${uid}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Add the authorization token here with the "Bearer" prefix
                  },
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
              if (res?.data?.data) {
                // The login was successful, navigate after 5 seconds
                toast.success("Login Successful"); // Show the success toast

                const getDoctorCompleteProfileRes = await axios.get(
                  `${config.base_url}/doctor/get_doctor_complete_profile/${res.data.data.id}/${uid}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Add the authorization token here with the "Bearer" prefix
                    },
                  }
                );

                console.log(
                  "getDoctorCompleteProfileRes",
                  getDoctorCompleteProfileRes
                );
                if (getDoctorCompleteProfileRes?.data?.data?.length > 0) {
                  let { doctor_details, professional_experience, schedule } =
                    getDoctorCompleteProfileRes?.data?.data[0];
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
              } else {
                // The login was successful, navigate after 5 seconds
                toast.success("Login Successful"); // Show the success toast
                localStorage.setItem("doctor_information", user);
                setTimeout(() => {
                  navigate("/academic-information"); // Navigate after 5 seconds
                }, 5000);
              }
            }
            setFormSubmitted(false);
          }

          // FOR TEACHER LOGIN
          else if (
            result?.data?.accessToken &&
            result?.data?.data?.role === "teacher"
          ) {
            toast.success("Login Successful");
            Cookies.set("token", result?.data?.accessToken);
            localStorage.setItem(
              "teacher_information",
              JSON.stringify(result?.data?.data)
            );
            setTimeout(() => {
              navigate("/teacher-dashboard");
            }, 3000);
            // `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
          }

          //FOR INSTITUTE LOGIN
          else if (
            result?.data?.accessToken &&
            result?.data?.data?.role === "institute"
          ) {
            toast.success("Login Successful");
            Cookies.set("token", result?.data?.accessToken);
            localStorage.setItem(
              "institute_information",
              JSON.stringify(result?.data?.data)
            );
            setTimeout(() => {
              navigate("/institute-dashboard");
            }, 3000);
            // `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
          }

          // FOR STUDENT LOGIN
          else if (
            result?.data?.accessToken &&
            result?.data?.data?.role === "student"
          ) {
            toast.success("Login Successful");
            Cookies.set("token", result?.data?.accessToken);
            localStorage.setItem(
              "student_information",
              JSON.stringify(result?.data?.data)
            );
            setTimeout(() => {
              navigate("/student-dashboard");
            }, 3000);
            // `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
          }

          if (result?.data?.error?.message) {
            // If there's an error or the token is not present, show the error toast
            toast.error("Invalid Email/Password");
            setFormSubmitted(false);
          }
        }
      } catch (error) {
        console.log("error in checkIsTestSubmitted", error);
      }
    })();
  }, [formSubmitted]);

  return (
    <Container className="login__section">
      <Row className="mb-3 ">
        <Col sm={12} className="">
        <h1 className="">
            take a moment for yourself and let's continue your 
            <br />
            <span className="txt__green">Journey to well-being</span>
          </h1>
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit} className="login__form mt-5">
        <Row className="mb-3">
          <Form.Group as={Col} sm={12}>
            <Form.Control
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email / Username"
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
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
              {formik.touched.password && formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </InputGroup>
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
            {/* <Link to="/register" className="account__link"> */}
            <Link to="/select-user" className="account__link">
              Register
            </Link>
          </span>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default LoginForm;
