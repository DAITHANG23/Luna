/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from "@/@types/models/account";
import apiService from "@/pages/api";

// import { API_VERSION_V1 } from "@/pages/contants";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// import Router from "next/router";

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

// let isRefreshing = false;
const MAX_RETRIES = 3;
// let refreshSubscribers: ((token: string) => void)[] = [];

// const onTokenRefreshed = (newToken: string) => {
//   refreshSubscribers.forEach((callback) => callback(newToken));
//   refreshSubscribers = [];
// };

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
    const accessToken = sessionStorage.getItem("accessToken") || "";
    const originalRequest = error.config as InternalAxiosRequestConfig<any> & {
      _retry?: boolean;
      retryCount?: number;
    };
    const status = error.response?.status;
    if (error.response) {
      if (status === 401 || status === 403) {
        console.error("Unauthorized - 401: Token hết hạn hoặc không hợp lệ");

        await apiService.account.logout(accessToken);
      } else if (status === 429) {
        console.error("Too Many Requests - 429: Quá nhiều request");
        if (!originalRequest.retryCount) {
          originalRequest.retryCount = 0;
        }

        if (originalRequest.retryCount < MAX_RETRIES) {
          originalRequest.retryCount += 1;
          const delay = 2 ** originalRequest.retryCount * 2000;

          await new Promise((resolve) => setTimeout(resolve, delay));
          return axiosWrapper(originalRequest);
        }
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
    // /** 🔄 Xử lý lỗi 401 - Token hết hạn */
    // if (status === 401 && !originalRequest._retry) {
    //   if (isRefreshing) {
    //     return new Promise((resolve) => {
    //       refreshSubscribers.push((newToken) => {
    //         originalRequest.headers.Authorization = `Bearer ${newToken}`;
    //         resolve(axiosWrapper(originalRequest));
    //       });
    //     });
    //   }

    //   originalRequest._retry = true;
    //   isRefreshing = true;

    //   try {
    //     const { data } = await axiosWrapper.post(
    //       `${API_VERSION_V1}/users/refreshToken`
    //     );
    //     const newAccessToken = data.accessToken;

    //     sessionStorage.setItem("accessToken", newAccessToken);
    //     onTokenRefreshed(newAccessToken);

    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //     return axiosWrapper(originalRequest);
    //   } catch (err) {
    //     console.error("Refresh token failed:", err);
    //     sessionStorage.removeItem("accessToken");
    //     Router.replace("/login");

    //     throw err instanceof AxiosError
    //       ? {
    //           code: err.response?.status ?? 500,
    //           message:
    //             err.response?.data?.messageError || "Token refresh failed",
    //           status: err.response?.data?.status || "error",
    //         }
    //       : new Error(String(err));
    //   } finally {
    //     isRefreshing = false;
    //   }
    // }

    // /** 🕒 Xử lý lỗi 429 - Too Many Requests */
    // if (status === 429) {
    // if (!originalRequest.retryCount) {
    //   originalRequest.retryCount = 0;
    // }

    // if (originalRequest.retryCount < MAX_RETRIES) {
    //   originalRequest.retryCount += 1;
    //   const delay = 2 ** originalRequest.retryCount * 2000;

    //   await new Promise((resolve) => setTimeout(resolve, delay));
    //   return axiosWrapper(originalRequest);
    // }
    // }

    // /** 🚀 **Trả về lỗi đúng định dạng từ BE** */
    // throw error.response?.data
    //   ? {
    //       code: error.response.status,
    //       message: error.response.data.messageError || "",
    //       status: error.response.data.status || "error",
    //       isOperational: error.response.data.isOperational ?? false,
    //     }
    //   : new Error(error.message || "Unknown error");
  }
);

export default axiosWrapper;
