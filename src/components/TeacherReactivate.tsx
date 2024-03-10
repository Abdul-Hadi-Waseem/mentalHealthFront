import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios, { AxiosError } from "axios";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import Button from "./Common/Buttons/Button";
import { toast } from "react-toastify";
import { getAllDeactivatedTeachers, reactivateTeacherAccount } from "../components/Forms/Institutes/InstituteAPIs";

interface TeacherInvitationProps {
  show: boolean;
  onHide: () => void;
  placement: "start" | "end" | "top" | "bottom";
}

const TeacherReactivate: React.FC<TeacherInvitationProps> = ({
  placement,
  show,
  onHide,
}) => {
  const [btnTitle, setBtnTitle] = useState<"Register" | "Sending Mail">(
    "Register"
  );
  const [teacherData, setTeacherData] = useState<any>(null);
  const [teacherIsLoading, setTeacherIsLoading] = useState<boolean>(false);
  const [teacherIsRefetching, setTeacherIsRefetching] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const handleSelectChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTeacherIsLoading(true);
        const response = await getAllDeactivatedTeachers();
        setTeacherData(response.data.data);
        console.log("deactivated_teachers_data", response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status) {
          toast.error("An error occurred fetching Teachers. Please try again");
        }
      } finally {
        setTeacherIsLoading(false);
      }
    };

    fetchData();
  }, [teacherIsRefetching]);
  const { refetch: reactivatedTeacherAccount, isRefetching } = useQuery(
    "reactivatesingleteacheraccount",
    () => reactivateTeacherAccount(selectedTeacher,JSON.parse(localStorage.getItem("institute_information")).id),
    {
      onSuccess: (res) => {
        if (res?.status === 200) {
          toast.success(res?.data?.message);            
        }
      },
      onError: (err: any) => {
        console.log(err, "ERROR DELETED");
        toast.error(err?.response?.data?.message);
      },
      enabled: false,
    }
  ); 
  const handleReactivate = async () => {
    try{
      reactivatedTeacherAccount();
    }    
    catch(error){
      console.log(error);
      toast.error("An error occurred Reactivating Teacher. Please try again");
    }
  };

  //donot remove this code it is used for formik
  const handleSubmit = (values, { resetForm }) => {    
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement={placement}
      style={{
        width: "280px",
        maxWidth: "83%",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title
          style={{ textAlign: "left", width: "100%", marginTop: "3rem" }}
        >
          Teacher Reactivation
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Formik
          initialValues={{
            name: "",
            email: "",
            qualification: "",
            classes: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="qualification" className="form-label">
                  Teacher
                </label>
                <Field
                  as="select"
                  id="teacher_reactivate"
                  name="teacher_reactivate"
                  disabled={btnTitle === "Sending Mail"}
                  onChange={handleSelectChange}
                  className={`form-select ${
                    errors.qualification && touched.qualification
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value="">Select Teacher</option>
                  {teacherData?.map((teacher) => (
                    <option key={teacher?.id} value={teacher?.id}>{teacher?.name}</option>
                  ))}
                </Field>
              </div>
              <Button title="Reactivate" onClick={handleReactivate}></Button>
            </Form>
          )}
        </Formik>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TeacherReactivate;
