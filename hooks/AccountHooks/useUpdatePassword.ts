import {
  ErrorResponse,
  LoginResponse,
  UpdatePasswordType,
} from "@/@types/models/account";
import useNotification from "@/hooks/useNotification";
import { logout } from "@/lib/redux/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import apiService from "@/api/index";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const updatePasswordAccount = async (
  formData: UpdatePasswordType
): Promise<LoginResponse> => {
  return await apiService.account.updatePassword({ formData });
};

const useUpdatePassword = () => {
  const { showError, showSuccess } = useNotification();
  const dispatch = useAppDispatch();
  return useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    UpdatePasswordType
  >({
    mutationFn: updatePasswordAccount,
    onSuccess: () => {
      showSuccess("Update Password Account successful! You must login again!");
      dispatch(logout());
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useUpdatePassword;
