import useGetAllResevations from "@/features/hooks/BookingHooks/useGetAllResevation";
import { CalendarIcon } from "lucide-react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import BookingDetail from "./components/BookingDetail";
import Spinner from "@/libs/shared/components/Spinner";

const OrderHistory = () => {
  const { t, ready } = useTranslation("booking");

  const { resevationsData, isLoading } = useGetAllResevations();

  if (isLoading) return <Spinner />;

  if (!ready) return null;
  return (
    <div>
      <Head>
        <title>{t("translation:headTitle.historyBooking")}</title>
      </Head>
      <div className="mt-[8.5rem]">
        <div className="mt-[5rem] sm:mt-[7.5rem] w-[90%] xl:w-[60%] mx-auto p-4 ">
          <h3 className="flex text-center justify-start items-center gap-2 text-primary-text">
            <CalendarIcon /> Reservation History
          </h3>

          <div className="my-10">
            {resevationsData?.data.data?.map((item) => (
              <BookingDetail key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
