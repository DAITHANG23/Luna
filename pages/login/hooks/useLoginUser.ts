import { LoginResponse, UserLogin } from "@/@types/models/account";
import apiService from "@/pages/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { ACCOUNT_LOGIN_QUERY_KEY } from "@/pages/contants";
import { useRouter } from "next/router";
import { userInfo, accessToken } from "@/lib/redux/authSlice";

const loginAccount = async (formData: UserLogin): Promise<LoginResponse> => {
  const response = await apiService.account.login({ formData });
  return response.data;
};
const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data, mutate, error } = useMutation<LoginResponse, Error, UserLogin>({
    mutationFn: loginAccount,
    onSuccess: (res) => {
      const accessTokenRes = res?.accessToken;

      if (accessTokenRes) {
        sessionStorage.setItem("accessToken", accessTokenRes);
      }

      dispatch(userInfo({ user: res.data.user }));

      dispatch(accessToken({ accessToken: res.accessToken }));

      queryClient.invalidateQueries({ queryKey: [ACCOUNT_LOGIN_QUERY_KEY] });

      router.push("/");
    },
  });
  return { data, mutate, error };
};

export default useLogin;
