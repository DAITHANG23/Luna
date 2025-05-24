import { useMutation } from "@tanstack/react-query";
import useNotification from "../useNotification";
import apiService from "@/api";
import {
  ErrorResponse,
  ForgotPasswordType,
  LoginResponse,
} from "@/@types/models";
import { CREATE_NEW_PASSWORD_QUERY_KEY, ROUTERS } from "@/contants";
import { AxiosError } from "axios";
import Router from "next/router";

const createNewPassword = (
  formData: ForgotPasswordType
): Promise<LoginResponse> => {
  return apiService.account.createNewPassword({ formData });
};

const useResetPassword = () => {
  const { showSuccess, showError } = useNotification();

  return useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    ForgotPasswordType
  >({
    mutationFn: createNewPassword,
    mutationKey: [CREATE_NEW_PASSWORD_QUERY_KEY],
    onSuccess: async () => {
      showSuccess(
        "Change password successful! Please login your account again!"
      );
      localStorage.removeItem("emailResetPassword");
      Router.push(`${ROUTERS.LOGIN.INDEX}`);
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useResetPassword;
