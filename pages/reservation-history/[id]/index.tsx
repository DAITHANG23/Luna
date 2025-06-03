import useGetBooking from "@/features/hooks/BookingHooks/useGetBooking";
import Stepper from "@/libs/shared/components/Stepper";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon } from "lucide-react";
import { CONCEPTS_ROUTES } from "@/contants";

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const allSteps = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED"];

const Index = () => {
  const { t, ready } = useTranslation("booking");
  const router = useRouter();
  const { id } = router.query;

  const { bookingData } = useGetBooking(id as string);

  const contentStatus = useMemo(() => {
    if (!bookingData) return undefined;

    const status = bookingData.data.data.status;
    switch (status) {
      case "PENDING":
        return "Đặt bàn chờ xác nhận";
      case "CONFIRMED":
        return "Đặt bàn được xác nhận";
      case "IN_PROGRESS":
        return "Bữa ăn đang diễn ra";
      default:
        return "Bữa ăn đã hoàn thành";
    }
  }, [bookingData]);

  const conceptName = useMemo(() => {
    const concept = bookingData?.data.data.restaurant?.concept?.name;
    return CONCEPTS_ROUTES.find((item) => item.name === concept);
  }, [bookingData]);

  if (!ready) return null;
  return (
    <>
      <Head>
        <title>{t("translation:headTitle.historyBooking")}</title>
      </Head>
      <div className="mt-[7.25rem] w-[90%] xl:w-[70%] mx-auto bg-white dark:bg-gray-900 rounded-lg p-4 my-4 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-6">
          <button
            onClick={() => router.push("/reservation-history")}
            className=" flex items-center gap-2 text-primary-text hover:text-primary transition-colors w-64"
          >
            <ChevronLeftIcon />
            Trở lại
          </button>
          <div className="flex">
            <p className="pr-2 border-r border-black text-center">
              Mã đặt bàn: 2412077RFADBD9
            </p>
            <p className="pl-2 text-primary text-center">
              {contentStatus?.toLocaleUpperCase()}
            </p>
          </div>
        </div>
        <hr className="!mb-14" />
        <Stepper
          allSteps={allSteps}
          statusHistory={bookingData?.data.data.statusHistory || []}
          labelMap={statusLabels}
        />
        <hr className="!mt-14" />
        {bookingData?.data.data.status === "COMPLETED" && (
          <div className="bg-primary/20 w-full h-auto flex items-center justify-between p-4">
            <p className="text-xs">
              Cảm ơn bạn đã ghé thăm tại Domique Fusion!
            </p>
            <button
              onClick={() => router.push(`/${conceptName?.route}/booking`)}
              className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Đặt bàn lại
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
