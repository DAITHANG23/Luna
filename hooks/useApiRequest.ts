import axiosWrapper from "@/utils/axios";
import { AxiosError, AxiosRequestConfig } from "axios";

const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axiosWrapper({
      url,
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
      ...config,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      throw axiosError.response.data;
    }

    throw new Error(axiosError.message);
  }
};

export default apiRequest;
