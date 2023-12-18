import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Common/Buttons/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the date picker
import { Link, useActionData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../configs/config";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUserInformation } from "../../store/slices/UserSlice";
import { formatted_Date_In_Date_Type } from "../../global_func";
import { getToken } from "../../utils";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: number;
  address: string;
  state: string;
  zip_code: string;
  city: string;
  country: string;
  level: number;
}

const ProfileOfPatient: React.FC = () => {
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const reduxUserState = useSelector(
    (state: any) => state.currentUserInformation
  );

  let {
    name,
    phone,
    email,
    dob,
    gender,
    address,
    state,
    zip_code,
    city,
    country,
    level,
  } = reduxUserState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: FormValues = {
    name,
    phone,
    email,
    dob: formatted_Date_In_Date_Type(dob),
    gender,
    address,
    state,
    zip_code,
    city,
    country,
    level: 13,
  };
  console.log("initialValues", initialValues.dob);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),
    gender: Yup.number().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      values.gender = Number(values.gender);
      const dobDate = new Date(values.dob);
      let formattedDob = dobDate.toISOString();
      values.dob = formattedDob;
      let { ...dataToSend } = values;
      console.log("dataToSend", dataToSend);
      const updatedData = {
        ...reduxUserState,
        ...dataToSend,
        updated_at: new Date().getTime(),
        updated_by: reduxUserState.id,
      };
      console.log("dataToSend updatedData", updatedData);
      try {
        let { email, phone } = updatedData;
        const isRegisteredResponse = await axios.get(
          `${config.base_url}/user/isAlreadyRegister/${email}/${phone}/13`, {
            headers: {
              'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
            }
          }
        );
        let dbData = isRegisteredResponse?.data?.data;
        console.log("isRegisteredResponse", isRegisteredResponse.data);
        if (
          dbData.id != updatedData.id &&
          (updatedData.phone == dbData.phone ||
            updatedData.email == dbData.email)
        ) {
          toast.error("Email Or Phone is already registered");
          setDisableSaveBtn(false);
        } else {
          const update_patient_profile = await axios.put(
            `${config.base_url}/patient/update_patient_profile`,
            {
              data: updatedData,
            }, {
              headers: {
                'Authorization': `Bearer ${getToken()}` // Add the authorization token here with the "Bearer" prefix
              }
            }
          );
          console.log(
            "update_patient_profile res",
            update_patient_profile.data
          );
          setDisableSaveBtn(true);
          dispatch(setUserInformation(updatedData));
          toast.success("Profile Updated");
          // navigate("/patient-dashboard")
        }
      } catch (error) {
        toast.error("Profile Updation is not successful");
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (
      initialValues.name != formik.values.name ||
      initialValues.phone != formik.values.phone ||
      initialValues.email != formik.values.email ||
      initialValues.dob != formik.values.dob ||
      initialValues.gender != formik.values.gender ||
      initialValues.address != formik.values.address ||
      initialValues.state != formik.values.state ||
      initialValues.zip_code != formik.values.zip_code ||
      initialValues.city != formik.values.city ||
      initialValues.country != formik.values.country
    ) {
      setDisableSaveBtn(false);
    } else {
      setDisableSaveBtn(true);
    }
  }, [formik.values]);

  return (
    <Form onSubmit={formik.handleSubmit} className="reg__form">
      <Row className="mb-3">
        <Form.Group as={Col} lg={6} sm={12}>
          <Form.Control
            type="text"
            placeholder="Patient Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && !!formik.errors.name}
          />
          {formik.touched.name && formik.errors.name && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group as={Col} lg={6} sm={12}>
          <Form.Control
            type="text"
            placeholder="Phone Number"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.phone && !!formik.errors.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} lg={12} sm={12}>
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} lg={6} sm={12}>
          <InputGroup className="customDatePickerWidth">
            <input
              style={{
                width: "100%",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
              type="date"
              value={formik.values.dob} // Make sure to use the correct value from your formik state
              onChange={(event) =>
                formik.setFieldValue("dob", event.target.value)
              }
              onBlur={formik.handleBlur}
              id="dob"
              name="dob"
              className={
                formik.touched.gender && !!formik.errors.gender
                  ? "is-invalid"
                  : ""
              }
            />

            {/* <InputGroup.Text style={{ cursor: "pointer" }} className="icon">
<BsCalendar />
</InputGroup.Text> */}
          </InputGroup>
          {formik.touched.dob && formik.errors.dob && (
            // {formik.errors.dob}
            <Form.Control.Feedback type="invalid">
              {formik.errors.dob}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group as={Col} lg={6} sm={12}>
          <Form.Control
            as="select"
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="gender"
            isInvalid={formik.touched.gender && !!formik.errors.gender}
          >
            <option value={7}>Male</option>
            <option value={8}>Female</option>
          </Form.Control>
          {formik.touched.gender && formik.errors.gender && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.gender}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
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
      </Row>
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
            isInvalid={formik.touched.zip_code && !!formik.errors.zip_code}
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

      <div className="d-flex justify-content-end">
        <Button
          title={"save"}
          className="px-5 py-3 mt-3"
          type="submit"
          // disabled={formik.isSubmitting}
          // disabled={formik.isSubmitting ||  disableSaveBtn}
          disabled={disableSaveBtn}
        />
      </div>
    </Form>
  );
};

export default ProfileOfPatient;
