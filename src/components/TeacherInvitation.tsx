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
    qualification: Yup.string()
      .required("Teacher Qualification is required")
      .oneOf(["qualified", "unqualified"], "Invalid qualification"),
    classes: Yup.string()
      .test("is-valid-classes", "Invalid classes", (value) => {
        if (!value) {
          return false;
        }
        const classArray = value.split(",").map((c) => c.trim());
        return classArray.every((c) => /^\d+$/.test(c));
      })
      .required("Classes are required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setBtnTitle("Sending Mail");
    // Handle form submission here, e.g., send data to the server
    console.log("Form submitted with values dedit:", values);
    sendTeacherInvitation(
      values.name,
      values.email,
      values?.classes,
      values?.qualification
    ).then((res) => {
      console.log(res);
      if (res?.status === 200) {
        setBtnTitle("Register");
        toast.success(res?.data?.message);
        resetForm();
        onHide();
      } else if (res?.status !== 200) {
        setBtnTitle("Register");
        toast.error(res?.data?.message);
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
          initialValues={{
            name: "",
            email: "",
            qualification: "",
            classes: "",
          }}
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
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="qualification" className="form-label">
                  Qualification
                </label>
                <Field
                  as="select"
                  id="qualification"
                  name="qualification"
                  disabled={btnTitle === "Sending Mail"}
                  className={`form-select ${
                    errors.qualification && touched.qualification
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value="">Select Qualification</option>
                  <option value="qualified">Qualified</option>
                  <option value="unqualified">Unqualified</option>
                </Field>
                <ErrorMessage
                  name="qualification"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="classes" className="form-label">
                  Classes
                </label>
                <Field
                  type="text"
                  id="classes"
                  name="classes"
                  disabled={btnTitle === "Sending Mail"}
                  className={`form-control ${
                    errors.classes && touched.classes ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="classes"
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
