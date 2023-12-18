import Cookies from "js-cookie";
import axios from "../../../configs/axios";
import { baseUrl } from "../../../constants/constants";

export const getAllTests = async () => {
  const token = Cookies.get("token");
  return await axios.get(`${baseUrl}/student/tests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
