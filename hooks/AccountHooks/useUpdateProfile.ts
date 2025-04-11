import {
  ErrorResponse,
  UserLogin,
  UserResponse,
} from "@/@types/models/account";
import useNotification from "@/hooks/useNotification";
import apiService from "@/api/index";
import { GET_DATA_USER_QUERY_KEY } from "@/contants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const updateAccount = async (formData: UserLogin): Promise<UserResponse> => {
  return await apiService.account.updateUser({ formData });
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();
  return useMutation<UserResponse, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: updateAccount,
    onSuccess: () => {
      showSuccess("Update account successful!");
      queryClient.invalidateQueries({ queryKey: [GET_DATA_USER_QUERY_KEY] });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useUpdateProfile;
