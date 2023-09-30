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
import { useQuery } from "react-query";
import { instituteLogin } from "./InstituteAPIs";

interface FormValues {
  email: string;
  password: string;
}

const InstituteLoginForm = () => {
  const navigate = useNavigate();
  // const handleClick = useCallback(() => {
  //   navigate("/psc-test");
  // }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  // const [Email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");
  // const [formSubmitted, setFormSubmitted] = useState(false);

  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

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
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log(values, "dedit");
    },
  });

  const LoginPostRequest = (email: string, password: string) => {
    try {
      instituteLogin(email, password).then((res) => {
        console.log(res, "dedit");
        if (res?.data?.status === 200) {
          toast.success("Login Successful");
          Cookies.set("token", res?.data?.accessToken);
          localStorage.setItem(
            "institute_information",
            JSON.stringify(res?.data?.data)
          );
          setTimeout(() => {
            navigate("/institute-dashboard");
          }, 3000);
        }
        if (res?.data?.status !== 200) {
          toast.error(res?.data?.message, {
            hideProgressBar: true,
          });
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (formSubmitted) {
  //         // Check the result only if the form has been submitted
  //         if (result?.data?.login?.data?.token) {
  //           console.log("login result", result);
  //           const { age, uid, name } = result?.data?.login?.data;
  //           localStorage.setItem("age", age);

  //           const token = result?.data?.login?.data?.token;
  //           Cookies.set("token", token);
  //           // `${config.base_url}/doctor/is_doctor_registered/pathan/c26fbc47-fb8e-4255-91a2-32d5eee81470`
  //           let user = JSON.stringify({ ...result?.data?.login?.data });

  //           if (token) {
  //             const res = await axios.get(
  //               `${config.base_url}/doctor/is_doctor_registered/${name}/${uid}`
  //             );
  //             const updateUser = { age, name, uid, ...res.data.data };
  //             console.log("is_registered_respose", res);
  //             localStorage.setItem(
  //               "doctor_information",
  //               JSON.stringify(updateUser)
  //             );
  //             localStorage.setItem(
  //               "user_complete_information",
  //               JSON.stringify(updateUser)
  //             );

  //             // const email = formik.values.email.trim()
  //             // console.log("resOfUserLogin", email);
  //             // const resOfUserLogin = await axios.get(
  //             //   `${config.base_url}/user/get_user_information/${email}`
  //             // );
  //             // console.log("resOfUserLogin", resOfUserLogin);
  //             // localStorage.setItem("user_complete_information", JSON.stringify(resOfUserLogin.data.data));

  //             // {uid:"6adbbd88-1c45-4f65-b48c-c7af549bf6b5"}
  //             // { uid: "a3323143-b20b-40bd-b2f1-1036fe1bde40" }
  //             if (res?.data?.data) {
  //               // The login was successful, navigate after 5 seconds
  //               toast.success("Login Successful"); // Show the success toast
  //               setTimeout(() => {
  //                 navigate("/doctor-dashboard"); // Navigate after 5 seconds
  //               }, 5000);
  //             } else {
  //               // The login was successful, navigate after 5 seconds
  //               toast.success("Login Successful"); // Show the success toast

  //               localStorage.setItem("doctor_information", user);
  //               setTimeout(() => {
  //                 navigate("/academic-information"); // Navigate after 5 seconds
  //               }, 5000);
  //             }
  //           }

  //           setFormSubmitted(false);
  //         }
  //         if (result.error) {
  //           // If there's an error or the token is not present, show the error toast
  //           toast.error("Invalid Email/Password");
  //         }
  //       }
  //     } catch (error) {
  //       console.log(
  //         "error in doctor dashboard checkIsRegistered",
  //         error.response.data.data
  //       );
  //     }
  //   })();
  //   // console.log(result,"");
  //   // if (formSubmitted) {
  //   //   // Check the result only if the form has been submitted
  //   //   if (result?.data?.login?.data?.token) {
  //   //     console.log("login result", result);
  //   //     const { age, uid, name } = result?.data?.login?.data?.age;
  //   //     localStorage.setItem("age", age);

  //   //     const token = result?.data?.login?.data?.token;
  //   //     Cookies.set("token", token);

  //   //     if (token) {
  //   //       // The login was successful, navigate after 5 seconds
  //   //       toast.success("Login Successful"); // Show the success toast

  //   //       let user = JSON.stringify({ ...result?.data?.login?.data });
  //   //       localStorage.setItem("doctor_information", user);
  //   //       setTimeout(() => {
  //   //         navigate("/academic-information"); // Navigate after 5 seconds
  //   //       }, 5000);
  //   //     }
  //   //     setFormSubmitted(false);
  //   //   }
  //   //   if (result.error) {
  //   //     // If there's an error or the token is not present, show the error toast
  //   //     toast.error("Invalid Email/Password");
  //   //   }
  //   // }
  // }, [formSubmitted, navigate, result]);

  const responseHandler = () => {};
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
            <Button
              title="Login"
              className="w-100"
              type="submit"
              onClick={() => {
                console.log(Object.keys(formik.errors), "dedit");
                Object.keys(formik.errors).length === 0 &&
                  LoginPostRequest(formik.values.email, formik.values.password);
              }}
            />
          </Col>
        </Row>
        <Row className="text-center">
          <span style={{ fontSize: "14px" }}>
            Don’t have an account yet?{" "}
            <Link to="/institute-registration" className="account__link">
              Register
            </Link>
          </span>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default InstituteLoginForm;
