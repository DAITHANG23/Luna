import { ErrorResponse, UserLogin } from "@/@types/models/account";
import apiService from "@/api/index";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";

const registerAccount = async (formData: UserLogin) => {
  return await apiService.account.register({ formData });
};
const useRegister = () => {
  const { showError, showSuccess } = useNotification();

  const router = useRouter();
  return useMutation<unknown, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: registerAccount,
    onSuccess: () => {
      showSuccess("OTP is sent, please check your email!");

      router.push("/verify-otp");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useRegister;
