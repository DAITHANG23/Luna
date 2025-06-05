import { NotificationModel } from "@/@types/models";
import useCheckReadNotification from "@/features/hooks/NotificationBooking/useCheckReadNotification";
import { cn } from "@/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import {
  CheckCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  BellDotIcon,
  Trash2Icon,
  StarIcon,
  CircleDashedIcon,
} from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";

interface NotificationDetailNavbarProps {
  item: NotificationModel;
  unReadNotificationsQuantities: number;
  handleDeleteNotification: (id: string) => void;
}
const NotificationDetailNavbar = ({
  item,
  unReadNotificationsQuantities,
  handleDeleteNotification,
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

  const NotificationIcon = useMemo(() => {
    switch (item?.type) {
      case "bookingReminder":
        return <BellDotIcon className="text-[#CA8A04] w-6 h-6 flex-shrink-0" />;
      case "bookingConfirmed":
        return (
          <CheckBadgeIcon className="text-[#16a34a] w-6 h-6 flex-shrink-0" />
        );
      case "bookingCanceled":
        return (
          <TriangleAlertIcon className="text-primary w-6 h-6 flex-shrink-0" />
        );
      case "bookingCompleted":
        return <StarIcon className="text-purple-800 w-6 h-6 flex-shrink-0" />;
      case "bookingInProgress":
        return (
          <CircleDashedIcon className="text-[#2563EB] w-6 h-6 flex-shrink-0" />
        );
      default:
        return <InfoIcon className="text-[#2563EB] w-6 h-6 flex-shrink-0" />;
    }
  }, [item]);
  return (
    <div
      className={cn(
        item.read && "!bg-white",
        item.type === "bookingCreated" || item.type === "bookingInProgress"
          ? "bg-[#BFDBFE]/30 hover:bg-[#BFDBFE]/50"
          : item.type === "bookingConfirmed"
            ? "bg-[#BBF7D0]/30 hover:bg-[#BBF7D0]/50"
            : item.type === "bookingCompleted"
              ? "bg-purple-300 hover:bg-purple-400"
              : item.type === "bookingCanceled"
                ? "bg-primary/30 hover:bg-primary/50"
                : "bg-[#FEF08A]/30 hover:bg-[#FEF08A]/50",
        "relative flex gap-2 items-start p-2 cursor-pointer rounded-lg dark:!bg-gray-900"
      )}
    >
      {NotificationIcon}
      <div
        className="flex flex-col gap-4 text-start"
        onClick={() => {
          router.push(`/notifications/${item._id}`);
          handleCheckReadNotification(item._id);
        }}
      >
        <h2 className="text-base font-bold text-primary-text">{item.title}</h2>
        <p className="text-gray-800 text-sm text-primary-text">
          {item.message}
        </p>
        <p className="text-xs text-primary-text">{formatted}</p>
      </div>
      {!item.read ? (
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
      ) : (
        <div className="flex justify-end items-end text-end">
          <button
            className="p-1 hover:bg-error/20 hover:rounded-[4px] hover:scale-105 transition duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNotification(item._id);
            }}
          >
            <Trash2Icon className="text-error w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDetailNavbar;
