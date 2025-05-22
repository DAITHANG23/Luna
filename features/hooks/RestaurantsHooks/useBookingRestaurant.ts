import { ErrorResponse, RestaurantBooking } from "@/@types/models";
import apiService from "@/api/index";
import { useMutation } from "@tanstack/react-query";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";
import { TFunction } from "i18next";

const bookingRestaurant = async (formData: RestaurantBooking) => {
  return await apiService.restaurants.bookingRestaurant({ formData });
};

const useBookingRestaurant = (
  onSuccess: () => void,
  t: TFunction<"translation" | "restaurant">
) => {
  const { showError, showSuccess } = useNotification();

  return useMutation<unknown, AxiosError<ErrorResponse>, RestaurantBooking>({
    mutationFn: bookingRestaurant,
    onSuccess: () => {
      showSuccess(t("restaurant:bookingSuccessfully"));
      onSuccess();
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useBookingRestaurant;
