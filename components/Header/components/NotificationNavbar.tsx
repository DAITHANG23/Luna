import { useAppSelector } from "@/libs/redux/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon, CheckCheckIcon } from "lucide-react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import { format } from "date-fns";
import { useRouter } from "next/router";
import useBreakPoints from "@/features/hooks/useBreakPoints";
import { useTranslation } from "react-i18next";
import useCheckReadNotification from "@/features/hooks/NotificationBooking/useCheckReadNotification";

interface NotificationNavbarProps {
  unReadNotificationsQuantities: number;
}
const NotificationNavbar = ({
  unReadNotificationsQuantities,
}: NotificationNavbarProps) => {
  const router = useRouter();
  const { t, ready } = useTranslation("notification");
  const { mutate: checkReadNotification } = useCheckReadNotification();
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications
  )?.data.data;

  const [hasMounted, setHasMounted] = useState(false);
  const { isMobileSize } = useBreakPoints();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleCheckReadNotification = (id: string) => {
    checkReadNotification(id);
  };

  if (!ready || !hasMounted) return null;

  return (
    <Menu as="div" className="relative mx-3 !max-w-2xl z-1000">
      <div>
        <MenuButton
          type="button"
          className="relative rounded-full hover:bg-primary hover:text-white dark:bg-gray-800 p-1 text-primary-text dark:text-gray-400 dark:hover:text-primary-text focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden"
        >
          <span className="absolute text-xs -top-1 left-[16px] py-[0.5] px-1 rounded-full bg-primary text-white">
            {unReadNotificationsQuantities || 0}
          </span>
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </MenuButton>
      </div>
      <MenuItems
        anchor={isMobileSize ? "bottom" : undefined}
        transition
        className="absolute right-0 z-10 mt-2 w-auto min-w-[300px] max-w-sm h-[31.25rem] overflow-auto origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in "
      >
        {allNotifications && allNotifications?.length > 0 ? (
          allNotifications.slice(0, 5).map((l) => {
            const date = new Date(l.createdAt);

            const formatted = format(date, "dd/MM/yyyy HH:mm");
            return (
              <MenuItem key={l._id}>
                <div key={l._id}>
                  <div
                    className={cn(
                      l.read && "!bg-white",
                      "relative flex gap-2 items-start p-2 bg-primary/30 cursor-pointer hover:!bg-primary/50"
                    )}
                  >
                    <CheckBadgeIcon className="text-[#16a34a] w-6 h-6 flex-shrink-0" />
                    <div
                      className="flex flex-col gap-4 text-start"
                      onClick={() => {
                        router.push(`/notifications/${l._id}`);
                      }}
                    >
                      <h2 className="text-base font-bold text-black">
                        {l.title}
                      </h2>
                      <p className="text-gray-800 text-sm">{l.message}</p>
                      <p className="text-xs">{formatted}</p>
                    </div>
                    {!l.read && (
                      <div className="absolute top-2 right-2 hover:scale-110 transition duration-200 z-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckReadNotification(l._id);
                          }}
                        >
                          <CheckCheckIcon className="text-[#16a34a] w-4 h-4 flex-shrink-0" />
                        </button>
                      </div>
                    )}
                  </div>
                  <hr className="bg-gray-500" />
                </div>
              </MenuItem>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500 text-sm h-[30rem]">
            <BellIcon className="w-8 h-8 mb-2" />
            <p>{t("noNotifications")}</p>
          </div>
        )}
        {allNotifications && allNotifications?.length > 5 && (
          <div className="w-full">
            <button
              className="w-full hover:underline text-primary font-bold text-sm"
              onClick={() => {
                router.push("/notifications");
              }}
            >
              {t("seeMore")}
            </button>
          </div>
        )}
      </MenuItems>
    </Menu>
  );
};

export default NotificationNavbar;
