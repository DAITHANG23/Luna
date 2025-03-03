import { API_VERSION_V1 } from "../contants";
import { LoginResponse, UserLogin } from "@/@types/models/account";
import apiRequest from "@/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/users`;
const account = {
  login: async ({
    formData,
  }: {
    formData: UserLogin;
  }): Promise<LoginResponse> => {
    return await apiRequest(`${baseURL}/login`, "POST", formData);
  },

  register: async ({
    formData,
  }: {
    formData: UserLogin;
  }): Promise<LoginResponse> => {
    return await apiRequest(`${baseURL}/signup`, "POST", formData);
  },

  logout: (token: string) => {
    return apiRequest(`${baseURL}/logout`, "POST", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default account;
