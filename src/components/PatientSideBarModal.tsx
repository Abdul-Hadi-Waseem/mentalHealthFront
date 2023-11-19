import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
// import PaymentForm from "./PaymentForm"
import UserProfile from "./UserProfile";
import Button from "./Common/Buttons/Button";
import DoctorProfile from "./DoctorProfile";
import { Link, useNavigate } from "react-router-dom";
import config from "../configs/config";
import axios from "axios";

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
  const navigate = useNavigate();
  function handleSecondForm() {
    setSecondForm(true);
  }

  const handleAgoraMeeting = async () => {
    if (
      doctorDetails &&
      doctorDetails.details &&
      doctorDetails.details.schedule &&
      doctorDetails.details.schedule[0]
    ) {
      const channelName =
        JSON.parse(localStorage.getItem("current_doctor_details"))
          .channel_name || "Appointment";
      const patientId = JSON.parse(localStorage.getItem("current_doctor_details")).patient_id || "123456";
      const role = "patient";
      let response = await axios.get(
        `${config.base_url}/patient/get_meeting_token/${patientId}/${channelName}`
      );
      localStorage.setItem("creds", channelName + "@" + role + "@" + response.data.data + "@" + patientId);
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
          {appointmentDetails.date &&
          new Date(appointmentDetails.date) > new Date() ? (
            <div className="flex-center">
              <Button
                variant="success"
                title="JOIN APPOINTMENT"
                className="w-100 py-2"
                type="submit"
                onClick={handleAgoraMeeting}
              />
            </div>
          ) : new Date(appointmentDetails.date) > new Date() ? (
            <div className="flex-center">
              <Button
                variant="success"
                title="SCHEDULED APPOINTMENT"
                className="w-100 py-2"
                type="submit"
                disabled={true}
              />
            </div>
          ) : (
            <div className="flex-center">
              <p>Expired</p>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PatientSideBarModal;
