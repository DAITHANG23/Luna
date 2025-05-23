import ModalComponent from "@/libs/shared/components/ModalComponent";
import SearchField from "@/libs/shared/components/SearchField";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BookingForm from "../BookingForm/BookingForm";
import { Phone } from "lucide-react";
import useGetRestaurantsOfConcept from "@/features/hooks/RestaurantsHooks/useGetRestaurantsOfConcept";
import { useDebouncedCallback } from "@/features/hooks/useDebouncedCallback";
interface BookingProps {
  conceptDataId: string;
}

const MapComponent = dynamic(
  () => import("@/libs/shared/components/MapComponent"),
  { ssr: false }
);

const Booking = ({ conceptDataId }: BookingProps) => {
  const { t, ready } = useTranslation(["translation", "restaurant"]);
  const [chooseRestaurant, setChooseRestaurant] = useState<string | null>(null);
  const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
  const [searchText, setSearchText] = useState("");
  const params = useMemo(() => {
    return { searchText };
  }, [searchText]);
  const { restaurantsData } = useGetRestaurantsOfConcept(conceptDataId, params);

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

  const handleTextChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000
  );

  if (!ready) return null;
  return (
    <div className="mt-4">
      <Head>
        <title>{t("headTitle.bookingRestaurant")}</title>
      </Head>
      <ModalComponent
        open={isOpenModalBooking}
        setOpen={setIsOpenModalBooking}
        classNameContainer="!max-w-[31.1125rem]"
      >
        <BookingForm
          chooseRestaurant={chooseRestaurant}
          restaurantsData={restaurantsData}
          setIsOpenModalBooking={setIsOpenModalBooking}
        />
      </ModalComponent>
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full lg:w-[30%]">
          <SearchField
            classNameContainer="!w-full"
            placeholder="Tìm kiếm nhà hàng"
            onChange={handleTextChange}
          />
          <div className="mt-10">
            {locationsRestaurantsList &&
            locationsRestaurantsList?.length > 0 ? (
              locationsRestaurantsList?.map((item) => (
                <div key={item.name}>
                  <h3 className="pb-5 text-primary-text">{item.name}</h3>
                  <div className="text-primary-text">
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
                    <button
                      onClick={() => {
                        setIsOpenModalBooking(true);
                        setChooseRestaurant(item.name);
                      }}
                      className="bg-primary rounded-[4px] text-center text-white text-sm px-3 py-2 hover:scale-105"
                    >
                      {t("restaurant:button.booking")}
                    </button>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div className="text-primary-text text-center">
                {t("restaurant:notFound")}
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-[70%]">
          <MapComponent
            key={`${locationsRestaurantsList?.[0]?.lat}`}
            locationsList={locationsRestaurantsList}
            className="!h-[400px] lg:!h-[37.5rem]"
            lat={locationsRestaurantsList?.[0]?.lat}
            lng={locationsRestaurantsList?.[0]?.lng}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
