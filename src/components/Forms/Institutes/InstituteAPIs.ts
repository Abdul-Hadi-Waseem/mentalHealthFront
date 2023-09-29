import axios from "axios";
import { baseUrl } from "../../../constants/constants";
import { FormValues } from "./InstituteRegistration";

export const instituteLogin = async (email: string, password: string) => {
  try {
    return await axios.post(`${baseUrl}/institute/login`, { email, password });
  } catch (error) {
    return error?.response
  }
};

export const registerInstitute = async (values: FormValues) => {
  try {
    return await axios.post(`${baseUrl}/institute/register`, values);
  } catch (error) {
    return error?.response;
  }
};
