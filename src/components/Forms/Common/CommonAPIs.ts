import axios from "../../../configs/axios";
import { baseUrl } from "../../../constants/constants";

export const commonLogin = async (email: string, password: string) => {
  try {
    return await axios.post(`${baseUrl}/api/login`, { email, password });
  } catch (error) {
    return error?.response;
  }
};