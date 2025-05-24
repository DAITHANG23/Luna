import {
  AllRestaurantResponseOfConcept,
  RestaurantSearchParams,
} from "@/@types/models";
import apiService from "@/api";
import { GET_RESTAURANTS_OF_CONCEPT_KEY } from "@/contants";
import { cleanEmptyFields } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const getRestaurantsOfConcept = async (
  conceptId: string,
  params: RestaurantSearchParams
): Promise<AllRestaurantResponseOfConcept> => {
  const paramsConfig = cleanEmptyFields(params) as RestaurantSearchParams;
  return await apiService.restaurants.getRestaurantsOfConcept(
    conceptId,
    paramsConfig
  );
};

const useGetRestaurantsOfConcept = (
  conceptId: string,
  params: RestaurantSearchParams
) => {
  const {
    data: restaurantsData,
    isLoading,
    refetch,
  } = useQuery<AllRestaurantResponseOfConcept>({
    queryFn: () => getRestaurantsOfConcept(conceptId, params),
    queryKey: [GET_RESTAURANTS_OF_CONCEPT_KEY, conceptId, params],
  });

  return { restaurantsData, isLoading, refetch };
};

export default useGetRestaurantsOfConcept;
