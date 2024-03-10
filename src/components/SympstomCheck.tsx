import React, { useState } from "react"
import Form from "react-bootstrap/Form"

interface SymptomCheckProps {
  handleSymptomsData: (data: any) => void
}

const SympstomCheck: React.FC<SymptomCheckProps> = ({ handleSymptomsData }) => {
  const [error, setError] = useState(false);
   const [selectedSymptoms, setSelectedSymptoms] = useState<{
     [symptom: string]: boolean
   }>({})

  const handleSymptomSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target
    setSelectedSymptoms((prevSelectedSymptoms) => ({
      ...prevSelectedSymptoms,
      [value]: checked,
    }))
  } 

 const handleSubmit = () => {
      const selectedCount =
        Object.values(selectedSymptoms).filter(Boolean).length;
  if (selectedCount >= 2) {
    const formattedSymptoms = {
      sleep_problems: selectedSymptoms["Sleep Problems"] || false,
      morbid_thoughts: selectedSymptoms["Morbid thoughts"] || false,
      lack_of_interest_in_activities:
        selectedSymptoms["Lack of interest in activities"] || false,
      suicidal_thoughts_or_threats:
        selectedSymptoms["Suicidal thoughts or threats"] || false,
      unassertive: selectedSymptoms["Unassertive"] || false,
      suicidal_plans_or_attempts:
        selectedSymptoms["Suicidal plans / attempts"] || false,
      fatigue_or_low_energy: selectedSymptoms["Fatigue/low energy"] || false,
      mood_swings: selectedSymptoms["Mood swings"] || false,
      concentration_problems:
        selectedSymptoms["Concentration problems"] || false,
      depression: selectedSymptoms["Depression"] || false,
      appetite_or_weight_changes:
        selectedSymptoms["Appetite/weight changes"] || false,
      changed_level_of_activity:
        selectedSymptoms["Changed level of activity"] || false,
      withdrawal: selectedSymptoms["Withdrawal"] || false,
      cries_easily: selectedSymptoms["Cries easily"] || false,
    }
    handleSymptomsData({ "symptoms" : formattedSymptoms });
  } else{
    setError(true);
    setTimeout(()=>{
      setError(false);
    }, 1800)
  }
 
};

  return (
    <div className="symptomContainer">
      <div className="symptom_child_container">
        <h4 className="h4_child mb-2">
          Check any symptom that is a concern. How long has it been a problem?
        </h4>
        <hr className="form_separator" />
        <div className="d-flex justify-content-between fl-dr">
          <div className="checkboxContainer">
            <Form.Check
              inline
              label="Sleep Problems"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Sleep Problems"
              checked={selectedSymptoms["Sleep Problems"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Lack of interest in activities"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Lack of interest in activities"
              checked={selectedSymptoms[
                "Lack of interest in activities"
              ]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Unassertive"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Unassertive"
              checked={selectedSymptoms["Unassertive"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Fatigue/low energy"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Fatigue/low energy"
              checked={selectedSymptoms["Fatigue/low energy"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Concentration problems"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Concentration problems"
              checked={selectedSymptoms["Concentration problems"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Appetite/weight changes"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Appetite/weight changes"
              checked={selectedSymptoms["Appetite/weight changes"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Withdrawal"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Withdrawal"
              checked={selectedSymptoms["Withdrawal"]}
              onChange={handleSymptomSelection}
            />
          </div>
          <div className="checkboxContainer">
            <Form.Check
              inline
              label="Morbid thoughts"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Morbid thoughts"
              checked={selectedSymptoms["Morbid thoughts"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Suicidal thoughts or threats"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Suicidal thoughts or threats"
              checked={selectedSymptoms[
                "Suicidal thoughts or threats"
              ]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Suicidal plans / attempts"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Suicidal plans / attempts"
              checked={selectedSymptoms["Suicidal plans / attempts"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Mood swings"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Mood swings"
              checked={selectedSymptoms["Mood swings"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Depression"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Depression"
              checked={selectedSymptoms["Depression"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Changed level of activity"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Changed level of activity"
              checked={selectedSymptoms["Changed level of activity"]}
              onChange={handleSymptomSelection}
            />
            <Form.Check
              inline
              label="Cries easily"
              name="group1"
              type={"checkbox"}
              id={`inline-checkbox-1`}
              value="Cries easily"
              checked={selectedSymptoms["Cries easily"]}
              onChange={handleSymptomSelection}
            />
          </div>
        </div>
        {error && <p style={{ color : "red"}}>Please select at least two symptoms</p>}
        <button className="form_submit_btn mt-4" onClick={handleSubmit}>
          {" "}
          Next{" "}
        </button>
      </div>
    </div>
  )
}

export default SympstomCheck
