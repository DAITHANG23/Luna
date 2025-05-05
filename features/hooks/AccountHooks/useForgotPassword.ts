import { useMutation } from "@tanstack/react-query";
import useNotification from "../useNotification";
import apiService from "@/api";
import { ErrorResponse, ForgotPasswordType } from "@/@types/models/account";
import { FORGOT_PASSWORD_QUERY_KEY } from "@/contants";
import { AxiosError } from "axios";

const forgotPassword = (formData: ForgotPasswordType) => {
  return apiService.account.resetPassword({ formData });
};

const useForgotPassword = () => {
  const { showSuccess, showError } = useNotification();

  return useMutation<unknown, AxiosError<ErrorResponse>, ForgotPasswordType>({
    mutationFn: forgotPassword,
    mutationKey: [FORGOT_PASSWORD_QUERY_KEY],
    onSuccess: async () => {
      showSuccess("Send email successful! Please check your email!");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useForgotPassword;
