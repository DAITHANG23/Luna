import { RestaurantBooking, RestaurantBookingResponse } from "@/@types/models";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/features/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/bookings`;
const bookings = {
  bookingRestaurant: async ({
    formData,
  }: {
    formData: RestaurantBooking;
  }): Promise<RestaurantBookingResponse> => {
    return await apiRequest(`${baseURL}`, "POST", formData);
  },
};

export default bookings;
