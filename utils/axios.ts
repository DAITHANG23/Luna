/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_VERSION_V1 } from "@/pages/contants";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import get from "lodash/get";
import Router from "next/router";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}
let token: string | null = null;

const axiosWrapper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;

const MAX_RETRIES = 3;

let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

axiosWrapper.interceptors.request.use(
  async (
    config: CustomAxiosRequestConfig
  ): Promise<CustomAxiosRequestConfig> => {
    if (!token) {
      token = sessionStorage.getItem("accessToken");
    }

    config.headers.Authorization =
      config.headers.Authorization || (token ? `Bearer ${token}` : "");
    return config;
  }
);

axiosWrapper.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig<any> & {
      _retry?: boolean;
      retryCount?: number;
    };
    const status = error.response?.status;

    /** 🔄 Xử lý lỗi 401 - Token hết hạn */
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu refresh đang diễn ra, đợi token mới
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosWrapper(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosWrapper.post(
          `${API_VERSION_V1}/users/refreshToken`
        );
        const newAccessToken = data.accessToken;

        sessionStorage.setItem("accessToken", newAccessToken);
        onTokenRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosWrapper(originalRequest);
      } catch (err: any) {
        console.error(
          "Refresh token failed:",
          err.response?.data || err.message
        );
        const status = err.response?.status;

        if (status === 403 || status === 401) {
          sessionStorage.removeItem("accessToken");
          Router.replace("/login");
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    /** 🕒 Xử lý lỗi 429 - Too Many Requests (Rate limit) */
    if (status === 429) {
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

    return Promise.reject(get(error, "response", {}));
  }
);

export default axiosWrapper;
