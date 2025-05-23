import { AllRestaurantResponseOfConcept } from "@/@types/models";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/features/hooks/useApiRequest";
import { buildQueryString } from "@/utils";

const baseURL = `${API_VERSION_V1}/restaurants`;
const restaurants = {
  getRestaurantsOfConcept: async (
    conceptId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any
  ): Promise<AllRestaurantResponseOfConcept> => {
    const query = buildQueryString(params);
    return await apiRequest(
      `${baseURL}/restaurantsOfConcept/${conceptId}${query}`,
      "GET"
    );
  },
};

export default restaurants;
