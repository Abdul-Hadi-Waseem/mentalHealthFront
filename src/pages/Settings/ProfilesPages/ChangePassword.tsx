import { getToken } from "../../../utils";
import { FaBell, FaChevronDown } from "react-icons/fa6";
import Avatar from "react-avatar";
import { Form, Container, Row, Col, Image, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Setting from "../Setting";
import "./profilepages.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../../components/Common/Buttons/Button";
import config from "../../../configs/config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserInformation } from "../../../store/slices/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );

  const initialValues = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
    // currentPassword: "uzair",
    // password: "uzair@123",
    // confirmPassword: "uzair@123",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is required"),
    // password: Yup.string()
    //   .min(8, "Password must be at least 8 characters")
    //   .required("Password is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "Current Password and New Password must be different"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values, "Value");
        let { email, phone, id } = reduxUserState;
        let { currentPassword, password } = values;
        const data = {
          currentPassword,
          newPassword: password,
          email,
          phone,
          id,
        };
        setDisableSaveBtn(true);

        const changePassworResponse = await axios.post(
          `${config.base_url}/user/change_password`,
          {
            data,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
            },
          }
        );
        console.log("isProfileUploadResponse", changePassworResponse);
        setDisableSaveBtn(false);

        if (changePassworResponse?.data?.success) {
          toast.success(changePassworResponse?.data?.message);
        } else {
          // toast.error("Email Or Phone is already registered");
          toast.error(changePassworResponse?.data?.message);
        }
      } catch (error) {
        console.error("error in changePassword");
      }
    },
  });
  useEffect(() => {
    if (
      !formik?.values?.currentPassword ||
      !formik?.values?.password ||
      !formik?.values?.confirmPassword
    ) {
      setDisableSaveBtn(true);
      console.log(
        "formik errors",
        formik?.errors?.currentPassword,
        formik?.errors?.password,
        formik?.errors?.confirmPassword
      );
    } else {
      console.log(
        "formik errors",
        formik?.errors?.currentPassword,
        formik?.errors?.password,
        formik?.errors?.confirmPassword
      );
      setDisableSaveBtn(false);
    }
  }, [formik.values]);
  return (
    <Setting>
      <Container fluid>
        <Container className="h-100 left-border px-2">
          <Row className="mb-3">
            <Col xs={12}>
              <h4 style={{ color: "#243D4C" }}>Change Password</h4>
            </Col>
          </Row>

          <Form onSubmit={formik.handleSubmit} className="reg__form">
            <Row className="mb-3">
              <Form.Group as={Col} sm={12}>
                <InputGroup>
                  <Form.Control
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Current Password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.currentPassword &&
                      !!formik.errors.currentPassword
                    }
                  />
                  <InputGroup.Text
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    style={{ cursor: "pointer" }}
                    className="icon"
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
                {formik.touched.currentPassword &&
                  formik.errors.currentPassword && (
                    <small className="text-danger">
                      {formik.errors.currentPassword}
                    </small>
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
            <Row className="mb-3">
              <Form.Group as={Col} sm={12}>
                <Button
                  title={"save"}
                  className="px-5 py-3 mt-3 w-100"
                  type="submit"
                  // disabled={formik.isSubmitting}
                  // disabled={formik.isSubmitting ||  disableSaveBtn}
                  disabled={
                    !(
                      !(
                        formik?.errors?.currentPassword ||
                        formik?.errors?.password ||
                        formik?.errors?.confirmPassword
                      ) && !disableSaveBtn
                    )
                  }
                />
              </Form.Group>
            </Row>
          </Form>

          <Row>
            <Col xs={12}></Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={6}></Col>
          </Row>
          <ToastContainer />
        </Container>
      </Container>
    </Setting>
  );
}

export default ChangePassword;
