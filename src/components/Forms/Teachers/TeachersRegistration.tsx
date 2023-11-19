import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Button from "../../Common/Buttons/Button";
import { getInstitutes, registerTeacher } from "./TeachersAPIs";

export interface FormValues {
  name: string;
  institute: string;
  email: string;
  dob: string;
  gender: "Male" | "Female";
  phone: string;
  state: string;
  zip_code: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
  address: string;
  qualification: "qualified" | "unqualified";
  classes: string;
}

const TeachersRegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mailFromUrl = queryParams.get("email");
  const qualification = queryParams.get("qualification");
  const classes = queryParams.get("classes");
  const institute_name = queryParams.get("institute");
  const navigate = useNavigate();

  console.log(queryParams, "dedit query params");
  console.log(mailFromUrl, "dedit mail");
  console.log(qualification, "dedit qualification");
  console.log(classes, "dedit classes");

  if (!mailFromUrl) {
    window.history.replaceState({}, document.title, "/");
    navigate("/");
  }
  window.history.replaceState({}, document.title, "/" + "teacher-registration");

  const initialValues: FormValues = {
    name: "",
    institute: institute_name,
    phone: "",
    email: mailFromUrl,
    dob: "",
    gender: null,
    state: "",
    zip_code: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
    address: "",
    qualification: qualification as "qualified" | "unqualified",
    classes: classes,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address Name is Required"),
    institute: Yup.string().required("Institute Name is Required"),
    // email: Yup.string().email("Invalid email").required("Email is required"),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: FormValues) => {};

  const { data: institutesData } = useQuery(
    "GetAllInstituteNames",
    () => getInstitutes(),
    {
      onError: () =>
        toast.error("Error Fetching Institute names. Please Try Again."),       
    }
  );

  const registerPostRequest = (values: FormValues) => {    
    const instituteID = institutesData?.data.data?.find(
      (each: { id: number; name: string }) => each.name === institute_name
    )?.id;      
    if (values.gender !== "Male" && values.gender !== "Female") {
      toast.error("Please Select Gender");
      return;
    }        
    if (
      values.institute === undefined ||
      values.institute === "Institute Name"
    ) {
      
      toast.error("Please Select Institute");
      return;
    }
    try {
      values.institute = instituteID; 
      registerTeacher(values).then((res) => {
        if (res?.data?.status === 200) {
          toast.success("Registration Successful", {
            hideProgressBar: true,
          });
          setTimeout(() => {
            navigate("/login");
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

  useEffect(() => {
    const email = queryParams.get("email");
  }, []);

  return (
    <Container className="login__section">
      <Row className="mb-4">
        <Col sm={12} className="">
          <h1>
            Signup
            <br />
            <span className="txt__green">Teacher Registration</span> 👋
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
                  placeholder="Full Name"
                  id="name"
                  name="name"
                  value={formik?.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger">{formik.errors.name}</small>
                )}
              </Form.Group>
              {/* <Form.Group as={Col} lg={6} sm={12}>
                <Form.Select
                  aria-label=""
                  onChange={(e) => {
                    formik.setFieldTouched("institute", true);
                    formik.setFieldValue("institute", e?.target?.value);
                  }}
                >
                  <option>Institute Name</option>
                  {institutesData?.data?.data?.map(
                    (each: { id: number; name: string }) => (
                      <option value={each.id} key={each.id}>
                        {each.name}
                      </option>
                    )
                  )}
                </Form.Select>
                {formik.touched.state && formik.errors.state && (
                  <small className="text-danger">{formik.errors.state}</small>
                )}
                {formik.touched.institute && formik.errors.institute && (
                  <small className="text-danger">
                    {formik.errors.institute}
                  </small>
                )}
              </Form.Group> */}
              <Form.Group as={Col} lg={6} sm={12}>
              <Form.Control
                  type="text"
                  placeholder="Intitute Name"
                  id="institute"
                  name="institute"
                  value={formik?.values.institute}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.institute && !!formik.errors.institute}
                  disabled
                />               
                {/* {formik.touched.state && formik.errors.state && (
                  <small className="text-danger">{formik.errors.state}</small>
                )}
                {formik.touched.institute && formik.errors.institute && (
                  <small className="text-danger">
                    {formik.errors.institute}
                  </small>
                )} */}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} lg={12} sm={12}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={formik?.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                  disabled
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger">{formik.errors.email}</small>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} lg={12} sm={12}>
                <Form.Control
                  type="phone"
                  placeholder="+15555555555"
                  id="phone"
                  name="phone"
                  value={formik?.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.phone && !!formik.errors.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <small className="text-danger">{formik.errors.phone}</small>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} lg={6} sm={12}>
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  id="dob"
                  value={formik?.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.dob && !!formik.errors.dob}
                />
                {formik.touched.dob && formik.errors.dob && (
                  <small className="text-danger">{formik.errors.dob}</small>
                )}
              </Form.Group>
              <Form.Group as={Col} lg={6} sm={12}>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    formik.setFieldTouched("gender", true);

                    formik.setFieldValue("gender", e?.target?.value);
                  }}
                >
                  <option aria-invalid>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
                {formik.touched.state && formik.errors.state && (
                  <small className="text-danger">{formik.errors.state}</small>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  id="address"
                  name="address"
                  value={formik?.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.address && !!formik.errors.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <small className="text-danger">{formik.errors.address}</small>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} lg={6} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="State"
                  id="state"
                  name="state"
                  value={formik?.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.state && !!formik.errors.state}
                />
                {formik.touched.state && formik.errors.state && (
                  <small className="text-danger">{formik.errors.state}</small>
                )}
              </Form.Group>
              <Form.Group as={Col} lg={6} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Zip Code"
                  id="zip_code"
                  name="zip_code"
                  value={formik?.values.zip_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.zip_code && !!formik.errors.zip_code
                  }
                />
                {formik.touched.zip_code && formik.errors.zip_code && (
                  <small className="text-danger">
                    {formik.errors.zip_code}
                  </small>
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
                  value={formik?.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.city && !!formik.errors.city}
                />
                {formik.touched.city && formik.errors.city && (
                  <small className="text-danger">{formik.errors.city}</small>
                )}
              </Form.Group>
              <Form.Group as={Col} lg={6} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Country"
                  id="country"
                  name="country"
                  value={formik?.values.country}
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
              <Form.Group as={Col} lg={6} sm={12}>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formik?.values.password}
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
                    value={formik?.values.confirmPassword}
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
            <Button
              title={"Sign-up"}
              className="w-100 my-4"
              type="submit"
              onClick={() => {
                Object.keys(formik?.errors).length === 0 &&
                  registerPostRequest(formik?.values);
              }}
              disabled={formik.isSubmitting}
            />
            <Row className="text-center">
              <span style={{ fontSize: "14px" }}>
                Have an account?
                <Link to="/login" className="account__link">
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

export default TeachersRegistrationForm;
