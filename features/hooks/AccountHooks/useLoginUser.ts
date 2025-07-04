import { ErrorResponse, LoginResponse, UserLogin } from "@/@types/models";
import apiService from "@/api/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNT_LOGIN_QUERY_KEY, GET_DATA_USER_QUERY_KEY } from "@/contants";
import { useRouter } from "next/router";
import { accessToken, authentication } from "@/libs/redux/authSlice";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import cookie from "@/utils/cookies";

const loginAccount = async (formData: UserLogin): Promise<LoginResponse> => {
  return await apiService.account.login({ formData });
};
const useLogin = () => {
  const queryClient = useQueryClient();

  const { showSuccess, showError } = useNotification();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation<LoginResponse, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: loginAccount,
    mutationKey: [ACCOUNT_LOGIN_QUERY_KEY],
    onSuccess: async (res: LoginResponse) => {
      showSuccess("Login successful!");
      let accessTokenCookie;

      if (process.env.NODE_ENV === "development") {
        accessTokenCookie = res.accessToken;
        const refreshTokenCookie = res.refreshToken;
        localStorage.setItem("refreshToken", refreshTokenCookie as string);
      } else {
        accessTokenCookie = cookie.getAccessToken();
      }

      localStorage.setItem("accessToken", accessTokenCookie as string);

      dispatch(accessToken({ accessToken: accessTokenCookie as string }));
      dispatch(getAllNotifications());
      dispatch(authentication({ isAuthenticated: true }));
      queryClient.invalidateQueries({ queryKey: [GET_DATA_USER_QUERY_KEY] });
      router.push("/");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useLogin;
