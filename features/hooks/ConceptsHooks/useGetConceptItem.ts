import { ConceptResponse } from "@/@types/models";
import apiService from "@/api";
import { GET_CONCEPT_KEY } from "@/contants";
import { useQuery } from "@tanstack/react-query";

const getConcept = (id: string) => {
  return apiService.concepts.getConcept({ id });
};

const useGetConceptItem = (id: string) => {
  const {
    data: conceptData,
    isLoading,
    refetch,
  } = useQuery<ConceptResponse>({
    queryFn: () => getConcept(id),
    queryKey: [GET_CONCEPT_KEY, id],
    enabled: !!id,
  });

  return { conceptData, isLoading, refetch };
};

export default useGetConceptItem;
