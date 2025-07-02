import { NotificationModel } from "@/@types/models";
import apiService from "@/api";
import useCheckReadNotification from "@/features/hooks/NotificationBooking/useCheckReadNotification";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import { WrapperFilter } from "@/libs/shared/components";
import NotificationDetailNavbar from "@/libs/shared/components/NotificationDetailNavbar";
import { BellIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
interface NotificationMainProps {
  children: React.ReactNode;
}

const NotificationMain = ({ children }: NotificationMainProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { t, ready } = useTranslation("notification");
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications
  )?.data.data;

  const unReadNotificationsQuantities = useAppSelector(
    (state) => state.masterData.unReadNotificationsQuantity
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  useEffect(() => {
    if (id) setSelectedId(id as string);
  }, [id]);
  const handleClick = (id: string) => {
    setSelectedId(id);
  };
  const dispatch = useAppDispatch();

  const { mutate: checkReadNotification } = useCheckReadNotification();

  const handleAfterDeleteNotification = useCallback(
    (id: string) => {
      const index = allNotifications?.findIndex(
        (notification: NotificationModel) => notification._id === id
      );
      const newList = allNotifications?.filter((n) => n._id !== id);

      if (selectedId === id) {
        const nextIdNotifcation = newList?.[index!]?._id;
        setSelectedId(nextIdNotifcation || null);

        router.push(
          nextIdNotifcation
            ? `/notifications/${nextIdNotifcation}`
            : "/notifications"
        );
        checkReadNotification(nextIdNotifcation || "");
      }
    },
    [allNotifications, selectedId, router, checkReadNotification]
  );

  const handleDeleteNotification = useCallback(
    async (id: string) => {
      try {
        await apiService.notifications.deleteNotification({ id });
        dispatch(getAllNotifications());

        handleAfterDeleteNotification(id);
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
    },
    [dispatch, handleAfterDeleteNotification]
  );

  const notificationsNavbar = useMemo(() => {
    return (
      <div>
        {allNotifications && allNotifications?.length > 0 ? (
          allNotifications?.map((item: NotificationModel) => {
            return (
              <div key={item._id} onClick={() => handleClick(item._id)}>
                <NotificationDetailNavbar
                  item={item}
                  unReadNotificationsQuantities={unReadNotificationsQuantities}
                  handleDeleteNotification={handleDeleteNotification}
                  isSelected={selectedId === item._id}
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
    selectedId,
    t,
  ]);
  if (!ready) return null;
  return (
    <div className="mt-[5rem] sm:mt-[7.5rem] w-[90%] 2xl:w-[70%] h-auto lg:h-[40rem] mx-auto bg-white dark:bg-gray-900 rounded-lg my-4 shadow-lg p-4 lg:py-4 lg:pr-4">
      <div className="flex lg:flex-row flex-col gap-4 h-full">
        <div className="w-full lg:w-[30%] h-full overflow-auto hidden lg:block">
          {notificationsNavbar}
        </div>
        <div className="block lg:hidden">
          <WrapperFilter
            classNameMenu={"!h-[38rem] overflow-auto scrollbar-hide"}
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
