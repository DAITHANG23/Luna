import { useAppSelector } from "@/libs/redux/hooks";
import { cn } from "@/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { CheckCheckIcon } from "lucide-react";
import { useRouter } from "next/router";

interface NotificationMainProps {
  children: React.ReactNode;
}

const NotificationMain = ({ children }: NotificationMainProps) => {
  const router = useRouter();
  const allNotifications = useAppSelector(
    (state) => state.masterData.allNotifications
  )?.data.data;
  return (
    <div className="mt-[7.25rem] w-[90%] xl:w-[70%] h-[40rem] mx-auto bg-white dark:bg-gray-900 rounded-lg my-4 shadow-lg py-4 pr-4">
      <div className="flex lg:flex-row flex-col gap-4 h-full">
        <div className="w-full md:w-[30%] h-full overflow-auto">
          <div>
            {allNotifications?.map((item) => {
              const date = new Date(item.createdAt);

              const formatted = format(date, "dd/MM/yyyy HH:mm");
              return (
                <div key={item._id}>
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
                      }}
                    >
                      <h2 className="text-base font-bold text-black">
                        {item.title}
                      </h2>
                      <p className="text-gray-800 text-sm">{item.message}</p>
                      <p className="text-xs">{formatted}</p>
                    </div>
                    {!item.read && (
                      <div className="absolute top-2 right-2 hover:scale-110 transition duration-200 z-100">
                        <button type="button">
                          <CheckCheckIcon className="text-[#16a34a] w-4 h-4 flex-shrink-0" />
                        </button>
                      </div>
                    )}
                  </div>
                  <hr className="bg-gray-500 !my-1" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-[70%]">{children}</div>
      </div>
    </div>
  );
};

export default NotificationMain;
