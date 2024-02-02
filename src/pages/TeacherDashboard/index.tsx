import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../components/Common/Buttons/Button";
import {
  getStudentsOfATeacher,
  getTeacherData,
  uploadStudentsCSVFile,
  registerStudentsBulk,
} from "../../components/Forms/Teachers/TeachersAPIs";
import StudentDisplayComponent from "../../components/StudentDisplayComponent";
import StudentInvitation from "../../components/StudentInvitation";
import TeacherHeader from "./Header/Header";
import * as XLSX from "xlsx";

function TeacherDashboard() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

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
  const { data: teacherData } = useQuery(
    "getTeacherDetail",
    () => getTeacherData(),
    {
      refetchOnWindowFocus: false,
    }
  );
  const downloadTemplate = () => {
    const templateData = [
      ["name", "age", "className", "dob", "section", "guardian_name", "phone"],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, "student_template.xlsx");
  };
  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => {
    setShowOffCanvas(true);
  };

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          if (
            jsonData[0][0] == "name" &&
            jsonData[0][1] == "age" &&
            jsonData[0][2] == "className" &&
            jsonData[0][3] == "dob" &&
            jsonData[0][4] == "section" &&
            jsonData[0][5] == "guardian_name" &&
            jsonData[0][6] == "phone"
          ) {
            registerStudentsBulk(jsonData)
              .then((result) => {
                if (result?.data?.status === 200) {
                  toast.success(result?.data?.message);
                  refetch();
                }
              })
              .catch((error) => {
                if (error.response.status == 207)
                  toast.warn("Some Students maybe registered.");
                else toast.error("Error registering students.");
                console.error("Error registering students:", error);
              });
          } else {
            toast.error("Invalid file type. Please select a valid Excel file.");
            return;
          }
        };

        reader.readAsBinaryString(selectedFile);
      } else {
        // Invalid file type selected, show an error toast.
        toast.error("Invalid file type. Please select a valid Excel file.");
      }
    }
  };

  const handleButtonClick = () => {
    // Trigger a click event on the hidden file input to open the file dialog.
    fileInputRef.current.click();
  };
  return (
    <>
      <TeacherHeader />
      <Container>
        <Row className="d-flex flex-row align-items-center">
          <Col xs={12} sm={4} md={4} lg={4} xl={4}>
            <h4 className="text-capitalize">Dashboard</h4>
          </Col>
          <Col
            xs={12}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            className="d-flex justify-content-center"
          >
            <Button
              title="Download Excel Template"
              className="px-3 px-sm-4 py-3 mb-3 text-truncate me-2 green-button"
              onClick={downloadTemplate}
            />

            <Button
              variant="primary"
              title="Upload Invite File"
              className="px-3 px-sm-4 py-3 mb-3 text-truncate me-2"
              onClick={handleButtonClick}
            />
            <input
              type="file"
              accept=".xlsx, .xls"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <Button
              variant="primary"
              title="Invite Student"
              className="px-3 px-sm-4 py-3 mb-3 text-truncate"
              onClick={() => handleShowOffCanvas()}
            />
          </Col>
        </Row>

        <StudentDisplayComponent
          students={students?.data?.data}
          teacherData={teacherData?.data?.data}
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
