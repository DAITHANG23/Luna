import { UserResponse } from "@/@types/models/account";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import apiService from "@/api/index";
import { GET_DATA_USER_QUERY_KEY } from "@/contants";
import { useQuery } from "@tanstack/react-query";

const getDataUser = async (): Promise<UserResponse> => {
  return await apiService.account.getDataUser();
};

const useGetDataUser = () => {
  const accessTokenState = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<UserResponse>({
    queryFn: getDataUser,
    queryKey: [GET_DATA_USER_QUERY_KEY],
    staleTime: 0,
    refetchOnWindowFocus: true,
    enabled: !!accessTokenState,
  });

  return { userData, isLoading, refetch };
};

export default useGetDataUser;
