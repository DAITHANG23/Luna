import { AllNotificationResponse, CheckNotification } from "@/@types/models";
import { API_VERSION_V1 } from "@/contants";
import apiRequest from "@/features/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/notifications`;
const bookings = {
  getAllNotifications: async (): Promise<AllNotificationResponse> => {
    return await apiRequest(`${baseURL}`, "GET");
  },
  checkReadNotification: async (id: string): Promise<CheckNotification> => {
    // const idNotification = JSON.stringify(id);
    return await apiRequest(`${baseURL}/checkReadNotification`, "PATCH", {
      id,
    });
  },
};

export default bookings;
