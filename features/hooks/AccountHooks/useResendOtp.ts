import { useMutation } from "@tanstack/react-query";
import useNotification from "../useNotification";
import apiService from "@/api";
import { ErrorResponse, ForgotPasswordType } from "@/@types/models";
import { RESEND_OTP_CODE } from "@/contants";
import { AxiosError } from "axios";

const resendOtpCode = (formData: ForgotPasswordType) => {
  return apiService.account.resendOtp({ formData });
};

const useResendOtp = () => {
  const { showSuccess, showError } = useNotification();

  return useMutation<unknown, AxiosError<ErrorResponse>, ForgotPasswordType>({
    mutationFn: resendOtpCode,
    mutationKey: [RESEND_OTP_CODE],
    onSuccess: async () => {
      showSuccess("Send email successful! Please check your email!");
      localStorage.removeItem("resendOtp");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useResendOtp;
