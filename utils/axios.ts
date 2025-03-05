/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from "@/@types/models/account";
import apiService from "@/pages/api";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}
let token: string | null = null;

const axiosWrapper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const MAX_RETRIES = 3;

axiosWrapper.interceptors.request.use(
  async (
    config: CustomAxiosRequestConfig
  ): Promise<CustomAxiosRequestConfig> => {
    if (!token) {
      token = sessionStorage.getItem("accessToken");
    }
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  }
);

axiosWrapper.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig<any> & {
      _retry?: boolean;
      retryCount?: number;
    };
    const status = error.response?.status;
    if (error.response) {
      if (
        (status === 401 || status === 403) &&
        error.response?.data?.error?.name === "TokenExpiredError" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const data = await apiService.account.refreshToken();
          sessionStorage.setItem("accessToken", data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosWrapper(originalRequest);
        } catch (err) {
          console.error("Refresh token expired. Logging out.", err);
          sessionStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          await apiService.account.logout();
        }
      } else if (status === 429) {
        console.error("Too Many Requests - 429: Quá nhiều request");
        if (!originalRequest.retryCount) {
          originalRequest.retryCount = 0;
        }

        if (originalRequest.retryCount < MAX_RETRIES) {
          originalRequest.retryCount += 1;
          const retryAfter = error.response.headers["retry-after"];
          const waitTime = retryAfter
            ? Number(retryAfter) * 1000
            : 2 ** originalRequest.retryCount * 2000;

          await new Promise((resolve) => setTimeout(resolve, waitTime));
          return axiosWrapper(originalRequest);
        }
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosWrapper;
