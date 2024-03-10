import React from "react";
import { format } from "date-fns";
import { Col, Row } from "react-bootstrap";

interface ConfirmationProps {
  selectedDate: Date | null;
  selectedMedia: string | null;
  selectedTime: string | null;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
  selectedDate,
  selectedTime,
}) => {
  return (
    <>
      <hr style={{ width: "100%", color: "#516F8B" }}></hr>
      <Row className="justify-content-between">
        <Col className="date-time">Date:</Col>
        <Col className="text-end date-time">
          {" "}
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Not selected"}
        </Col>
      </Row>
      <Row className="justify-content-end mt-2">
        <Col className="date-time">Time: </Col>
        <Col className="text-end date-time">
          {selectedTime || "Not selected"}
        </Col>
      </Row>
    </>
  );
};
