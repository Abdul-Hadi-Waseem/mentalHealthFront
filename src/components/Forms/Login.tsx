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

interface FormValues {
  email: string;
  password: string;
  level: number;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate("/psc-test");
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    level: Yup.number().required("Required"),
  });
  const [result, reExecuteQuery] = useActionLoginQuery({
    variables: {
      Data: {
        email: Email,
        password: Password,
        level: 13,
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
        // console.log("result", result);
        if (formSubmitted) {
          // Check the result only if the form has been submitted
          if (result?.data?.login?.data?.token) {
            console.log("userData", result.data.login.data);
            const { age, uid, name } = await result?.data?.login?.data;
            // localStorage.setItem("age", age);
            localStorage.setItem(
              "user_information",
              JSON.stringify(result.data.login.data)
            );

            const token = result?.data?.login?.data?.token;
            Cookies.set("token", token);

            if (token) {
              const res = await axios.post(
                `${config.base_url}/patient/psc_test_check`,
                { uid, name}
                // {uid:"6adbbd88-1c45-4f65-b48c-c7af549bf6b5"}
                // { uid: "a3323143-b20b-40bd-b2f1-1036fe1bde40" }
              );
              console.log("resOfPatient Check ", res.data)
              localStorage.setItem("user_complete_information", JSON.stringify(res.data.data));

              if (res?.data?.program_data_uid) {
                // The login was successful, navigate after 5 seconds
                toast.success("Login Successful"); // Show the success toast
                setTimeout(() => {
                  // navigate("/schedule-appointment"); // Navigate after 5 seconds
                  navigate("/patient-dashboard"); // Navigate after 5 seconds
                }, 3000);
              } else {
                // The login was successful, navigate after 5 seconds
                toast.success("Login Successful"); // Show the success toast
                setTimeout(() => {
                  navigate("/psc-test"); // Navigate after 5 seconds
                }, 3000);
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
        console.log("error in checkIsTestSubmitted", error.response.data.data);
      }
    })();
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
            <Link to="/register" className="account__link">
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
