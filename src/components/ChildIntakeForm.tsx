import React, { useState } from "react"
import Input from "./Common/Input"
import Select from "./Common/Select"
import Form from "react-bootstrap/Form"

interface FormData {
  childName?: string
  age?: string
  gender?: string | undefined;
  dob?: string
  isNaturalChild?: boolean
  fatherName?: string
  motherName?: string
  phoneNumber?: string
  streetAddress?: string
  state?: string
  zipCode?: string
  country?: string
  isAdopted?: boolean
  atWhatAge?: string
  fosterSince?: string
  stepFatherName?: string
  stepMotherName?: string
  stepPhoneNumber?: string
  stepStreetAddress?: string
  stepCity?: string
  stepState?: string
  stepZipCode?: string
  stepCountry?: string
}
const ChildIntakeForm = ({handleChildData} : any) => {
  const options = [
    { value: "7", label: "Male" },
    { value: "8", label: "Female" },
  ]

  const [error, setError] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    childName: "",
    age: "",
    gender: options[0].value,
    dob: "",
    isNaturalChild: true,
    fatherName: "",
    motherName: "",
    phoneNumber: "",
    streetAddress: "",
    state: "",
    zipCode: "",
    country: "",
    isAdopted: false,
    atWhatAge: "",
    fosterSince: "",
    stepFatherName: "",
    stepMotherName: "",
    stepPhoneNumber: "",
    stepStreetAddress: "",
    stepCity: "",
    stepState: "",
    stepZipCode: "",
    stepCountry: "",
  })
const transformData = (formData : any) => {
  return {
    child: {
      name: formData.childName,
      sex: formData.gender,
      age: formData.age,
      DOB: formData.dob,
    },
    natural_child: formData.isNaturalChild ? "Yes" : "No",
    adopted_age: formData.atWhatAge,
    foster_since: formData.fosterSince,
    parents: {
      father_name: formData.fatherName,
      mother_name: formData.motherName,
      state: formData.state,
      zip_code: formData.zipCode,
      contact_numbers: formData.phoneNumber,
      country: formData.country,
      address: formData.streetAddress,
    },
    step_parents: {
      father_name: formData.stepFatherName,
      mother_name: formData.stepMotherName,
      state: formData.stepState,
      zip_code: formData.stepZipCode,
      contact_numbers: formData.stepPhoneNumber,
      country: formData.stepCountry,
      address: formData.stepStreetAddress,
    },
  }
}
  const [formErrors, setFormErrors] = useState({})
