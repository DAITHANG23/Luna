import axiosWrapper from "@/utils/axios";
import { API_VERSION_V1 } from "../contants";
import { UserLogin } from "@/@types/models/account";

const baseURL = `${API_VERSION_V1}/users`;
const account = {
  login: async ({ formData }: { formData: UserLogin }) => {
    return await axiosWrapper.post(`${API_VERSION_V1}/users/login`, formData);
  },

  register: async ({ formData }: { formData: UserLogin }) => {
    return await axiosWrapper.post(`${baseURL}/signup`, formData);
  },

  logout: (token: string) => {
    return axiosWrapper.post(
      `${baseURL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default account;
