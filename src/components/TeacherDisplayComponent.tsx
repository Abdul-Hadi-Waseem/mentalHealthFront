import { useState, useEffect } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import TeacherCard from "./Common/TeacherCard";

type SingleTeacherType = {
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
};

type TeachersPropsType = {
  teachers: any;
};

const TeacherDisplayComponent = ({ teachers }: TeachersPropsType) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [teachersList, setTeachersList] = useState([]);
  const navigate = useNavigate();
  //   const [suggestedBlogs, setSuggestedBlogs] = useState<IBlogs[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredTeachers = teachers.filter((teacher) =>
      teacher?.name?.toLowerCase().includes(query.toLowerCase())
    );
    setTeachersList(filteredTeachers);
  };

  useEffect(() => {
    setTeachersList(teachers);
  }, [teachers]);

  return (
    <div className="text-start py-3 px-4 search__box">
      <h5>Invited Teachers</h5>
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
            className="rounded"
            type="text"
            aria-label="Small"
            placeholder="Search any teacher..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
      </Form>
      <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
        {teachersList?.length > 0 ? (
          teachersList?.map((each: SingleTeacherType) => (
            <Col
              key={each.email}
              className="d-flex justify-content-center align-items-center"
            >
              <TeacherCard
                btnTitle="View Details"
                name={each.name}
                img={each.image}
                handleUserProfile={() => navigate(`/teacher/detail/${each.id}`)}
              />
            </Col>
          ))
        ) : searchQuery !== "" && teachersList?.length === 0 ? (
          <h5 className="my-3 d-flex justify-content-center align-items-center w-100">
            No Teachers Found ):
          </h5>
        ) : (
          <></>
        )}
      </Row>
    </div>
  );
};

export default TeacherDisplayComponent;
