import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Common/Buttons/Button";
import { useContactUsMutation } from "../../gql/generated"; 

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Define Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  message: Yup.string().optional(),
});

const ContactForm = ({success}: any) => {
  // Formik hook
  const [result, executeMutation] = useContactUsMutation();
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      executeMutation({"Data" : values}).then(()=>{
      //  console.log(result.data?.contactUs);
        success(result.data?.contactUs)
        formik.resetForm();
      })
      
    },
  });

  return (
    <div className="contact__form d-flex flex-column justify-content-center">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div>{formik.errors.phone}</div>
          ) : null}
        </div>

        <div>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            rows={6}
          />
          {formik.touched.message && formik.errors.message ? (
            <div>{formik.errors.message}</div>
          ) : null}
        </div>

        <Button title="Submit" className="contact__button" />
      </form>
    </div>
  );
};

export default ContactForm;
