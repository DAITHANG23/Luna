import { ConceptsFavoriteResponse } from "@/@types/models";
import apiService from "@/api";
import { GET_CHECK_IN_CONCEPTS_KEY } from "@/contants";
import { useQuery } from "@tanstack/react-query";

const getCheckInConcepts = () => {
  return apiService.concepts.getCheckInConcepts();
};

const useGetCheckInConcepts = () => {
  const {
    data: checkInConceptsData,
    isLoading,
    refetch,
  } = useQuery<ConceptsFavoriteResponse>({
    queryFn: () => getCheckInConcepts(),
    queryKey: [GET_CHECK_IN_CONCEPTS_KEY],
  });

  return { checkInConceptsData, isLoading, refetch };
};

export default useGetCheckInConcepts;
