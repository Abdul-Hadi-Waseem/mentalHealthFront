import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import * as Yup from "yup";
import Button from "../Common/Buttons/Button";

import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../configs/config";

import { useDispatch, useSelector } from "react-redux";
import { setUserInformation, setPscOrScreen } from "../../store/slices/UserSlice";
interface FormValues {
  email: string;
}

const ForgotPassword = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState("");

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
  });
  
  const formik = useFormik<FormValues>({
    initialValues: {
      email: ""
    },
    validationSchema,
    onSubmit:async (values: FormValues) => {
      try {
        setEmail(values.email);
        console.log("emaile", values.email)
        const result = await axios.post(`${config.base_url}/user/forgot_password`, {
          email: values?.email,
        });
        console.log("result forgot 123", result);
if(result?.data?.status == 200){
        toast.success("Email Successfully Send");
        console.log("result forgot exist");
}else{
toast.error("Email does not exist");
        console.log("result forgot not exist");

}
      } catch (error) {
        toast.error(error.message)
        console.log("error on forgot password", error)
      }
    },
  });
console.log("fomik values", formik.values)
  return (
    <Container className="login__section">
      <Row className="mb-3 ">
        <Col sm={12} className="">
          <h1 className="">
          Reset your password
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
        <Row className=" my-5">
          <Col xs={12} className="text-center">
            <Button title="Submit" className="w-100" type="submit" />
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default ForgotPassword;