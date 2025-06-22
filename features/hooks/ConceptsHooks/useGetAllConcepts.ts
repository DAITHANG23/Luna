/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllConceptsResponse } from "@/@types/models";
import apiService from "@/api";
import { GET_ALL_CONCEPTS_QUERY_KEY } from "@/contants";
import { cleanEmptyFields } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const getAllConcepts = async (params: any): Promise<AllConceptsResponse> => {
  const paramsConfig = cleanEmptyFields(params);

  return await apiService.masterData.getAllConcepts(paramsConfig);
};

const useGetAllConcepts = (params: any) => {
  const {
    data: conceptsData,
    isLoading,
    refetch,
  } = useQuery<AllConceptsResponse>({
    queryFn: () => getAllConcepts(params),
    queryKey: [GET_ALL_CONCEPTS_QUERY_KEY, params],
  });

  return { conceptsData, isLoading, refetch };
};

export default useGetAllConcepts;
