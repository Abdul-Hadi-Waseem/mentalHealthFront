import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import UserProfile from "./UserProfile";

interface DoctorSideBarProps {
  show: boolean;
  onHide: () => void;
  pdfData : any,
  name: string;
  placement: "start" | "end" | "top" | "bottom";
  img: any;
  userDetails: any;
  appointmentDetails: any;
  downloadForms: any;
  heading: string
}

const DoctorSideBar: React.FC<DoctorSideBarProps> = ({
  placement,
  show,
  onHide,
  pdfData,
  img,
  userDetails,
  appointmentDetails,
  downloadForms,
  heading
}) => {
  const [secondForm, setSecondForm] = useState(false);

  function handleSecondForm() {
    setSecondForm(true);
  }
console.log(appointmentDetails)
  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement={placement}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>

          <UserProfile
            img={img}
            userDetails={{
              name: userDetails.name,
              treat: userDetails.treat,
              details: userDetails.details              
            }}
            doctorDetails={JSON.parse(
              localStorage.getItem("current_doctor_details")
            )}
            pdfData = {pdfData}
            heading={heading}
            appointmentDetails={appointmentDetails}
            downloadForms={downloadForms}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DoctorSideBar;
