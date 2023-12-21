import axios from "../../../configs/axios";
import { baseUrl } from "../../../constants/constants";
import { FormValues } from "./InstituteRegistration";
import Cookies from "js-cookie";

export const instituteLogin = async (email: string, password: string) => {
  try {
    return await axios.post(`${baseUrl}/institute/login`, { email, password });
  } catch (error) {
    return error?.response;
  }
};

export const registerInstitute = async (values: FormValues) => {
  try {
    return await axios.post(`${baseUrl}/institute/register`, values);
  } catch (error) {
    return error?.response;
  }
};

export const sendSuccessMail = async (values: FormValues) => {
  try {
    return await axios.post(`${baseUrl}/mail/registersuccessful`, values);
  } catch (error) {
    return error?.response;
  }
};

export const getAllTeachers = async () => {
  const token = Cookies.get("token");
  return await axios.get(`${baseUrl}/institute/teachers/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllDeactivatedTeachers = async () => {
  const token = Cookies.get("token");
  return await axios.get(`${baseUrl}/institute/teachers/deactivated`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTeacherDetail = async (id: number | string) => {
  const token = Cookies.get("token");
  return await axios.get(`${baseUrl}/institute/teacher/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStudentsOfATeacher = async (teacherId: number | string) => {
  const token = Cookies.get("token");
  return await axios.get(`${baseUrl}/institute/teacher/${teacherId}/students`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeTeacherAccount = async (teacherId: number | string) => {
  const token = Cookies.get("token");
  return await axios.delete(
    `${baseUrl}/institute/teacher/remove/${teacherId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const reactivateTeacherAccount = async (
  teacherId: number | string,
  instituteId: any
) => {
  const token = Cookies.get("token");
  return await axios.put(
    `${baseUrl}/institute/teacher/reactivate/${teacherId}/${instituteId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const sendTeacherInvitation = async (
  name: string,
  toEmail: string,
  classes: string,
  qualification: "qualified" | "unqualified"
) => {
  try {
    const token = Cookies.get("token");
    //get institute_information from localstorage
    const institute_information = JSON.parse(
      localStorage.getItem("institute_information")
    );
    const institute_name = institute_information.name;
    return await axios.post(
      `${baseUrl}/institute/mail/send/register`,
      {
        name,
        toEmail,
        classes,
        qualification,
        institute_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error.response;
  }
};

export const inviteStudent = async (
  name: string,
  age: string,
  className: string,
  dob: "" | Date,
  section: string,
  guardian_name: string,
  phone: string
) => {
  try {
    const token = Cookies.get("token");
    return await axios.post(
      `${baseUrl}/teacher/student/add`,
      {
        name,
        age,
        className,
        dob,
        section,
        guardian_name,
        phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error.response;
  }
};
