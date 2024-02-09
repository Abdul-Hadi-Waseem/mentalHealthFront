import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState} from "react";
import { Col, Container, Form, InputGroup, Row ,Spinner} from "react-bootstrap";
import * as Yup from "yup";
import Button from "../Common/Buttons/Button";

import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../configs/config";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setUserInformation, setPscOrScreen } from "../../store/slices/UserSlice";
interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false)
  const navigate = useNavigate();

  const {email, token }= useParams();
// console.log("email, token", email,token)
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });
  
  const formik = useFormik<FormValues>({
    initialValues: {
      password: "", 
      confirmPassword: ""
    },
    validationSchema,
    onSubmit: async(values: FormValues) => {
      try {
        
        setSubmitBtn(true);
        const result = await axios.post(`${config.base_url}/user/reset_password`, {
          email,token, password: values.password
        });
  
        console.log("reset values", result)

        toast.success("Password Reset Successflly")
        setTimeout(() => {
          navigate("/login")
        }, 2000);

      } catch (error) {
        console.log("", values)

        toast.error("Password Not Successfully Reset")
        
      }
    },
  });
 
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post(
          `${config.base_url}/user/token_validity`,
          {
            email,
            token,
          }
        );
        console.log("reset values", result);
        if (!result?.data?.success) {
          toast.error("Link Expired!");
          setTimeout(() => {
            setIsTokenValid(false);
            navigate("/forgot-password");
          }, 1000);
        }else{
          setIsTokenValid(true);
        }
      } catch (error) {
        // toast.error("Password Not Successfully Reset");
        toast.error("server side error!");
        console.log("server side error", error.message);
      }
    })();
  }, []);
  if (!isTokenValid) {
    // return<div>Loading...</div>;
    return<div>
       <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      height: "90vh",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <Spinner
                      animation="border"
                      role="status"
                      style={{ color: "#5E9CD3" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
    </div>;
  }
  return (
    <Container className="login__section bg-white">
      <Row className="mb-3 ">
        <Col sm={12} className="">
          <h1 className="">
          Reset your password
          </h1>
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit} className="login__form mt-5">
      <Row className="mb-3">
      <Row className="mb-3">
              <Form.Group as={Col} lg={6} sm={12}>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.password && !!formik.errors.password
                    }
                  />
                  <InputGroup.Text
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                    className="icon"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                )}
              </Form.Group>
              <Form.Group as={Col} lg={6} sm={12}>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.confirmPassword &&
                      !!formik.errors.confirmPassword
                    }
                  />
                  <InputGroup.Text
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: "pointer" }}
                    className="icon"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <small className="text-danger">
                      {formik.errors.confirmPassword}
                    </small>
                  )}
              </Form.Group>
            </Row>
        </Row>
        <Row className=" my-5">
          <Col xs={12} className="text-center">
            <Button title="Submit" className="w-100" type="submit" disabled={submitBtn} />
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default ResetPassword;