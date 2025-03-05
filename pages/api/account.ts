import { API_VERSION_V1 } from "../contants";
import {
  LoginResponse,
  RefreshTokenResponse,
  UserLogin,
} from "@/@types/models/account";
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

  logout: () => {
    return apiRequest(`${baseURL}/logout`, "POST", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
  },

  refreshToken: (): Promise<RefreshTokenResponse> => {
    return apiRequest(`${baseURL}/refreshToken`, "POST", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
  },
};

export default account;
