import { LoginResponse, UserLogin } from "@/@types/models/account";
import apiService from "@/pages/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNT_LOGIN_QUERY_KEY } from "@/pages/contants";
import { useRouter } from "next/router";

const loginAccount = async (formData: UserLogin): Promise<LoginResponse> => {
  console.log(formData);
  const response = await apiService.account.login({ formData });
  return response.data;
};
const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, mutate, error } = useMutation<LoginResponse, Error, UserLogin>({
    mutationFn: loginAccount,
    onSuccess: (res) => {
      const accessToken = res?.accessToken;
      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
      }

      queryClient.invalidateQueries({ queryKey: [ACCOUNT_LOGIN_QUERY_KEY] });
      router.push("/");
    },
  });
  return { data, mutate, error };
};

export default useLogin;
