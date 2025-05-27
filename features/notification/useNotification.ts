import { useEffect, useState } from "react";
import socket from "./socket";
import { RestaurantBooking } from "@/@types/models";

export function useNotification() {
  const [notifications, setNotifications] = useState<RestaurantBooking[]>([]);

  useEffect(() => {
    socket.on("bookingCreated", (data: RestaurantBooking) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("bookingCreated");
    };
  }, []);

  return notifications;
}
