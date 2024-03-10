import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../Common/Buttons/Button";

// Define Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  comments: Yup.string().required("Comments are required"),
});

const CommentForm: React.FC = () => {
  // Formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      website: "",
      comments: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Add your submit logic here
    },
  });

  return (
    <div className="py-4">
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col sm={12}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }
              />
              {formik.touched.name && formik.errors.name && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="website">
              <Form.Control
                type="text"
                name="website"
                placeholder="Website"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.website}
                className={
                  formik.touched.website && formik.errors.website
                    ? "is-invalid"
                    : ""
                }
              />
              {formik.touched.website && formik.errors.website && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.website}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="comments">
          <Form.Control
            as="textarea"
            name="comments"
            placeholder="Comments"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comments}
            rows={6}
            className={
              formik.touched.comments && formik.errors.comments
                ? "is-invalid"
                : ""
            }
          />
          {formik.touched.comments && formik.errors.comments && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.comments}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="text-end pt-3">
          <Button title="Post Comment" />
        </div>
      </Form>
    </div>
  );
};

export default CommentForm;
