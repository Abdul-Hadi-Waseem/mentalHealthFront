import axios from "axios";
import { baseUrl } from "../../../constants/constants";

export const instituteLogin = async (email: string, password: string) => {
  return await axios.post(`${baseUrl}/institute/login`, { email, password });
};
