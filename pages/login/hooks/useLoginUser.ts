import {
  ErrorResponse,
  LoginResponse,
  UserLogin,
} from "@/@types/models/account";
import apiService from "@/pages/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { ACCOUNT_LOGIN_QUERY_KEY } from "@/pages/contants";
import { useRouter } from "next/router";
import { userInfo, accessToken } from "@/lib/redux/authSlice";
import useNotification from "@/hooks/useNotification";
import { AxiosError } from "axios";

const loginAccount = async (formData: UserLogin): Promise<LoginResponse> => {
  return await apiService.account.login({ formData });
};
const useLogin = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data, mutate, error } = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    UserLogin
  >({
    mutationFn: loginAccount,
    mutationKey: [ACCOUNT_LOGIN_QUERY_KEY],
    onSuccess: (res) => {
      showSuccess("Login successfully!");
      const accessTokenRes = res?.accessToken;

      if (accessTokenRes) {
        sessionStorage.setItem("accessToken", accessTokenRes);
      }

      dispatch(userInfo({ user: res.data.user }));

      dispatch(accessToken({ accessToken: res.accessToken }));

      queryClient.invalidateQueries({ queryKey: [ACCOUNT_LOGIN_QUERY_KEY] });

      router.push("/");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
  return { data, mutate, error };
};

export default useLogin;
