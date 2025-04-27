import { API_VERSION_V1 } from "@/contants";
import {
  ForgotPasswordType,
  LoginResponse,
  RefreshTokenResponse,
  UpdatePasswordType,
  UserLogin,
  UserResponse,
} from "@/@types/models/account";
import apiRequest from "@/hooks/useApiRequest";
import getJWTCookies from "@/utils/getJWTCookies";

const baseURL = `${API_VERSION_V1}/users`;
const account = {
  login: async ({
    formData,
  }: {
    formData: UserLogin;
  }): Promise<LoginResponse> => {
    return await apiRequest(`${baseURL}/login`, "POST", formData);
  },

  register: async ({ formData }: { formData: UserLogin }) => {
    return await apiRequest(`${baseURL}/signup`, "POST", formData);
  },

  logout: () => {
    return apiRequest(`${baseURL}/logout`, "POST", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    let refreshToken;
    if (process.env.NODE_ENV === "development") {
      refreshToken = localStorage.getItem("refreshToken");
    } else if (process.env.NODE_ENV === "production") {
      refreshToken = await getJWTCookies();
    }

    return apiRequest(`${baseURL}/refreshToken`, "POST", {
      refreshToken: refreshToken,
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
    return await apiRequest(`${baseURL}/updateMyPassword`, "PATCH", formData);
  },

  resetPassword: async ({ formData }: { formData: ForgotPasswordType }) => {
    return await apiRequest(`${baseURL}/forgotPassword`, "POST", formData);
  },

  createNewPassword: async ({
    formData,
  }: {
    formData: ForgotPasswordType;
  }): Promise<LoginResponse> => {
    const { token } = formData;
    return await apiRequest(
      `${baseURL}/resetPassword/${token}`,
      "PATCH",
      formData
    );
  },

  verifyOtp: async ({
    formData,
  }: {
    formData: ForgotPasswordType;
  }): Promise<LoginResponse> => {
    return await apiRequest(`${baseURL}/verify-otp`, "POST", formData);
  },

  resendOtp: async ({ formData }: { formData: ForgotPasswordType }) => {
    return await apiRequest(`${baseURL}/resendOtp`, "POST", formData);
  },

  loginByGmail: async () => {
    return await apiRequest(`${baseURL}/google`, "GET");
  },
};

export default account;
