import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
// import PaymentForm from "./PaymentForm"
import UserProfile from "./UserProfile";
import Checkout from "./Checkout";

interface DoctorSideBarProps {
  show: boolean;
  onHide: () => void;
  name: string;
  placement: "start" | "end" | "top" | "bottom";
  img: any;
  userDetails: any;
  appointmentDetails: any;
  downloadForms: any;
}

const DoctorSideBar: React.FC<DoctorSideBarProps> = ({
  placement,
  show,
  onHide,
  img,
  userDetails,
  appointmentDetails,
  downloadForms,
}) => {
  const [secondForm, setSecondForm] = useState(false);

  function handleSecondForm() {
    setSecondForm(true);
  }
  // let obj = {
  //   name: userDetails.name,
  //   treat: userDetails.treat,
  //   details: userDetails.details
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

          <UserProfile
            img={img}
            userDetails={{
              name: userDetails.name,
              treat: userDetails.treat,
              details: userDetails.details
              
            }}
            appointmentDetails={appointmentDetails}
            downloadForms={downloadForms}
          />

          {/* <UserDetailBar 
           userDetails={ userDetails}
           appointmentDetails={  appointmentDetails}
           downloadForms={  downloadForms}
          /> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DoctorSideBar;
