import { UserResponse } from "@/@types/models/account";
import { userInfo } from "@/lib/redux/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import apiService from "@/api/index";
import { GET_DATA_USER_QUERY_KEY } from "@/contants";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const useGetDataUser = () => {
  const dispatch = useAppDispatch();
  const accessTokenState = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const { data: userData, isLoading } = useQuery<UserResponse>({
    queryFn: apiService.account.getDataUser,
    queryKey: [GET_DATA_USER_QUERY_KEY],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    enabled: !!accessTokenState,
  });

  useEffect(() => {
    if (userData) {
      dispatch(userInfo({ user: userData.data.data }));
    }
  }, [dispatch, userData]);

  return { userData, isLoading };
};

export default useGetDataUser;
