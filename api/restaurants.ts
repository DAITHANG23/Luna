import { AllRestaurantResponseOfConcept } from "@/@types/models";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/features/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/restaurants`;
const restaurants = {
  getRestaurantsOfConcept: async (
    conceptId: string
  ): Promise<AllRestaurantResponseOfConcept> => {
    return await apiRequest(
      `${baseURL}/restaurantsOfConcept/${conceptId}`,
      "GET"
    );
  },
};

export default restaurants;
