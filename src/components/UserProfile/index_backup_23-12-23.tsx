import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./userProfile.css";
import Button from "../Common/Buttons/Button";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  Line,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  change_date_format,
  change_duration_format,
  change_time_format,
} from "../../global_func";
import config from "../../configs/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserProfile = ({
  img,
  userDetails,
  appointmentDetails,
  pdfData,
  doctorDetails,
  downloadForms,
  heading,
}: any) => {
  const [isInsured, setIsInsured] = useState(false);
  const navigate = useNavigate();

  const { name, treat } = userDetails;

  const handleSwitchChange = () => {
    setIsInsured(!isInsured);
  };
  let { details } = userDetails;
  let { date, time, slot_duration } = details;
  const handleAgoraMeeting = async () => {
    const channelName = doctorDetails.channel_name || "Appointment";
    const doctor_id = doctorDetails.doctor_id || "123456";
    const role = "Doctor";
    let response = await axios.get(
      `${config.base_url}/patient/get_meeting_token/${doctor_id}/${channelName}`
    );
    localStorage.setItem(
      "creds",
      channelName + "@" + role + "@" + response.data.data + "@" + doctor_id
    );
    navigate("/doctor-video-call");
  };
  const PSCDocs = () => (
    <Document>
      <Page size={"A4"}>
        <View
          style={{
            display: "flex",
            textAlign: "center",
            marginTop: "10px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <Text>PATIENT PSC TEST DETAIL</Text>
        </View>
        <View
          style={{
            marginTop: "4px",
            marginLeft: "10px",
            color: "gray",
            fontSize: "13px",
          }}
        >
          <Text>{`Name : ${name}`}</Text>
        </View>
        <View
          style={{
            marginTop: "4px",
            marginLeft: "10px",
            color: "gray",
            fontSize: "13px",
          }}
        >
          <Text>{`Score : ${pdfData?.score}`}</Text>
        </View>
        <View
          style={{
            marginTop: "4px",
            marginLeft: "10px",
            color: "gray",
            fontSize: "13px",
          }}
        >
          <Text>{`Condition : ${pdfData?.condition}`}</Text>
        </View>
        <View
          style={{
            marginTop: "10px",
            fontSize: "16px",
            borderTop: "1px solid gray",
            borderBottom: "1px solid gray",
            textAlign: "center",
          }}
        >
          <Text>PSC Question and Answere</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
          {pdfData.questions.map((el, index) => (
            <View
              key={index}
              style={{
                display: "flex",
                fontSize: "13px",
                margin: "3px 0px 2px 3px",
                flexDirection: "column",
              }}
            >
              <View
                key={`question-${index}`}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Text style={{ color: "gray", fontSize: 13 }}>
                  Question : {JSON.parse(el).question}
                </Text>
              </View>
              <br />
              <View
                key={`answer-${index}`}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Text style={{ color: "gray", fontSize: 13 }}>
                  Answer: {JSON.parse(el).answer}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const handlePatientDetails = () => {
    navigate("/patient-details");
  };
  return (
    <>
      <Container fluid className="px-2" style={{ color: "#243D4C" }}>
        <Row>
          <Col xs={12}>
            <h4 className="h4_child">{heading}</h4>
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
        <Container
          fluid
          className="bg-light p-2"
          style={{ borderRadius: "6px" }}
        >
          <Row className="px-3 mb-2">
            <Col
              xs={12}
              className="py-2 p-0 m-0 border-bottom border-2"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Appointment Details
            </Col>
          </Row>
          <Row className="px-1">
            <Col xs={4}>
              <div className="pt-1">Date</div>
              <div className="fw-light text-muted py-1">
                {change_date_format(date)}
              </div>
            </Col>
            <Col xs={4}>
              <div className="pt-1">Time</div>
              <div className="fw-light text-muted py-1">
                {change_time_format(time)}
              </div>
            </Col>
            <Col xs={4}>
              <div className="pt-1">Duration</div>
              <div className="fw-light text-muted py-1">
                {change_duration_format(slot_duration)}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="pt-2">
              <Button
                variant="primary"
                className="w-100 py-2"
                onClick={handlePatientDetails}
                title="Patient Details"
              />
            </Col>
            <Col xs={12} className="pt-2">
              <PDFDownloadLink
                className={"pdf-downloader"}
                document={<PSCDocs />}
                fileName={`${name}.pdf`}
              >
                <Button
                  variant="primary"
                  className="w-100 py-2"
                  title="PSC Test Details PDF Download"
                />
              </PDFDownloadLink>
            </Col>
            {appointmentDetails.Date &&
            new Date(appointmentDetails.Date) == new Date() ? (
              <div className="flex-center">
                <Button
                  variant="success"
                  title="JOIN APPOINTMENT"
                  className="w-100 py-2"
                  type="submit"
                  onClick={handleAgoraMeeting}
                />
              </div>
            ) : new Date(appointmentDetails.Date) > new Date() ? (
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
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default UserProfile;
