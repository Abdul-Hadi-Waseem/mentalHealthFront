import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InstituteHeader from "../pages/InstituteDashboard/Header/Header";
import { Container, Row, Col, Placeholder } from "react-bootstrap";
import BackButton from "./Common/Buttons/BackButton";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import axios from "axios";
import config from "../configs/config";
import { toast, ToastContainer } from "react-toastify";
import { getToken } from "../utils";
import {
  getStudentsOfATeacher,
  getTeacherDetail,
  removeTeacherAccount,
} from "./Forms/Institutes/InstituteAPIs";
import StudentDisplayComponent from "./StudentDisplayComponent";
import TeacherProfileOffCanvas from "./TeacherProfileOffCanvas";
import TransferStudentsModal from "./TransferStudentsModal";
import { getAllTeachers } from "../components/Forms/Institutes/InstituteAPIs";

const TeacherDetail = () => {
  const { id } = useParams();
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleTransferStudents = async (toTeacher) => {
    const fromTeacher = id;
    const response = await axios.put(
      `${config.base_url}/institute/student/transfer`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Add the authorization token here with the "Bearer" prefix
        },
        fromTeacher,
        toTeacher,
      }
    );
    if (response.status == 200) {
      toast.success("Students Transferred Successfully");
      handleCloseModal();
    }
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const {
    data: teacher_data,
    isLoading: teacher_isLoading,
    isRefetching: teacher_isRefetching,
  } = useQuery("getAllTeachersInInstitute", () => getAllTeachers(), {
    refetchOnWindowFocus: false,
    onError: (err: AxiosError) => {
      if (err?.response?.status)
        toast.error("An error occured fetching Teachers. Please try again");
    },
    onSuccess: (data) => {
      // console.log("teacher_data", data)
    },
  });
  const { data, isLoading, isRefetching } = useQuery(
    "getInstitute'sTeacherDetail",
    () => getTeacherDetail(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: students,
    isLoading: studentsIsLoading,
    isRefetching: studentsIsRefetching,
  } = useQuery(
    "getInstitute'sTeacher'sStudets",
    () => getStudentsOfATeacher(id),
    {
      refetchOnWindowFocus: false,
      enabled: !!data?.data?.data?.id,

      onError: (err: any) => {
        toast.error("Error Fetching Students, Please try again");
      },
    }
  );

  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleDeactivateTeacher = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to deactivate this teacher?"
    );
    if (confirmation) {
      const { refetch: deleteTeacherAccount, isRefetching } = useQuery(
        "removeasingleteacheraccount",
        () => removeTeacherAccount(id),
        {
          onSuccess: (res) => {
            console.log(res, "delet succ  ");
            if (res?.status === 200) {
              toast.success(res?.data?.message);
              setTimeout(() => {
                navigate(-1);
              }, 2000);
            }
          },
          onError: (err: any) => {
            console.log(err, "ERROR DELETED");
            toast.error(err?.response?.data?.message);
          },
          enabled: false,
        }
      );
    } else {
      return;
    }
  };
  const handleShowOffCanvas = () => {
    setShowOffCanvas(true);
  };
  const navigate = useNavigate();
  return (
    <>
      <InstituteHeader />
      <Container>
        <Row className="d-flex justify-content-between align-items-center pt-5">
          <Col
            className="d-flex flex-column justify-content-start"
            xs={12}
            md={6}
          >
            <div className="d-flex flex-row justify-content-start align-items-center">
              <BackButton onClick={() => navigate(-1)} />
              <span className="px-2" style={{ fontSize: "10px" }}>
                |
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "#243D4C",
                }}
              >
                Teacher Detail
              </span>
            </div>
          </Col>
        </Row>
      </Container>
      {isLoading || isRefetching ? (
        <Container>Loading...</Container>
      ) : (
        <Container>
          <Row
            className="flex flex-wrap justify-content-start w-100 border pt-4 mb-1"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              marginRight: "0px",
              marginLeft: "0px",
            }}
          >
            <Row>
              <Col
                xs={12}
                md={2}
                className="d-flex justify-content-center align-items-center"
              >
                <div
                  className="doctor_img "
                  style={{ width: "100px", objectFit: "contain" }}
                >
                  <img
                    src={data?.data?.data?.image}
                    alt="doctor"
                    style={{ width: "100%", borderRadius: "15%" }}
                  />
                </div>
              </Col>
              <Col xs={12} md={10}>
                <Row className="px-3">
                  <Col xs={12} md={4}>
                    <h3 className="doctor-name">{data?.data?.data?.name}</h3>
                    <p>Teacher</p>
                  </Col>
                  <Col xs={12} md={4} className="mt-3">
                    <button
                      className="doctor_card_btn text-center"
                      onClick={handleOpenModal}
                    >
                      {"Transfer Students"}
                    </button>
                  </Col>
                  <Col xs={12} md={4} className="mt-3">
                    <button
                      className="doctor_card_btn text-center"
                      onClick={handleShowOffCanvas}
                    >
                      {"View Profile"}
                    </button>
                  </Col>
                  <Col xs={12} md={3} className="mt-3">
                    <button
                      className="doctor_card_btn_danger text-center"
                      onClick={handleDeactivateTeacher}
                    >
                      {"Deactivate"}
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <hr style={{ width: "100%" }} />
              </Col>
              <Row className="m-3"></Row>
            </Row>
          </Row>
        </Container>
      )}
      <Container>
        <StudentDisplayComponent
          students={students?.data?.data}
          teacherData={data?.data?.data}
        />
      </Container>
      <Container>
        <TeacherProfileOffCanvas
          teacherData={data?.data?.data}
          onHide={handleCloseOffCanvas}
          placement="end"
          show={showOffCanvas}
        />
      </Container>
      {teacher_data ? (
        <TransferStudentsModal
          isOpen={isModalOpen}
          teachers={teacher_data.data.data.filter(
            (teacher) => teacher.id != id
          )}
          handleCloseModal={handleCloseModal}
          transferStudents={handleTransferStudents}
        />
      ) : null}
      <ToastContainer />
    </>
  );
};

export default TeacherDetail;
