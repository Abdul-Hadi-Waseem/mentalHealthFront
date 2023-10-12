import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../../Common/Buttons/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerInstitute } from "./InstituteAPIs";

export interface FormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  zip_code: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
  level: number;
}

const InstituteRegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues: FormValues = {
    name: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    zip_code: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
    level: 11,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .max(12, "Total Length must be 12")
      .matches(
        /^\+\d{11}$/,
        'Phone number must start with "+" and have 11 digits'
      ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .matches(
        /[\^\$\\.\[\]|{}()?\*\+\-\@]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    // .min(8, "Password must be at least 8 characters")
    // .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: FormValues) => {};

  const registerPostRequest = (values: FormValues) => {
    try {
      registerInstitute(values).then((res) => {
        if (res?.data?.status === 200) {
          toast.success("Registration Successful", {
            hideProgressBar: true,
          });
          setTimeout(() => {
            navigate("/sign-in");
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

  return (
    <Container className="login__section">
      <Row className="mb-4">
        <Col sm={12} className="">
          <h1>
            Signup
            <br />
            <span className="txt__green">Mental Support</span> 👋
          </h1>
        </Col>
      </Row>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="reg__form">
            <Row className="mb-3">
              <Form.Group as={Col} lg={6} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Institute Name"
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
                  max={11}
                  type="text"
                  placeholder="+01234567890"
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
                  placeholder="username.cs@gmail.com"
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
              <Form.Group as={Col} lg={12} sm={12}>
                <Form.Control
                  type="address"
                  placeholder="Institute Address"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.address && !!formik.errors.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <small className="text-danger">{formik.errors.address}</small>
                  // <Form.Control.Feedback type="invalid">
                  //   {formik.errors.email}
                  // </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            {/* <Row className="mb-3">
          <Form.Group as={Col} lg={12} sm={12}>
            <Form.Control
              type="text"
              placeholder="Address"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.address && !!formik.errors.address}
            />
            {formik.touched.address && formik.errors.address && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Row> */}
            <Row className="mb-3">
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
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.state}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group as={Col} lg={6} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Zip Code"
                  id="zip_code"
                  name="zip_code"
                  value={formik.values.zip_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.zip_code && !!formik.errors.zip_code
                  }
                />
                {formik.touched.zip_code && formik.errors.zip_code && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.zip_code}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
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
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.city}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group as={Col} lg={6} sm={12}>
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
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.country}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
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
                  // <Form.Control.Feedback type="invalid">
                  //   {formik.errors.password}
                  // </Form.Control.Feedback>
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
                    // <Form.Control.Feedback type="invalid">
                    //   {formik.errors.confirmPassword}
                    // </Form.Control.Feedback>
                  )}
              </Form.Group>
            </Row>
            <Button
              title={"Sign-up"}
              className="w-100 my-4"
              type="submit"
              onClick={() => {
                Object.keys(formik.errors).length === 0 &&
                  registerPostRequest(formik.values);
              }}
              disabled={formik.isSubmitting}
            />
            <Row className="text-center">
              <span style={{ fontSize: "14px" }}>
                Have an account?
                <Link to="/sign-in" className="account__link">
                  Login
                </Link>
              </span>
            </Row>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </Container>
  );
};

export default InstituteRegistrationForm;
