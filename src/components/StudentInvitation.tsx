import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Offcanvas } from "react-bootstrap";
import Button from "./Common/Buttons/Button";
import { useQuery } from "react-query";
import { inviteStudent } from "./Forms/Institutes/InstituteAPIs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface StudentInvitationProps {
  show: boolean;
  onHide: () => void;
  placement: "start" | "end" | "top" | "bottom";
}

const StudentInvitation: React.FC<StudentInvitationProps> = ({
  placement,
  show,
  onHide,
}) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.string()
      .required("Age is required")
      .matches(/^\d{1,2}$/, "Age must be a one or two-digit number"),
    class: Yup.string()
      .required("Class is required")
      .matches(/^\d{1,2}$/, "Class must be a one or two-digit number"),
  });

  // const [inputData, setInputData] = useState<{
  //   name: string;
  //   class: string;
  //   age: string;
  // }>({
  //   name: "",
  //   class: "",
  //   age: "",
  // });

  const inputValues = useRef<{
    name: string;
    class: string;
    age: string;
  }>({
    name: "",
    class: "",
    age: "",
  });

  const { isLoading, isRefetching, refetch } = useQuery(
    "inviteNewStudent",
    () =>
      inviteStudent(
        inputValues.current.name,
        inputValues.current.age,
        inputValues.current.class
      ),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmit = (
    values: {
      name: string;
      class: string;
      age: string;
    },
    { resetForm }
  ) => {
    // Handle form submission here, e.g., send data to the server
    console.log("Form submitted with values dedit:", values);
    // setInputData(values);
    inputValues.current = values;
    refetch().then((res) => {
      if (res?.data?.data?.status === 200) {
        console.log("dedit result register", res);
        localStorage.setItem("age", values?.age);
        localStorage.setItem("student", JSON.stringify(values));
        toast.success(`${res?.data?.data?.message}. Redirecting to PSC Test`);
        resetForm();
        onHide();
        setTimeout(() => {
          navigate("/psc-test-node");
        }, 3000);
      }
      if (res?.data?.data?.status !== 200) {
        toast.error(res?.data?.data?.message, {
          hideProgressBar: true,
        });
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
          Student Invitation
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Formik
          initialValues={{ name: "", age: "", class: "" }}
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
                  //   className="form-control"
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
                  Age
                </label>
                <Field
                  type="age"
                  id="age"
                  name="age"
                  //   className="form-control"
                  className={`form-control ${
                    /* Check if the field has an error and apply a CSS class accordingly */
                    errors.age && touched.age ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Class
                </label>
                <Field
                  type="class"
                  id="class"
                  name="class"
                  //   className="form-control"
                  className={`form-control ${
                    /* Check if the field has an error and apply a CSS class accordingly */
                    errors.class && touched.class ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="class"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  title="Start PSC Test"
                  className="px-5 py-3"
                  type="submit"
                  disabled={isLoading || isRefetching}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default StudentInvitation;
