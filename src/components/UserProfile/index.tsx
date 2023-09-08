import { useState } from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./userProfile.css";


import Input from "./../Common/Input";
import { change_date_format, change_duration_format,change_time_format } from "../../global_func";
const UserProfile = ({
  img,
  userDetails,
  appointmentDetails,
  downloadForms,
}: any) => {
  const [isInsured, setIsInsured] = useState(false);

  const { Date, Time, Duration } = appointmentDetails;
  const { name, treat } = userDetails;

  const handleSwitchChange = () => {
    setIsInsured(!isInsured);
  };
  let {details} = userDetails
  let {date, time , slot_duration} = details;
  // console.log("userDetails user", userDetails)
  return (
    <>
      <Container fluid className="px-2" style={{ color: "#243D4C" }}>
        <Row>
          <Col xs={12}>
            <h4 className="h4_child">Upcomming Appointments</h4>
          </Col>
        </Row>
        <Row className="mb-4  m-0 p-0">
          <Col xs={4}>
            <div>
              <img src={img} />
            </div>
          </Col>
          <Col xs={7}>
            <div className="d-flex flex-column h-100 justify-content-center p-2">
              <span className="py-1 fs-5" style={{ fontWeight: 600 }}>
                {name}
              </span>
              <small
                className="py-1 fw-light fs-6 text-muted"
                style={{ fontWeight: 400 }}
              >
                {treat}
              </small>
            </div>
          </Col>
        </Row>
        <Container fluid className="bg-light p-2" style={{borderRadius: "6px"}}>
          <Row className="px-3 mb-2">
            <Col xs={12} className="py-2 p-0 m-0 border-bottom border-2"
            style={{fontSize: "16px", fontWeight: 600}}
            >
              Appointment Details
            </Col>
          </Row>
          <Row className="px-1">
            <Col xs={4}>
              <div className="pt-1">Date</div>
              {/* <div className="fw-light text-muted py-1">{Date}</div> */}
              {/* <div className="fw-light text-muted py-1">{moment(date).format("MMM D YYYY")}</div> */}
              <div className="fw-light text-muted py-1">{change_date_format(date)}</div>
            </Col>
            <Col xs={4}>
              <div className="pt-1">Time</div>
              {/* <div className="fw-light text-muted py-1">{Time}</div> */}
              {/* <div className="fw-light text-muted py-1">{moment(time, "HH:mm:ssZ").format("hh:mm a")}</div> */}
              <div className="fw-light text-muted py-1">{change_time_format(time)}</div>
            </Col>
            <Col xs={4}>
              <div className="pt-1">Duration</div>
              {/* <div className="fw-light text-muted py-1">{Duration}</div> */}
              {/* <div className="fw-light text-muted py-1">{slot_duration.toString().padStart(2, '0') + " hour" }</div> */}
              <div className="fw-light text-muted py-1">{change_duration_format(slot_duration)}</div>
            </Col>
          </Row>
        </Container>

        {/* <div className="d-flex justify-content-between">
          <div className="side_w_input">
            <Input label="State" placeholder="State" />
          </div>
          <div className="side_w_input">
            <Input label="Zip Code" placeholder="Zip Code" />
          </div>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ margin: "10px 0px" }}
        >
          <p className="b_text">Is it Covered By Insured</p>
          <Form.Check
            type="switch"
            id="custom-switch"
            // label="Is it Covered By Insured"
            checked={isInsured}
            onChange={handleSwitchChange}
          />
        </div> */}

        {/* Render the last three fields conditionally based on the switch value */}
        {/* {isInsured && (
          <>
            <Input label="Insurance Company" placeholder="ABC Company" />
            <Input label="Insurance Number" placeholder="0 123 456 789" />
            <Input
              label="Expiry Date"
              placeholder="12-12-23"
              className={"calendar_input"}
            />
          </>
        )} */}
      </Container>
    </>
  );
};

export default UserProfile;