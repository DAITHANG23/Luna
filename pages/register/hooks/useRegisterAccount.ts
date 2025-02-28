import { LoginResponse, UserLogin } from "@/@types/models/account";
import apiService from "@/pages/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNT_REGISTER_QUERY_KEY } from "@/pages/contants";
import { useRouter } from "next/router";

const registerAccount = async (formData: UserLogin): Promise<LoginResponse> => {
  const response = await apiService.account.register({ formData });
  return response.data;
};
const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, error } = useMutation<LoginResponse, Error, UserLogin>({
    mutationFn: registerAccount,
    onSuccess: (res) => {
      const accessToken = res?.accessToken;
      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
      }

      queryClient.invalidateQueries({ queryKey: [ACCOUNT_REGISTER_QUERY_KEY] });
      router.push("/login");
    },
  });
  return { mutate, error };
};

export default useRegister;
