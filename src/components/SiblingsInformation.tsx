import React, { useState } from "react"
import Input from "./Common/Input"
import Select from "./Common/Select"
import add_icon from "../assets/icons/add.svg"

// Interface for the sibling data object
interface SiblingData {
  firstName: string
  lastName: string
  age: string
  gender: { value: string; label: string } | null
  relationship: { value: string; label: string } | null
}

interface SiblingsInformationProps {
  handleSiblingsData: (data: { siblings: SiblingData[] }) => void
}

const SiblingsInformation: React.FC<SiblingsInformationProps> = ({
  handleSiblingsData,
}) => {
  const genderOptions = [
    { value: "7", label: "Male" },
    { value: "8", label: "Female" },
  ]
  const relationOptions = [
    { value: "3", label: "Father" },
    { value: "4", label: "Mother" },
    { value: "5", label: "Brother" },
    { value: "6", label: "Sister" },
  ]

  const [siblingsData, setSiblingsData] = useState<SiblingData[]>([
    {
      firstName: "",
      lastName: "",
      age: "",
      gender: null,
      relationship: null,
    },
  ])

  const handleAddSibling = () => {
    const newSibling: SiblingData = {
      firstName: "",
      lastName: "",
      age: "",
      gender: null,
      relationship: null,
    }

    setSiblingsData((prevSiblingsData) => [...prevSiblingsData, newSibling])
  }

  const handleChangeSibling = (index: number, field: string, value: any) => {
    setSiblingsData((prevSiblingsData) => {
      const updatedSiblings = [...prevSiblingsData]
      updatedSiblings[index][field] = value
      return updatedSiblings
    })
  }

  const handleSubmit = () => {
    // console.log(siblingsData);
    handleSiblingsData({ siblings: siblingsData })
  }

  return (
    <div className="SiblingsInformationContainer">
      <div className="Siblings_child_container">
        <h4 className="h4_child">Siblings Information</h4>
        {siblingsData.map((sibling, index) => (
          <div key={index}>
            <Input
              label="First Name"
              placeholder="First Name"
              value={sibling.firstName}
              onChange={(e) =>
                handleChangeSibling(index, "firstName", e.target.value)
              }
            />
            <Input
              label="Last Name"
              placeholder="Last Name"
              value={sibling.lastName}
              onChange={(e) =>
                handleChangeSibling(index, "lastName", e.target.value)
              }
            />
            <div className="d-flex justify-content-between fl-dr">
              <div className="sm_form_w">
                <Input
                  label="Age"
                  placeholder="Age"
                  value={sibling.age}
                  onChange={(e) =>
                    handleChangeSibling(index, "age", e.target.value)
                  }
                />
              </div>
              <div className="sm_form_w">
                <Select
                  options={genderOptions}
                  label="Gender"
                  value={sibling.gender?.value}
                  onChange={(selectedOption) =>
                    handleChangeSibling(index, "gender", selectedOption?.value)
                  }
                />
              </div>
            </div>
            <Select
              options={relationOptions}
              label="Relationship to child"
              value={sibling.relationship?.value}
              onChange={(selectedOption) =>
                handleChangeSibling(index, "relationship", selectedOption)
              }
            />
          </div>
        ))}
        <button className="add_siblings" onClick={handleAddSibling}>
          <div>
            <img src={add_icon} alt="add" style={{ marginRight: "4px" }} />
            <span>Add Siblings</span>
          </div>
        </button>
        <button className="form_submit_btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default SiblingsInformation