const handleSubmit = () => {
  console.log(formData);
  const errors:FormData = {};

  // Validate Child's Name
  if (formData.childName.trim() === "") {
    errors.childName = "Child's Name is required"
  }

  // Validate Age
  if (formData.age.trim() === "") {
    errors.age = "Age is required"
  }

  // Validate Gender
  if (!formData.gender) {
    errors.gender = "Gender is required"
  }

  // Validate Date of Birth
  if (formData.dob.trim() === "") {
    errors.dob = "Date of Birth is required"
  }

  // Validate Father's Name
  if (
    formData.fatherName.trim() === "" ||
    formData.stepFatherName.trim() === ""
  ) {
    errors.fatherName = "Father's Name is required"
  }

  // Validate Mother's Name
  if (
    formData.motherName.trim() === "" ||
    formData.stepMotherName.trim() === ""
  ) {
    errors.motherName = "Mother's Name is required"
  }

  // Validate Phone Number
  if (formData.phoneNumber.trim() === "" || formData.stepPhoneNumber.trim() === "") {
    errors.phoneNumber = "Phone Number is required"
  }

  // Validate Street Address
  if (
    formData.streetAddress.trim() === "" ||
    formData.stepStreetAddress.trim() === ""
  ) {
    errors.streetAddress = "Street Address is required"
  }

  // Validate State
  if (formData.state.trim() === "" || formData.stepState.trim() === "") {
    errors.state = "State is required"
  }

  // Validate Zip Code
  if (formData.zipCode.trim() === "" || formData.stepZipCode.trim() === "") {
    errors.zipCode = "Zip Code is required"
  }

  // Validate Country
  if (formData.country.trim() === "" || formData.stepCountry.trim() === "") {
    errors.country = "Country is required"
  }


  // Set the errors state to display them
  setFormErrors(errors)

  // If there are errors, prevent form submission
  if (Object.keys(errors).length > 0) {
    setError(true)
   setTimeout(()=>{
    setError(false)
   }, 1800)
  return
  }
  const transformedData = transformData(formData)
  handleChildData(transformedData);
  
}

  return (
    <div style={{ width: "660px" }}>
      <h4 className="h4_child">Child Information</h4>
      <Input
        label="Child's Name"
        placeholder="Child's Name"
        value={formData.childName}
        onChange={(e) =>
          setFormData({ ...formData, childName: e.target.value })
        }
        // errorMessage={formErrors.childName}
      />
      <div className="d-flex justify-content-between fl-dr">
        <div className="sm_form_w">
          <Input
            label="Age"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            // errorMessage={formErrors.age}
          />
        </div>
        <div className="sm_form_w">
          <Select
            options={options}
            label="Gender"
            value={formData.gender}
            onChange={(selectedOption) =>
              setFormData({ ...formData, gender: selectedOption?.value })
            }
          />
        </div>
      </div>
      <Input
        label="Date of Birth"
        placeholder="Date of Birth"
        className={"calendar_input"}
        type="date"
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
      />
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="h4_child">Natural Child</h4>
        <div>
          <Form.Check
            inline
            label="Yes"
            name="group1"
            type={"radio"}
            id={`inline-radio-1`}
            checked={formData.isNaturalChild}
            onChange={() => setFormData({ ...formData, isNaturalChild: true })}
          />
          <Form.Check
            inline
            label="No"
            name="group1"
            type={"radio"}
            id={`inline-radio-2`}
            checked={!formData.isNaturalChild}
            onChange={() => setFormData({ ...formData, isNaturalChild: false })}
          />
        </div>
      </div>
      <hr className="form_separator" />
      <h4 className="h4_child">Parents Information</h4>
      <Input
        label="Name of Father"
        placeholder="Name of Father"
        value={formData.fatherName}
        onChange={(e) =>
          setFormData({ ...formData, fatherName: e.target.value })
        }
      />
      <Input
        label="Name of Mother"
        placeholder="Name of Mother"
        value={formData.motherName}
        onChange={(e) =>
          setFormData({ ...formData, motherName: e.target.value })
        }
      />
      <Input
        label="Phone Number"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
      />
      <Input
        label="Street Address"
        placeholder="Street Address"
        value={formData.streetAddress}
        onChange={(e) =>
          setFormData({ ...formData, streetAddress: e.target.value })
        }
      />
      <div className="d-flex justify-content-between fl-dr">
        <div className="sm_form_w">
          <Input
            label="State"
            placeholder="State"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
        </div>
        <div className="sm_form_w">
          <Input
            label="Zip Code"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
          />
        </div>
      </div>
      <Input
        label="Country"
        placeholder="Country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      />
      <hr className="form_separator" />
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="h4_child">If Adopted</h4>
        <Form.Check
          inline
          checked={formData.isAdopted}
          onChange={(e) =>
            setFormData({ ...formData, isAdopted: e.target.checked })
          }
          name="group1"
          type={"checkbox"}
          id={`inline-checkbox-1`}
        />
      </div>
      <Input
        label="At what Age"
        placeholder="At what Age"
        disabled={!formData.isAdopted}
        value={formData.atWhatAge}
        onChange={(e) =>
          setFormData({ ...formData, atWhatAge: e.target.value })
        }
      />
      <Input
        label="Foster since"
        placeholder="Foster since"
        disabled={!formData.isAdopted}
        value={formData.fosterSince}
        onChange={(e) =>
          setFormData({ ...formData, fosterSince: e.target.value })
        }
      />
      <hr className="form_separator" />
      <h4 className="h4_child">Step Parents Information</h4>
      <Input
        label="Name of Father"
        placeholder="Name of Father"
        value={formData.stepFatherName}
        onChange={(e) =>
          setFormData({ ...formData, stepFatherName: e.target.value })
        }
      />
      <Input
        label="Name of Mother"
        placeholder="Name of Mother"
        value={formData.stepMotherName}
        onChange={(e) =>
          setFormData({ ...formData, stepMotherName: e.target.value })
        }
      />
      <Input
        label="Phone Number"
        placeholder="Phone Number"
        value={formData.stepPhoneNumber}
        onChange={(e) =>
          setFormData({ ...formData, stepPhoneNumber: e.target.value })
        }
      />
      <Input
        label="Street Address"
        placeholder="Street Address"
        value={formData.stepStreetAddress}
        onChange={(e) =>
          setFormData({ ...formData, stepStreetAddress: e.target.value })
        }
      />
      <Input
        label="City"
        placeholder="City"
        value={formData.stepCity}
        onChange={(e) => setFormData({ ...formData, stepCity: e.target.value })}
      />
      <div className="d-flex justify-content-between fl-dr">
        <div className="sm_form_w">
          <Input
            label="State"
            placeholder="State"
            value={formData.stepState}
            onChange={(e) =>
              setFormData({ ...formData, stepState: e.target.value })
            }
          />
        </div>
        <div className="sm_form_w">
          <Input
            label="Zip Code"
            placeholder="Zip Code"
            value={formData.stepZipCode}
            onChange={(e) =>
              setFormData({ ...formData, stepZipCode: e.target.value })
            }
          />
        </div>
      </div>
      <Input
        label="Country"
        placeholder="Country"
        value={formData.stepCountry}
        onChange={(e) =>
          setFormData({ ...formData, stepCountry: e.target.value })
        }
      />
      {error && (
        <p style={{ color: "red" }}> please fill the all mandatory fields</p>
      )}
      <button className="form_submit_btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
};

export default ChildIntakeForm;
