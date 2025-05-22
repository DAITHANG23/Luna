import {
  AllRestaurantResponseOfConcept,
  RestaurantBooking,
} from "@/@types/models";
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
  bookingRestaurant: async ({ formData }: { formData: RestaurantBooking }) => {
    return await apiRequest(`${baseURL}/bookingRestaurant`, "POST", formData);
  },
};

export default restaurants;
