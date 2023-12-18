import { useState } from "react"
import SympstomCheck from "../../components/SympstomCheck"
import SiblingsInformation from "../../components/SiblingsInformation"
import SchoolHistory from "../../components/SchoolHistory"
import ChildIntakeForm from "../../components/ChildIntakeForm"
import { useProgramdataMutation } from "../../gql/generated"
import "./childIntake.css"
const ChildIntakeSteper = () => {
const [activeStep, setActiveStep] = useState(1)
 const [formData, setFormData] = useState({})
 const [show, setShow] = useState(false);
const [result, executeMutation] = useProgramdataMutation();
const handleNextStep = () => {
  setActiveStep((prevStep) => prevStep + 1)
}

const handleChildData = (data: any) => {
  setFormData((prevFormData) => ({ ...prevFormData, ...data }))
  handleNextStep()
}

const handleSymptomsData = (data : any) => {
   setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  handleNextStep()
}

const handleSiblingsData = (data : any) => {
   setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  handleNextStep()
}

const handleSubmitData = (data: any) => {
  setFormData((prevFormData) => ({ ...prevFormData, ...data }))
  executeMutation({
    Data: {
      formId: 24,
      metadata: formData,
    },
  }).then(()=>{
    setShow(true);
  })
}

  return (
    <>
      <div className="d-flex justify-content-center mb-5">
        {activeStep === 1 && (
          <div className="d-flex justify-content-center mt-5">
            <div className="d-flex justify-content-center child_intake_container">
              <ChildIntakeForm handleChildData={handleChildData} />
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <SympstomCheck handleSymptomsData={handleSymptomsData} />
        )}
        {activeStep === 3 && (
          <SiblingsInformation handleSiblingsData={handleSiblingsData} />
        )}
        {activeStep === 4 && (
          <SchoolHistory handleSubmitData={handleSubmitData} show={show}/>
        )}
      </div>
      <div className="copyright text-center" style={{ borderTop: "0px" }}>
        © 2023 Mental Support. All rights reserved
      </div>
    </>
  )
}

export default ChildIntakeSteper
