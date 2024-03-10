import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

interface TimeSelectionProps {
  onTimeChange: (time: string) => void;
}

export const TimeSelection: React.FC<TimeSelectionProps> = ({
  onTimeChange,
}) => {
  const [selectedTime, setSelectedTime] = useState("");

  // replace this with your actual time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
  ];

  const handleClick = (time: string) => {
    setSelectedTime(time);
    onTimeChange(time);
  };

  return (
    <div>
      <h5 className="select-time-heading">Select Time</h5>
      <hr style={{width: "100%", color: "#516F8B"}}></hr>
      <Row className="">
        {timeSlots.map((time, index) => (
          <Col 
            key={index}
            className={selectedTime === time ? "selected time-slot" : "time-slot" }
            lg={6}
            xs={12} md={6}
            onClick={() => handleClick(time)}
          >
            {time}
          </Col>
        ))}
      </Row>
    </div>
  );
};
