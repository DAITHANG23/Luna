import {
  ErrorResponse,
  LoginResponse,
  UserLogin,
} from "@/@types/models/account";
import apiService from "@/pages/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNT_REGISTER_QUERY_KEY } from "@/pages/contants";
import { useRouter } from "next/router";
import useNotification from "@/hooks/useNotification";
import { AxiosError } from "axios";

const registerAccount = async (formData: UserLogin): Promise<LoginResponse> => {
  return await apiService.account.register({ formData });
};
const useRegister = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();
  const router = useRouter();
  const { mutate, error } = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    UserLogin
  >({
    mutationFn: registerAccount,
    onSuccess: (res) => {
      showSuccess("Register successful!");
      const accessToken = res?.accessToken;
      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
      }

      queryClient.invalidateQueries({ queryKey: [ACCOUNT_REGISTER_QUERY_KEY] });
      router.push("/login");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
  return { mutate, error };
};

export default useRegister;
