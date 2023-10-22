import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import Button from "../../components/Common/Buttons/Button";
import {
  getStudentsOfATeacher,
  uploadStudentsCSVFile,
} from "../../components/Forms/Teachers/TeachersAPIs";
import StudentDisplayComponent from "../../components/StudentDisplayComponent";
import StudentInvitation from "../../components/StudentInvitation";
import TeacherHeader from "./Header/Header";

function TeacherDashboard() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const teacher_information = JSON.parse(
    localStorage.getItem("teacher_information")
  );

  const {
    data: students,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery(
    "getAllOfTheStudentsForSingleTeacher",
    () => getStudentsOfATeacher(),
    {
      onError: (err: AxiosError) => {
        if (err?.response?.status)
          toast.error("An error occured fetching Students. Please try again");
      },
    }
  );
  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => {
    setShowOffCanvas(true);
  };

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type === "text/csv") {
        // Valid CSV file selected, you can proceed with handling it.
        console.log("CSV file selected:", selectedFile);
        uploadStudentsCSVFile(selectedFile).then((result) => {
          if (result?.data?.status === 200) {
            toast.success(result?.data?.message);
            refetch();
          }
        });
      } else {
        // Invalid file type selected, show an error toast.
        toast.error("Invalid file type. Please select a CSV file.");
      }
    }
  };

  const handleButtonClick = () => {
    // Trigger a click event on the hidden file input to open the file dialog.
    fileInputRef.current.click();
  };
  // const navigate = useNavigate();
  return (
    <>
      <TeacherHeader />
      <Container>
        <Row className="d-flex flex-row">
          <Col
            className={`d-flex flex-column justify-content-start py-5`}
            xs={12}
            sm={5}
            md={6}
            lg={6}
            xl={8}
          >
            <h4 className="text-capitalize">Dashboard</h4>
          </Col>
          <Col
            className="d-flex align-items-center"
            xs={12}
            sm={4}
            md={3}
            lg={3}
            xl={2}
          >
            <div>
              <Button
                variant="primary"
                title="Upload Invite File"
                className="px-3 px-sm-4 py-3 mb-3 text-truncate"
                onClick={handleButtonClick}
              />
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center"
            xs={12}
            sm={3}
            md={3}
            lg={3}
            xl={2}
          >
            <div>
              <Button
                variant="primary"
                title="Invite Student"
                className="px-3 px-sm-4 py-3 mb-3 text-truncate"
                onClick={() => handleShowOffCanvas()}
              />
            </div>
          </Col>
        </Row>
        <StudentDisplayComponent
          students={students?.data?.data}
          teacherName={teacher_information?.name}
        />
        <Row className="d-flex justify-content-between">
          {isLoading || isRefetching ? (
            <p>Loading...</p>
          ) : (
            <StudentInvitation
              refetchStudents={refetch}
              onHide={handleCloseOffCanvas}
              show={showOffCanvas}
              placement="end"
            />
          )}
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default TeacherDashboard;
