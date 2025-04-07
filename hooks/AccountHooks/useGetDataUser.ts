import { UserResponse } from "@/@types/models/account";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import apiService from "@/api/index";
import { GET_DATA_USER_QUERY_KEY } from "@/contants";
import { useQuery } from "@tanstack/react-query";

const useGetDataUser = () => {
  const accessTokenState = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const { data: userData, isLoading } = useQuery<UserResponse>({
    queryFn: apiService.account.getDataUser,
    queryKey: [GET_DATA_USER_QUERY_KEY, accessTokenState],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    enabled: !!accessTokenState,
  });

  return { userData, isLoading };
};

export default useGetDataUser;
