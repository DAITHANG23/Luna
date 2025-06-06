import useGetAllResevations from "@/features/hooks/BookingHooks/useGetAllResevation";
import { CalendarIcon } from "lucide-react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import Spinner from "@/libs/shared/components/Spinner";
import { useRouter } from "next/router";
import LazyBookingDetail from "./components/LazyBookingDetail";

const OrderHistory = () => {
  const { t, ready } = useTranslation("booking");

  const { resevationsData, isLoading } = useGetAllResevations();

  const router = useRouter();

  if (isLoading)
    return (
      <div className="mt-[8.5rem]">
        <Spinner />
      </div>
    );
  if (!ready) return null;
  return (
    <div>
      <Head>
        <title>{t("translation:headTitle.historyBooking")}</title>
      </Head>
      <div className="mt-[8.5rem]">
        <div className="mt-[5rem] sm:mt-[7.5rem] w-[90%] xl:w-[60%] mx-auto p-4 ">
          <h3 className="flex text-center justify-start items-center gap-2 text-primary">
            <CalendarIcon /> {t("title")}
          </h3>

          <div className="my-10">
            {resevationsData && resevationsData?.data.data.length > 0 ? (
              resevationsData?.data.data?.map((item, index) => (
                <LazyBookingDetail key={item._id} item={item} index={index} />
              ))
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center text-center">
                <p className="text-base">{t("noBooking")}</p>
                <div className="flex gap-2">
                  <button
                    className="text-primary hover:underline text-base font-bold"
                    onClick={() => router.push("/restaurant-concept")}
                  >
                    {t("button.bookingNow")}
                  </button>
                  {t("contentNoBooking")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
