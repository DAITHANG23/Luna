import { AllNotificationResponse } from "@/@types/models";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/features/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/notifications`;
const bookings = {
  getAllNotifications: async (): Promise<AllNotificationResponse> => {
    return await apiRequest(`${baseURL}`, "GET");
  },
};

export default bookings;
