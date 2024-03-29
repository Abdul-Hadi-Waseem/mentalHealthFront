import { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import team_1 from "../assets/images/team-1.png";
import StudentCard from "./Common/StudentCard";
import StudentDetailOffCanvas from "./StudentDetailOffCanvas";

export interface SingleStudentType {
  id: number;
  name: string;
  age: number;
  class: string;
  teacher_id: number;
  psc_score: number | null;
  psc_result: null | string;
  dob: string;
  section: string;
  guardian_name: string;
  phone: string;
}

export type TeacherDetailsType = {
  id: number;
  name: string;
  dob: string;
  gender: string;
  address: string;
  state: string;
  zip_code: string;
  city: string;
  country: string;
  institute_id: number;
  email: string;
  image: string;
  phone?: string;
  qualification: "qualified" | "unqualified";
  classes: string;
};

type StudentsPropsType = {
  students: any;
  teacherData: TeacherDetailsType;
};

const StudentDisplayComponent = ({
  students,
  teacherData,
}: StudentsPropsType) => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<SingleStudentType>();
  const [studentsList, setStudentsList] = useState([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredTeachers = students.filter((student) =>
      student?.name?.toLowerCase().includes(query.toLowerCase())
    );
    setStudentsList(filteredTeachers);
  };

  const handleCloseOffCanvas = () => setShowOffCanvas(false);

  const handleShowOffCanvas = () => {
    console.log("function");
    setShowOffCanvas(true);
  };

  useEffect(() => {
    setStudentsList(students);
  }, [students]);

  return (
    <div className="text-start py-3 px-4 search__box">
      <h5>Invited Students</h5>
      <hr
        className="my-4"
        style={{ width: "100%", opacity: "0.1", borderBottom: "1px" }}
      />
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text className="d-flex align-items-center">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            className="rounded-right rounded-left"
            type="text"
            aria-label="Small"
            placeholder="Search any student..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
      </Form>
      <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
        {studentsList?.length > 0 ? (
          studentsList?.map((each: SingleStudentType) => (
            <Col
              key={each.id}
              className="d-flex justify-content-center align-items-center"
            >
              <StudentCard
                btnTitle="View Details"
                name={each.name}
                img={team_1}
                handleUserProfile={() => {
                  handleShowOffCanvas();
                  localStorage.setItem("student", JSON.stringify(each));
                  localStorage.setItem("age", JSON.stringify(each?.age));
                  setSelectedStudent(each);
                }}
              />
            </Col>
          ))
        ) : searchQuery !== "" && studentsList?.length === 0 ? (
          <h5 className="my-3 d-flex justify-content-center align-items-center w-100">
            No Students Found ):
          </h5>
        ) : (
          <></>
        )}
      </Row>
      <StudentDetailOffCanvas
        onHide={handleCloseOffCanvas}
        show={showOffCanvas}
        placement="end"
        studentData={selectedStudent}
        teacherData={teacherData}
      />
    </div>
  );
};

export default StudentDisplayComponent;
