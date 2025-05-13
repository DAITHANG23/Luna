import { ErrorResponse, LoginResponse, UserLogin } from "@/@types/models";
import apiService from "@/api/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/libs/redux/store";
import { ACCOUNT_LOGIN_QUERY_KEY, GET_DATA_USER_QUERY_KEY } from "@/contants";
import { useRouter } from "next/router";
import { accessToken, authentication } from "@/libs/redux/authSlice";
import useNotification from "@/features/hooks/useNotification";
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
        localStorage.setItem("accessToken", accessTokenRes);
      }

      // if (refreshToken && process.env.NODE_ENV === "development") {
      //   localStorage.setItem("refreshToken", refreshToken);
      // }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

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
