import React, { useState } from "react"
import Input from "./Common/Input"
import AppointmentSuccessfulModal from "./AppointmentSuccesfulModal"

interface SchoolHistoryProps {
  handleSubmitData: (data: unknown) => void;
  show : boolean;
}

const SchoolHistory: React.FC<SchoolHistoryProps> = ({ handleSubmitData, show }) => {
  const [modalShow, setModalShow] = useState(show);
  const [error, setError] = useState(false);

  // State to store all the input values
  const [formData, setFormData] = useState({
    presentClass: "",
    grade: "",
    teacherName: "",
    repeatedGrade: "",
    specialEducation: "",
    academicProblems: "",
  })

 

  const handleSubmit = () => {
    
    if (
      formData.presentClass &&
      formData.grade &&
      formData.teacherName &&
      formData.specialEducation &&
      formData.academicProblems
    ) {
      handleSubmitData({ schoolHistory: formData });
      setModalShow(true);
    } else {
      setError(true);
      setTimeout(()=>{
         setError(false);
      }, 1800)
    }
  };

  

  return (
    <div className="SchoolHistoryContainer">
      <div className="SchoolHistory_child_container">
        <h4 className="h4_child"> School History</h4>
        <Input
          label="Present Class"
          placeholder="Present Class"
          name="presentClass"
          value={formData.presentClass}
          onChange={(e) =>
            setFormData({ ...formData, presentClass: e.target.value })
          }
        />
        <Input
          label="Grade"
          placeholder="Grade"
          name="grade"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
        />
        <Input
          label="Teacher Name"
          placeholder="Teacher Name"
          name="teacherName"
          value={formData.teacherName}
          onChange={(e) =>
            setFormData({ ...formData, teacherName: e.target.value })
          }
        />
        <h4 className="h4_child">Has child ever repeated any grade?</h4>
        <Input
          label="Repeated Grade"
          placeholder="Repeated Grade"
          name="repeatedGrade"
          value={formData.repeatedGrade}
          onChange={(e) =>
            setFormData({ ...formData, repeatedGrade: e.target.value })
          }
        />
        <h4 className="h4_child">Is child in special education services?</h4>
        <Input
          label="Special Education"
          placeholder="Special Education"
          name="specialEducation"
          value={formData.specialEducation}
          onChange={(e) =>
            setFormData({ ...formData, specialEducation: e.target.value })
          }
        />
        <h4 className="h4_child">
          Please describe academic or other problems your child has had in
          school
        </h4>
        <textarea
          className="textArea"
          placeholder="describe"
          name="academicProblems"
          value={formData.academicProblems}
          onChange={(e) =>
            setFormData({ ...formData, academicProblems : e.target.value })
          }
        />
        {error && <p style={{color : "red"}}>Please fill all the fields</p>}
        <button className="form_submit_btn" onClick={handleSubmit}>
          Confirm Appointment
        </button>
        <AppointmentSuccessfulModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  )
}

export default SchoolHistory
