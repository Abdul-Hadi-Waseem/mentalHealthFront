import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
// import PaymentForm from "./PaymentForm"
import UserProfile from "./UserProfile";
import Checkout from "./Checkout";
import DoctorProfile from "./DoctorProfile";

interface DoctorSideBarProps {
  show: boolean;
  onHide: () => void;
  name: string;
  placement: "start" | "end" | "top" | "bottom";
  img: any;
  doctorDetails: any;
  appointmentDetails: any;
  downloadForms: any;
  heading: string
}

const PatientSideBarModal: React.FC<DoctorSideBarProps> = ({
  placement,
  show,
  onHide,
  img,
  doctorDetails,
  appointmentDetails,
  downloadForms,
  heading
}) => {
  const [secondForm, setSecondForm] = useState(false);

  function handleSecondForm() {
    setSecondForm(true);
  }
  // let obj = {
  //   name: doctorDetails.name,
  //   treat: doctorDetails.treat,
  //   details: doctorDetails.details
  // }
  // console.log("obj", obj)

  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement={placement}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          {/* {!secondForm ? (
            <UserProfile handleSecondForm={handleSecondForm} />
          ) : (
            <Checkout />
          )} */}
          {/* <div>
            fayyaz
          </div> */}

          <DoctorProfile
            img={img}
            doctorDetails={JSON.parse(localStorage.getItem("current_doctor_details"))}
            appointmentDetails={appointmentDetails}
            downloadForms={downloadForms}
            heading={heading}

          />

          {/* <UserDetailBar 
           doctorDetails={ doctorDetails}
           appointmentDetails={  appointmentDetails}
           downloadForms={  downloadForms}
          /> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PatientSideBarModal;
