import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
// import PaymentForm from "./PaymentForm"
import UserProfile from "./UserProfile";
import Button from "./Common/Buttons/Button";
import DoctorProfile from "./DoctorProfile";
import { Link, useNavigate } from "react-router-dom";

interface DoctorSideBarProps {
  show: boolean;
  onHide: () => void;
  name: string;
  placement: "start" | "end" | "top" | "bottom";
  img: any;
  doctorDetails: any;
  appointmentDetails: any;
  downloadForms: any;
  heading: string;
}

const PatientSideBarModal: React.FC<DoctorSideBarProps> = ({
  placement,
  show,
  onHide,
  img,
  doctorDetails,
  appointmentDetails,
  downloadForms,
  heading,
}) => {
  const [secondForm, setSecondForm] = useState(false);
  const [inMeeting, setInMeeting] = useState(false);
  const navigate = useNavigate();
  function handleSecondForm() {
    setSecondForm(true);
  }
  const agoraAppId = "a077f8ac258242d6b0fc381501d5468e";
  const agoraAppCertificate = "0fa509c3b274453a9c0029681a0187cb";

  // function generateToken(channelName, uid, role) {
  //   // Set the token expiration time in seconds
  //   const expirationTimeInSeconds = 3600;

  //   // Create an Agora access token
  //   const token = agora.RtcTokenBuilder.buildTokenWithUid(
  //     agoraAppId,
  //     agoraAppCertificate,
  //     channelName,
  //     uid,
  //     expirationTimeInSeconds
  //   );

  //   return token;
  // }

  const handleAgoraMeeting = () => {
    if (
      doctorDetails &&
      doctorDetails.details &&
      doctorDetails.details.schedule &&
      doctorDetails.details.schedule[0]
    ) {
      // const channelName = doctorDetails.details.schedule[0]?.channel_name;
      const channelName = "test";
      const meetingId = doctorDetails.details.schedule[0]?.meeting_id;
      const role = "patient";
      localStorage.setItem("creds",channelName+'@'+role+'@'+meetingId);
      navigate("/patient-video-call");
    }
  };
  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement={placement}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <DoctorProfile
            img={img}
            doctorDetails={JSON.parse(
              localStorage.getItem("current_doctor_details")
            )}
            appointmentDetails={appointmentDetails}
            downloadForms={downloadForms}
            heading={heading}
          />
          <div className="flex-center">
            {!inMeeting ? (
              <Button
                variant="success"
                title="JOIN APPOINTMENT"
                className="px-5 py-3"
                type="submit"
                onClick={handleAgoraMeeting}
              />
            ) : (
              <div>
              </div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PatientSideBarModal;
