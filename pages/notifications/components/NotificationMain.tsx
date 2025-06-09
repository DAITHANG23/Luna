import apiService from "@/api";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import {
  NotificationDetailNavbar,
  WrapperFilter,
} from "@/libs/shared/components";
import { BellIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
interface NotificationMainProps {
  children: React.ReactNode;
}

const NotificationMain = ({ children }: NotificationMainProps) => {
  const router = useRouter();
  const { t, ready } = useTranslation("notification");
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications
  )?.data.data;
  const unReadNotificationsQuantities = useAppSelector(
    (state) => state.masterData.unReadNotificationsQuantity
  );
  const dispatch = useAppDispatch();
  const handleDeleteNotification = useCallback(
    async (id: string) => {
      await apiService.notifications.deleteNotification({ id });

      dispatch(getAllNotifications());
      router.push("/notifications");
    },
    [dispatch, router]
  );

  const notificationsNavbar = useMemo(() => {
    return (
      <div>
        {allNotifications && allNotifications?.length > 0 ? (
          allNotifications?.map((item) => {
            return (
              <div key={item._id}>
                <NotificationDetailNavbar
                  item={item}
                  unReadNotificationsQuantities={unReadNotificationsQuantities}
                  handleDeleteNotification={handleDeleteNotification}
                />
                <hr className="text-gray-500 !my-1" />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500 text-sm h-[30rem]">
            <BellIcon className="w-8 h-8 mb-2" />
            <p>{t("noNotifications")}</p>
          </div>
        )}
      </div>
    );
  }, [
    allNotifications,
    unReadNotificationsQuantities,
    handleDeleteNotification,
    t,
  ]);
  if (!ready) return null;
  return (
    <div className="mt-[5rem] sm:mt-[7.5rem] w-[90%] xl:w-[70%] h-auto lg:h-[40rem] mx-auto bg-white dark:bg-gray-900 rounded-lg my-4 shadow-lg p-4 lg:py-4 lg:pr-4">
      <div className="flex lg:flex-row flex-col gap-4 h-full">
        <div className="w-full lg:w-[30%] h-full overflow-auto hidden lg:block">
          {notificationsNavbar}
        </div>
        <div className="block lg:hidden">
          <WrapperFilter
            classNameMenu={"!h-[38rem] overflow-auto"}
            isHandleCloseMenu
          >
            {notificationsNavbar}
          </WrapperFilter>
        </div>

        <div className="w-full lg:w-[70%]">{children}</div>
      </div>
    </div>
  );
};

export default NotificationMain;
