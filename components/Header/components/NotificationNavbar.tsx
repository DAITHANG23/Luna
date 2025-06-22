import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useBreakPoints from "@/features/hooks/useBreakPoints";
import { useTranslation } from "react-i18next";
import apiService from "@/api";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import NotificationDetailNavbar from "@/libs/shared/components/NotificationDetailNavbar";

interface NotificationNavbarProps {
  unReadNotificationsQuantities: number;
}
const NotificationNavbar = ({
  unReadNotificationsQuantities,
}: NotificationNavbarProps) => {
  const router = useRouter();
  const { t, ready } = useTranslation("notification");
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications
  )?.data.data;
  const [hasMounted, setHasMounted] = useState(false);

  const { isMobileSize } = useBreakPoints();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const dispatch = useAppDispatch();
  const handleDeleteNotification = useCallback(
    async (id: string) => {
      await apiService.notifications.deleteNotification({ id });

      dispatch(getAllNotifications());
    },
    [dispatch]
  );

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
        className="absolute right-0 z-10 mt-2 w-auto min-w-[300px] max-w-sm h-[31.25rem] overflow-auto origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {allNotifications && allNotifications?.length > 0 ? (
          allNotifications.slice(0, 5).map((item) => {
            return (
              <MenuItem key={item._id}>
                <div key={item._id}>
                  <NotificationDetailNavbar
                    item={item}
                    unReadNotificationsQuantities={
                      unReadNotificationsQuantities
                    }
                    handleDeleteNotification={handleDeleteNotification}
                  />
                  <hr className="text-gray-500 my-1" />
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
          <MenuItem>
            <button
              className="w-full hover:underline text-primary font-bold text-sm"
              onClick={() => {
                router.push("/notifications");
              }}
            >
              {t("seeMore")}
            </button>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
};

export default NotificationNavbar;
