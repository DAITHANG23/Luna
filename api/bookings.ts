import { RestaurantBooking, RestaurantBookingResponse } from "@/@types/models";
import { AllResevationResponse } from "@/@types/models/booking";
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
  getAllResevation: async (): Promise<AllResevationResponse> => {
    return await apiRequest(`${baseURL}`, "GET");
  },
  deleteResevation: async ({ id }: { id: string }) => {
    return await apiRequest(`${baseURL}/${id}`, "DELETE");
  },
};

export default bookings;
