import Cookies from "js-cookie";
import axios from "../../../configs/axios";
import { baseUrl } from "../../../constants/constants";
import { FormValues } from "./TeachersRegistration";
import { TeacherDetailsType } from "../../StudentDisplayComponent";

export interface AnswersType {
  question: string;
  answer: string;
}

export const teacherLogin = async (email: string, password: string) => {
  try {
    return await axios.post(`${baseUrl}/teacher/login`, { email, password });
  } catch (error) {
    return error?.response;
  }
};

export const registerTeacher = async (values: FormValues) => {
  let newValues = {
    name: values.name,
    institute_id: values.institute,
    email: values.email,
    dob: values.dob,
    gender: values.gender,
    phone: values.phone,
    state: values.state,
    zip_code: values.zip_code,
    city: values.city,
    country: values.country,
    password: values.password,
    confirmPassword: values.confirmPassword,
    address: values.address,
    classes: values?.classes,
    qualification: values?.qualification,
  };
  try {
    return await axios.post(`${baseUrl}/teacher/register`, newValues);
  } catch (error) {
    return error?.response;
  }
};

export const getInstitutes = async () => {
  try {
    return await axios.get(`${baseUrl}/teacher/institutes/get`);
  } catch (error) {
    return error?.response;
  }
};

export const getTeacherData = async () => {
  const token = Cookies.get("token");
  try {
    return await axios.get<TeacherDetailsType>(`${baseUrl}/teacher/data/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error?.response;
  }
};

export const getStudentsOfATeacher = async () => {
  const token = Cookies.get("token");
  return await axios.get(`${baseUrl}/teacher/students/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const submitPSCTest = async (answers: AnswersType[], id: number) => {
  try {
    const token = Cookies.get("token");
    return await axios.post(
      `${baseUrl}/teacher/student/test/psc/${id}`,
      answers,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error?.response;
  }
};

export const uploadStudentsCSVFile = async (file: File) => {
  const token = Cookies.get("token");
  const formData = new FormData();
  formData.append("csvFile", file);

  // Set the API endpoint URL
  const apiUrl = `${baseUrl}/teacher/students/upload`;

  // Set up headers, including the authorization token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    // Send the POST request with the FormData
    return await axios.post(apiUrl, formData, { headers });
  } catch (error) {
    // Handle errors, e.g., show an error message to the user
    console.error("Error uploading CSV file:", error);
  }
};
