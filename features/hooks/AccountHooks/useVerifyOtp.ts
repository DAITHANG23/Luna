import {
  ErrorResponse,
  LoginResponse,
  UserLogin,
} from "@/@types/models/account";
import apiService from "@/api/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNT_REGISTER_QUERY_KEY } from "@/contants";
import { useRouter } from "next/router";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";

const verifyOtpRegister = async (
  formData: UserLogin
): Promise<LoginResponse> => {
  return await apiService.account.verifyOtp({ formData });
};
const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();

  const router = useRouter();
  return useMutation<LoginResponse, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: verifyOtpRegister,
    onSuccess: (res) => {
      showSuccess("Verify successful, your account is actived!");
      localStorage.removeItem("resendOtp");
      const accessToken = res?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_REGISTER_QUERY_KEY] });
      router.push("/login");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useVerifyOtp;
