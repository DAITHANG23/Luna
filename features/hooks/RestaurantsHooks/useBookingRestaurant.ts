import {
  ErrorResponse,
  RestaurantBooking,
  RestaurantBookingResponse,
} from "@/@types/models";
import apiService from "@/api/index";
import { useMutation } from "@tanstack/react-query";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { useRouter } from "next/router";

const bookingRestaurant = async (
  formData: RestaurantBooking
): Promise<RestaurantBookingResponse> => {
  return await apiService.bookings.bookingRestaurant({ formData });
};

const useBookingRestaurant = (
  onSuccess: () => void,
  t: TFunction<"translation" | "restaurant">
) => {
  const { showError, showSuccess } = useNotification();
  const router = useRouter();
  return useMutation<
    RestaurantBookingResponse,
    AxiosError<ErrorResponse>,
    RestaurantBooking
  >({
    mutationFn: bookingRestaurant,
    onSuccess: () => {
      showSuccess(t("restaurant:bookingSuccessfully"));
      onSuccess();
      router.push("/reservation-history");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useBookingRestaurant;
