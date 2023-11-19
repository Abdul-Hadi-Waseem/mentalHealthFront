import { Col, Row } from "react-bootstrap";
import { useState } from "react";

// Components Login Sign-up and Registration
import Login from "../../components/Forms/Login";
import Registration from "../../components/Forms/Registration";
import DoctorLoginForm from "../../components/Forms/Doctors/DoctorLogin";
import DoctorRegistrationForm from "../../components/Forms/Doctors/DoctorRegistration";
import AcademicInformation from "../../components/Forms/Doctors/AcademicInformation";
import DoctorProfessionExperience from "../../components/Forms/Doctors/DoctorProfessionExperience";

import "./Account.css";
// images
import Login_Bg from "../../assets/images/login_bg.jpg";
import Register_Bg from "../../assets/images/register_bg.jpg";
import doctor_heart from "./../../assets/images/doctor_heart.png";
import doctor_login from "./../../assets/images/doctor_login.png";
import academic_information from "./../../assets/images/academic_information.png";
import professional_experience from "./../../assets/images/professional_experience.png";
import InstituteLoginForm from "../../components/Forms/Institutes/InstituteLogin";
import InstituteRegistrationForm from "../../components/Forms/Institutes/InstituteRegistration";
import InstituteDashBoard from "../InstituteDashboard";
import TeachersRegistrationForm from "../../components/Forms/Teachers/TeachersRegistration";
import TeacherLoginForm from "../../components/Forms/Teachers/TeachersLogin";
import CommonLoginForm from "../../components/Forms/Common/CommonLogin";

interface FormValues {
  college_name: string;
  course: string;
  year: string;
  certificates?: [];
}
// interface DoctorAcountInformation extends FormValues {
//   college_name: string;
//   course: string;
//   year: string;
//   certificates?: [];
// }
// interface DoctorProfessionalExperience extends FormValues {
//   clinic_name: string;
//   clinic_experience: string;
//   specialities: string;
//   clinic_address: string;
//   state: string;
//   zip_code: string;
//   city: string;
//   country: string;
//   clinic_schedule: { day: string; start_time: string; end_time: string }[];
//   day: string;
//   start_time: string;
//   end_time: string;
//   professional_bio: string;
// }

function Account() {
  const [doctorRegisterInformation, setDoctorInformation] =
    useState<FormValues>({
      college_name: "",
      course: "",
      year: "",
      certificates: [],
      // clinic_name: "",
      // clinic_experience: "",
      // specialities: "",
      // clinic_address: "",
      // state: "",
      // zip_code: "",
      // city: "",
      // country: "",
      // clinic_schedule: "",
      // start_time: "",
      // end_time: "",
      // professional_bio: "",
    });

  const handleDoctorAcademicInformation = (values: FormValues) => {
    setDoctorInformation(values);
  };

  const goToPage = (path: string) => {
    switch (path) {
      case "/login":
        return <Login />;
      case "/doctor-login":
        return <DoctorLoginForm />;
      case "/doctor-registration":
        return <DoctorRegistrationForm />;
      case "/academic-information":
        return (
          <AcademicInformation
            handleAcademicInformation={handleDoctorAcademicInformation}
          />
        );
      case "/professional-experience":
        return (
          <DoctorProfessionExperience
            academicInformation={doctorRegisterInformation}
          />
        );
      case "/doctor-login":
        return <DoctorLoginForm />;
      case "/doctor-registration":
        return <DoctorRegistrationForm />;
      case "/institute-login":
        return <InstituteLoginForm />;
      case "/institute-registration":
        return <InstituteRegistrationForm />;
      case "/institute-dashboard":
        return <InstituteDashBoard />;
      case "/teacher-login":
        return <TeacherLoginForm />;
      case "/teacher-registration":
        return <TeachersRegistrationForm />;
      case "/login":
        return <CommonLoginForm />;
      // case "/institute-dashboard":
      //   return <InstituteDashBoard />;
      // return <DoctorProfessionExperience />;
      // return <DoctorProfessionExperience handleProfessionExperience={handleDoctorProfessionExperience} />;
      default:
        return <Registration />;
    }
  };

  const setImage = (path: string) => {
    switch (path) {
      case "/login":
        return Login_Bg;
      case "/doctor-login":
        return doctor_login;
      case "/doctor-registration":
        return doctor_heart;
      case "/academic-information":
        return academic_information;
      case "/professional-experience":
        return professional_experience;
      case "/login":
        return Login_Bg;
      default:
        return Register_Bg;
    }
  };

  console.log(location.pathname, "url");
  return (
    <Row className="account__section g-0">
      <Col className="account__section__left" sm={12} lg={6}>
        {/* {location.pathname === "/login" ? <Login /> : location.pathname === "/doctor-login"? <DoctorRegistrationForm /> :<Registration />} */}
        {/* {location.pathname === "/login" ? (
          <Login />
        ) : location.pathname === "/doctor-login" ? (
          <DoctorLoginForm />
        ) : location.pathname === "/doctor-registration" ? (
          <DoctorRegistrationForm />
        ) : (
          <Registration />
        )} */}
        {goToPage(location.pathname)}
        <p className="copyright mb-5 text-center">
          © 2023 Mental Support. All rights reserved, Privacy Policy and Terms
          of Use
        </p>
      </Col>
      <Col className="d-flex" sm={12} lg={6}>
        <img
          src={setImage(location.pathname)}
          className="w-100"
          style={{ height: "100%" }}
        />
      </Col>
    </Row>
  );
}

export default Account;
