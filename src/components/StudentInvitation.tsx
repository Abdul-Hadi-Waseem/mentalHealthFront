import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Offcanvas } from "react-bootstrap";
import Button from "./Common/Buttons/Button";
import { useQuery } from "react-query";
import { inviteStudent } from "./Forms/Institutes/InstituteAPIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configs/config";
import { getToken } from "../utils";
interface StudentInvitationProps {
  show: boolean;
  onHide: () => void;
  placement: "start" | "end" | "top" | "bottom";
  refetchStudents: any;
}

const StudentInvitation: React.FC<StudentInvitationProps> = ({
  placement,
  show,
  onHide,
  refetchStudents,
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
    dob: Yup.date().nullable().required("Date of birth is required"),
    section: Yup.string()
      .required("Section is required")
      .matches(/^[A-Za-z]$/, "Section must be a single alphabet"),
    guardian_name: Yup.string().required("Guardian name is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const inputValues = useRef<{
    name: string;
    class: string;
    age: string;
    dob: Date | "";
    section: string;
    guardian_name: string;
    phone: string;
  }>({
    name: "",
    age: "",
    class: "",
    dob: "",
    section: "",
    guardian_name: "",
    phone: "",
  });

  const { isLoading, isRefetching, refetch } = useQuery(
    "inviteNewStudent",
    () =>
      inviteStudent(
        inputValues.current.name,
        inputValues.current.age,
        inputValues.current.class,
        inputValues.current.dob,
        inputValues.current.section,
        inputValues.current.guardian_name,
        inputValues.current.phone
      ),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmit = async (
    values: {
      name: string;
      class: string;
      age: string;
      dob: Date | "";
      section: string;
      guardian_name: string;
      phone: string;
    },
    { resetForm }
  ) => {
    console.log("Form submitted with values dedit:", values);
    inputValues.current = values;
    const res = await axios.post(
      `${config.base_url}/teacher/student/add`,
      {
        ...values
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // replace with your actual token key
        },
      }
    );

    if (res.data.status === 200) {
      console.log("Result from server:", res.data);
      localStorage.setItem("age", values?.age);
      localStorage.setItem("student", JSON.stringify(values));
      toast.success(`${res.data.message}`);
      resetForm();
      onHide();
      refetchStudents();
    } else {
      toast.error(res.data.message, {
        hideProgressBar: true,
      });
    }
    // refetch().then((res) => {
    //   if (res?.data?.data?.status === 200) {
    //     console.log("dedit result register", res);
    //     localStorage.setItem("age", values?.age);
    //     localStorage.setItem("student", JSON.stringify(values));
    //     toast.success(`${res?.data?.data?.message}`);
    //     resetForm();
    //     onHide();
    //     refetchStudents();
    //   }
    //   if (res?.data?.data?.status !== 200) {
    //     toast.error(res?.data?.data?.message, {
    //       hideProgressBar: true,
    //     });
    //   }
    // });
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
          initialValues={{
            name: "",
            age: "",
            class: "",
            dob: "",
            section: "",
            guardian_name: "",
            phone: "",
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
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <Field
                  type="age"
                  id="age"
                  name="age"
                  className={`form-control ${
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
                <label htmlFor="class" className="form-label">
                  Class
                </label>
                <Field
                  type="class"
                  id="class"
                  name="class"
                  className={`form-control ${
                    errors.class && touched.class ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="class"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <Field
                  type="date"
                  id="dob"
                  name="dob"
                  className={`form-control ${
                    errors.dob && touched.dob ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="section" className="form-label">
                  Section
                </label>
                <Field
                  type="text"
                  id="section"
                  name="section"
                  className={`form-control ${
                    errors.section && touched.section ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="section"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="guardian_name" className="form-label">
                  Guardian Name
                </label>
                <Field
                  type="text"
                  id="guardian_name"
                  name="guardian_name"
                  className={`form-control ${
                    errors.guardian_name && touched.guardian_name
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="guardian_name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-control ${
                    errors.phone && touched.phone ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  title="Register Student"
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
