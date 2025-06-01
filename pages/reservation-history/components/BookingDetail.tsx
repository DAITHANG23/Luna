import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import { BookingModel } from "@/@types/models/booking";
import { CONCEPTS_ROUTES, GET_ALL_RESEVATIONS_KEY, ROUTERS } from "@/contants";
import { cn } from "@/utils";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import apiService from "@/api";
import ModalNotification from "@/libs/shared/components/ModalNotification";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
interface BookingDetailProps {
  item: BookingModel;
}

const STATUS_CONFIRMED = [
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED_BY_USER",
  "CANCELLED_BY_ADMIN",
  "NO_SHOW",
];
const BookingDetail = ({ item }: BookingDetailProps) => {
  const { t, ready } = useTranslation("booking");
  const router = useRouter();
  const concept = useMemo(() => {
    return CONCEPTS_ROUTES.find(
      (c) => c.name === item?.restaurant?.concept?.name
    );
  }, [item]);
  const queryClient = useQueryClient();
  const [isOpenCanceledModal, setIsOpenCanceledModal] = useState(false);

  const openCanceledModal = () => {
    setIsOpenCanceledModal(!isOpenCanceledModal);
  };

  const handleCanceledReservation = async () => {
    await apiService.bookings.deleteResevation({ id: item?._id });
    queryClient.invalidateQueries({ queryKey: [GET_ALL_RESEVATIONS_KEY] });
    setIsOpenCanceledModal(false);
  };

  const formatted = dayjs(item?.timeOfBooking).format("DD/MM/YYYY");
  if (!ready) return null;
  return (
    <>
      {isOpenCanceledModal && (
        <ModalNotification
          title={t("modal.delete.title")}
          content={t("modal.delete.content")}
          icon={
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="size-6 text-red-600"
            />
          }
          open={isOpenCanceledModal}
          setOpen={setIsOpenCanceledModal}
          labelButton={t("modal.delete.labelButton")}
          type="delete"
          action={
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-primary/80 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 sm:ml-3 sm:w-auto"
              onClick={handleCanceledReservation}
            >
              {t("modal.delete.button")}
            </button>
          }
        />
      )}
      <div className="flex flex-col gap-5 mb-5 justify-between p-5 text-center bg-white dark:bg-gray-800 shadow-xl rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5">
        <div
          className="flex justify-between"
          onClick={() => {
            router.push(`${ROUTERS.BOOKING.INDEX}/${item?._id}`);
          }}
        >
          <div className="flex gap-4 justify-center items-center ">
            <Image
              src={concept?.logo || "/favicon.ico"}
              alt="logo"
              width={concept?.width}
              height={concept?.height}
            />
            <p className="text-primary-text font-bold">
              {item?.restaurant?.name}
            </p>
          </div>

          <p
            className={cn(
              item?.status === "PENDING" || item?.status === "IN_PROGRESS"
                ? "bg-[#BFDBFE]/30 hover:bg-[#BFDBFE]/50 text-[#2563EB]"
                : item?.status === "CONFIRMED" || item?.status === "COMPLETED"
                  ? "bg-[#BBF7D0]/30 hover:bg-[#BBF7D0]/50 text-[#16a34a]"
                  : item?.status === "CANCELLED_BY_ADMIN" ||
                      item?.status === "CANCELLED_BY_USER"
                    ? "bg-primary/30 hover:bg-primary/50 text-primary"
                    : "bg-[#FEF08A]/30 hover:bg-[#FEF08A]/50 text-[#CA8A04]",
              "text-xs font-semibold py-1 px-2.5 text-center h-6 rounded-lg"
            )}
          >
            {item?.status}
          </p>
        </div>
        <div
          className="flex gap-20 text-primary-text"
          onClick={() => {
            router.push(`${ROUTERS.BOOKING.INDEX}/${item?._id}`);
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <MailIcon className="w-4 h-4 text-primary" />
              {item?.email}
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-primary" /> {item?.numberPhone}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-primary" /> {formatted}
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-primary" /> {item?.timeSlot}
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-primary" />
              {item?.peopleQuantity}
            </div>
          </div>
        </div>

        {item?.notes && (
          <div
            className="text-start bg-gray-200 dark:bg-gray-400 text-black p-4 rounded"
            onClick={() => {
              router.push(`${ROUTERS.BOOKING.INDEX}/${item?._id}`);
            }}
          >
            <p>Note:</p>
            <p>{item?.notes}</p>
          </div>
        )}

        {!STATUS_CONFIRMED.includes(item?.status) && (
          <div className="flex gap-4 justify-end z-100">
            {/* <button className="px-2 py-1 rounded text-center hover:bg-primary text-primary-text hover:text-white">
          Edit
        </button> */}
            <button
              onClick={openCanceledModal}
              className="px-2 py-1 rounded text-center bg-primary text-white text-sm hover:scale-105 transition duration-200"
            >
              Canceled Reservation
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingDetail;
