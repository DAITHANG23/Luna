import { API_VERSION_V1 } from "@/contants";
import {
  LoginResponse,
  RefreshTokenResponse,
  UpdatePasswordType,
  UserLogin,
  UserResponse,
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

  getDataUser: (): Promise<UserResponse> => {
    return apiRequest(`${baseURL}/me`, "GET");
  },

  updateUser: async ({
    formData,
  }: {
    formData: UserLogin;
  }): Promise<UserResponse> => {
    return await apiRequest(`${baseURL}/updateMe`, "PATCH", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteAccount: async () => {
    return await apiRequest(`${baseURL}/deleteMe`, "DELETE");
  },

  updatePassword: async ({
    formData,
  }: {
    formData: UpdatePasswordType;
  }): Promise<LoginResponse> => {
    return apiRequest(`${baseURL}/updateMyPassword`, "PATCH", formData);
  },
};

export default account;
