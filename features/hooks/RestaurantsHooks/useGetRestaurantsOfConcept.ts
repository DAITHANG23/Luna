import { AllRestaurantResponseOfConcept } from "@/@types/models";
import apiService from "@/api";
import { GET_RESTAURANTS_OF_CONCEPT_KEY } from "@/contants";
import { useQuery } from "@tanstack/react-query";

const getRestaurantsOfConcept = async (
  conceptId: string
): Promise<AllRestaurantResponseOfConcept> => {
  return await apiService.restaurants.getRestaurantsOfConcept(conceptId);
};

const useGetRestaurantsOfConcept = (conceptId: string) => {
  const {
    data: restaurantsData,
    isLoading,
    refetch,
  } = useQuery<AllRestaurantResponseOfConcept>({
    queryFn: () => getRestaurantsOfConcept(conceptId),
    queryKey: [GET_RESTAURANTS_OF_CONCEPT_KEY, conceptId],
  });

  return { restaurantsData, isLoading, refetch };
};

export default useGetRestaurantsOfConcept;
