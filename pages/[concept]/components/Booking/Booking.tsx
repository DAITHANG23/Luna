import { AllRestaurantResponseOfConcept } from "@/@types/models";
import SearchField from "@/libs/shared/components/SearchField";
import { Phone } from "lucide-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface BookingProps {
  restaurantsData: AllRestaurantResponseOfConcept | undefined;
}

const MapComponent = dynamic(
  () => import("@/libs/shared/components/MapComponent"),
  { ssr: false }
);
const Booking = ({ restaurantsData }: BookingProps) => {
  const { t, ready } = useTranslation(["translation", "restaurant"]);

  const locationsRestaurantsList = useMemo(() => {
    return restaurantsData?.data.restaurants.map((item) => ({
      lat: item.location?.lat,
      lng: item.location?.lng,
      address: item.location?.address,
      name: item?.name,
      numberPhone: item?.numberPhone,
      timeSlot: item?.timeSlot,
    }));
  }, [restaurantsData]);

  if (!ready) return null;
  return (
    <div className="mt-4">
      <Head>
        <title>{t("headTitle.bookingRestaurant")}</title>
      </Head>
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-[30%]">
          <SearchField
            classNameContainer="!w-full"
            placeholder="Tìm kiếm nhà hàng"
          />
          <div className="mt-10">
            {locationsRestaurantsList?.map((item) => (
              <div key={item.name}>
                <h3 className="pb-5">{item.name}</h3>
                <div>
                  <p>{item.address}</p>
                  <p>
                    {t("restaurant:openClose")}:
                    {`${item.timeSlot[0].startTime} - ${item.timeSlot[0].endTime}`}
                  </p>
                </div>
                <div className="flex gap-4 pt-5 pb-3">
                  <button className="flex bg-primary/30 border border-primary rounded-[4px] text-center text-white text-sm px-3 py-2 gap-2 hover:scale-105">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-primary">{item.numberPhone}</span>
                  </button>
                  <button className="bg-primary rounded-[4px] text-center text-white text-sm px-3 py-2 hover:scale-105">
                    {t("restaurant:button.booking")}
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[70%]">
          <MapComponent
            locationsList={locationsRestaurantsList}
            className="!h-[400px] lg:!h-[37.5rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
