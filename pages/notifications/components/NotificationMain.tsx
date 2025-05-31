import { useAppSelector } from "@/libs/redux/hooks";
import NotificationDetailNavbar from "@/libs/shared/components/NotificationDetailNavbar";
import WrapperFilter from "@/libs/shared/components/WrapperFilter";
import { useMemo } from "react";
interface NotificationMainProps {
  children: React.ReactNode;
}

const NotificationMain = ({ children }: NotificationMainProps) => {
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications
  )?.data.data;
  const unReadNotificationsQuantities = useAppSelector(
    (state) => state.masterData.unReadNotificationsQuantity
  );

  const notificationsNavbar = useMemo(() => {
    return (
      <div>
        {allNotifications?.map((item) => {
          return (
            <div key={item._id}>
              <NotificationDetailNavbar
                item={item}
                unReadNotificationsQuantities={unReadNotificationsQuantities}
              />
              <hr className="text-gray-500 !my-1" />
            </div>
          );
        })}
      </div>
    );
  }, [allNotifications, unReadNotificationsQuantities]);
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
