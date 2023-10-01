import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import Button from "./Common/Buttons/Button";
import { sendTeacherInvitation } from "./Forms/Institutes/InstituteAPIs";
import { toast } from "react-toastify";

interface TeacherInvitationProps {
  show: boolean;
  onHide: () => void;
  placement: "start" | "end" | "top" | "bottom";
}

const TeacherInvitation: React.FC<TeacherInvitationProps> = ({
  placement,
  show,
  onHide,
}) => {
  const [btnTitle, setBtnTitle] = useState<"Register" | "Sending Mail">(
    "Register"
  );
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setBtnTitle("Sending Mail");
    // Handle form submission here, e.g., send data to the server
    console.log("Form submitted with values dedit:", values);
    sendTeacherInvitation(values.name, values.email).then((res) => {
      console.log(res);
      if (res?.status === 200) {
        setBtnTitle("Register");
        toast.success(res?.data?.message);
        resetForm();
        onHide();
      } else if (res?.status !== 200) {
        setBtnTitle("Register");
        toast.error(res?.data?.message);
        resetForm();
        onHide();
      }
    });
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement={placement}
      style={{
        width: "280px",
        maxWidth: "83%",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title
          style={{ textAlign: "left", width: "100%", marginTop: "3rem" }}
        >
          Teacher Invitation
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Formik
          initialValues={{ name: "", email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  disabled={btnTitle === "Sending Mail"}
                  className={`form-control ${
                    /* Check if the field has an error and apply a CSS class accordingly */
                    errors.name && touched.name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  disabled={btnTitle === "Sending Mail"}
                  className={`form-control ${
                    /* Check if the field has an error and apply a CSS class accordingly */
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div>
                <Button
                  variant="primary"
                  title={btnTitle}
                  className="px-5 py-3"
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TeacherInvitation;
