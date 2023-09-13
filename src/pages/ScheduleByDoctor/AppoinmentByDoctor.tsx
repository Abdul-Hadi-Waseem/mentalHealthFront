import React, { useState } from "react";
import { CalendarComponent } from "./Calendar";
import { MediaTypeSelection } from "./MediaTypeSelection";
import { TimeSelection } from "./TimeSelection";
import { Confirmation } from "./Confirmation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scheduleAppointment.css";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/Common/Buttons/Button";
import BackButton from "../../components/Common/Buttons/BackButton";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Header from "../PatientDashboard/Header/Header";
import axios from "axios";
import config from "../../configs/config";
import { toast, ToastContainer } from "react-toastify";

const AppoinmentByDoctor = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  console.log("selectedDate >>", selectedDate);
  console.log("selectedMedia >>", selectedMedia);
  console.log("selectedTime >>", selectedTime);
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  // let start_time = moment(selectedTime).format()

  // const date = moment(selectedTime);
  // const updatedDate = date.add(1, 'hour');
  // console.log("selectedDate ", selectedDate)
  // console.log("selectedTime ", selectedTime)
  // console.log("updatedDate ", updatedDate)

  const selectTime = selectedTime;
  const selectDate = selectedDate;

  // Parse the selectTime using Moment.js
  const timeFormat = "hh:mm A";
  const parsedTime = moment(selectTime, timeFormat);

  // Parse the selectDate using Moment.js
  const dateFormat = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)";
  const parsedDate = moment(selectDate, dateFormat);

  // Combine the parsed date and time to create start_time and end_time
  const startTime = parsedDate
    .clone()
    .set({
      hour: parsedTime.hour(),
      minute: parsedTime.minute(),
      second: 0,
    })
    .toISOString();

  const endTime = parsedDate
    .clone()
    .set({
      hour: parsedTime.hour(),
      minute: parsedTime.minute(),
      second: 0,
    })
    .add(1, "hour")
    .toISOString(); // Assuming 1 hour duration

  // Extract the day from the selectDate
  const day = parsedDate.format("dddd");
  // const day = moment(selectDate).format("dddd");
  // Extract the day from the selectDate
  let formattedStartTime = moment(startTime).format("HH:mm:ss ZZ");
  // let formattedStartTime = moment.utc(startTime, "HH:mm:ss ZZ").format("HH:mm:ss ZZ");
  let formattedEndTime = moment(endTime).format("HH:mm:ss ZZ");
  let formattedDate = moment(selectedDate).format("YYYY-MM-DDTHH:mm:ss");
  formattedStartTime = moment
    .utc(formattedStartTime, "HH:mm:ss Z")
    .format("HH:mm:ss ZZ");
  formattedEndTime = moment
    .utc(formattedEndTime, "HH:mm:ss Z")
    .format("HH:mm:ss ZZ");

  localStorage.setItem(
    "appointment_date",
    JSON.stringify({
      day: day,
      start_time: formattedStartTime,
      // start_time: startTime,
      // end_time: formattedEndTime,
      end_time: formattedEndTime,
      // selectDate: selectDate
      selectDate: formattedDate,
    })
  );

  const handleClick = async () => {
    const dataToSend = {
      appointment_date: JSON.parse(localStorage.getItem("appointment_date")),
      patient: JSON.parse(localStorage.getItem("user_information")),
      doctor_details: JSON.parse(
        localStorage.getItem("current_doctor_details")
      ),
    };
    try {
      // http://localhost:5000/patient/create_appointment
      const res = await axios.post(
        `${config.base_url}/patient/create_appointment`,
        {
          data: dataToSend,
        }
      );
      toast.success("Appointment Created Successfully");
      if(res?.data?.success){
        setTimeout(() => {
          navigate("/patient-myvisits")// Navigate after 5 seconds
        }, 3000);
      }
      console.log("Appointment res", res.data);
      // setAppointmentDetails()
      // setLoader(!loader);
    } catch (error) {
      console.log("error", error);
    }
    // navigate("/select-doctor");
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMediaChange = (media: string) => {
    setSelectedMedia(media);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <Header>
      <Container>
        <div className="m-3">
          <Row className="flex-nowrap align-items-center my-4">
            <BackButton
              onClick={() => {
                navigate(-1);
              }}
            />
            <span className="vl"></span>
            <h5>Schedule Appointment</h5>
          </Row>
        </div>
        <Row className="">
          <Col md={12} lg={6} sm={12}>
            <CalendarComponent onDateChange={handleDateChange} />
          </Col>
          <Col
            md={12}
            lg={6}
            sm={12}
            className="bg-white py-4 px-4"
            style={{ borderRadius: "24px" }}
          >
            {/* <MediaTypeSelection onMediaChange={handleMediaChange} /> */}
            <TimeSelection onTimeChange={handleTimeChange} />
            <Confirmation
              selectedDate={selectedDate}
              selectedMedia={selectedMedia}
              selectedTime={selectedTime}
            />
          </Col>
        </Row>

        <div className="mt-4">
          <Row className="text-end justify-content-end">
            <Button
              variant="primary"
              className="schedule-btn"
              title="Create Appointment"
              onClick={handleClick}
              disabled={selectedDate == null || selectedTime == null}
            />
          </Row>
        </div>
        <ToastContainer />
      </Container>
    </Header>
  );
};

export default AppoinmentByDoctor;
