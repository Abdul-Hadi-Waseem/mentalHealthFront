import React, { useState, useEffect } from "react";
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
  const currentdate = new Date();
  const currenttime = new Date();
  const appointmentdate = new Date(appointmentDetails.date);
  const appointmentdatePlusanHour = new Date(appointmentDetails.date);
  currentdate.setHours(0, 0, 0, 0);
  appointmentdate.setHours(0, 0, 0, 0);
  appointmentdatePlusanHour.setHours(appointmentdatePlusanHour.getHours() + 1);

  const [appointmentbtnTitle, setAppointmentbtnTitle] = useState("");
  const [appointmentbtnDisabled, setAppointmentbtnDisabled] = useState(true);
  useEffect(() => {
    if (currentdate.getTime() === appointmentdate.getTime()) {
      if (currenttime > appointmentdatePlusanHour) {
        setAppointmentbtnTitle("Expired");
      } else if (currenttime < new Date(appointmentDetails.date)) {
        setAppointmentbtnTitle("SCHEDULED TODAY");
      } else if (currenttime >= new Date(appointmentDetails.date)) {
        setAppointmentbtnTitle("JOIN APPOINTMENT");
        setAppointmentbtnDisabled(false);
      }
    } else if (currentdate < appointmentdate) {
      setAppointmentbtnTitle("SCHEDULED APPOINTMENT");
    } else if (currentdate > appointmentdate) {
      setAppointmentbtnTitle("Expired");
    }
    // FOR TESTING
    setAppointmentbtnDisabled(false);
  }, [currentdate, currenttime, appointmentdate, appointmentDetails]);
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
      const patientId =
        JSON.parse(localStorage.getItem("current_doctor_details")).patient_id ||
        "123456";
      const role = "patient";
      let response = await axios.get(
        `${config.base_url}/patient/get_meeting_token/${patientId}/${channelName}`
      );
      localStorage.setItem(
        "creds",
        channelName + "@" + role + "@" + response.data.data + "@" + patientId
      );
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
            <Button
              variant="success"
              title={appointmentbtnTitle}
              className="w-100 py-2"
              type="submit"
              onClick={handleAgoraMeeting}
              disabled={appointmentbtnDisabled}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PatientSideBarModal;
