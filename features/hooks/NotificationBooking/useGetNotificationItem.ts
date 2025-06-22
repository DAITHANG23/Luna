import { CheckNotification } from "@/@types/models";
import apiService from "@/api";
import { GET_CONCEPT_KEY } from "@/contants";
import { useQuery } from "@tanstack/react-query";

const getNotification = (id: string) => {
  return apiService.notifications.getNotification({ id });
};

const useGetNotificationItem = (id: string) => {
  const {
    data: notificationData,
    isLoading,
    refetch,
  } = useQuery<CheckNotification>({
    queryFn: () => getNotification(id),
    queryKey: [GET_CONCEPT_KEY, id],
    enabled: !!id,
  });

  return { notificationData, isLoading, refetch };
};

export default useGetNotificationItem;
