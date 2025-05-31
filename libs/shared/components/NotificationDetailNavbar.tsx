import { NotificationModel } from "@/@types/models";
import useCheckReadNotification from "@/features/hooks/NotificationBooking/useCheckReadNotification";
import { cn } from "@/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { CheckCheckIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface NotificationDetailNavbarProps {
  item: NotificationModel;
  unReadNotificationsQuantities: number;
}
const NotificationDetailNavbar = ({
  item,
  unReadNotificationsQuantities,
}: NotificationDetailNavbarProps) => {
  const router = useRouter();
  const date = new Date(item.createdAt);

  const formatted = format(date, "dd/MM/yyyy HH:mm");
  const { mutate: checkReadNotification } = useCheckReadNotification();
  const handleCheckReadNotification = useCallback(
    (id: string) => {
      if (unReadNotificationsQuantities > 0) checkReadNotification(id);
    },
    [checkReadNotification, unReadNotificationsQuantities]
  );
  return (
    <div
      className={cn(
        item.read && "!bg-white",
        "relative flex gap-2 items-start p-2 bg-primary/30 cursor-pointer hover:!bg-primary/50 rounded-lg"
      )}
    >
      <CheckBadgeIcon className="text-[#16a34a] w-6 h-6 flex-shrink-0" />
      <div
        className="flex flex-col gap-4 text-start"
        onClick={() => {
          router.push(`/notifications/${item._id}`);
          handleCheckReadNotification(item._id);
        }}
      >
        <h2 className="text-base font-bold text-black">{item.title}</h2>
        <p className="text-gray-800 text-sm">{item.message}</p>
        <p className="text-xs">{formatted}</p>
      </div>
      {!item.read && (
        <div className="absolute top-2 right-2 hover:scale-110 transition duration-200 z-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCheckReadNotification(item._id);
            }}
          >
            <CheckCheckIcon className="text-[#16a34a] w-4 h-4 flex-shrink-0" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDetailNavbar;
