import {
  ErrorResponse,
  LoginResponse,
  UserLogin,
} from "@/@types/models/account";
import apiService from "@/api/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { ACCOUNT_LOGIN_QUERY_KEY, GET_DATA_USER_QUERY_KEY } from "@/contants";
import { useRouter } from "next/router";
import { userInfo, accessToken, authentication } from "@/lib/redux/authSlice";
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
  return useMutation<LoginResponse, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: loginAccount,
    mutationKey: [ACCOUNT_LOGIN_QUERY_KEY],
    onSuccess: async (res: LoginResponse) => {
      showSuccess("Login successful!");
      const accessTokenRes = res?.accessToken;
      const refreshToken = res?.refreshToken;

      if (accessTokenRes) {
        sessionStorage.setItem("accessToken", accessTokenRes);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      dispatch(userInfo({ user: res.data.user }));
      dispatch(authentication({ isAuthenticated: true }));
      dispatch(accessToken({ accessToken: res.accessToken }));

      queryClient.invalidateQueries({ queryKey: [GET_DATA_USER_QUERY_KEY] });
      router.push("/");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useLogin;
