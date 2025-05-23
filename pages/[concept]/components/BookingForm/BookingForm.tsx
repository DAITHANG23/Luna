import { useAppSelector } from "@/libs/redux/hooks";
import ButtonLoading from "@/libs/shared/components/ButtonLoading";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { MapPin, Phone } from "lucide-react";
import React, { memo, useCallback, useMemo, useState } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  AllRestaurantResponseOfConcept,
  RestaurantBooking,
} from "@/@types/models";
import FormDetail from "../FormDetail/FormDetail";
import useBookingRestaurant from "@/features/hooks/RestaurantsHooks/useBookingRestaurant";

interface BookingFormProps {
  chooseRestaurant: string | null;
  restaurantsData: AllRestaurantResponseOfConcept | undefined;
  setIsOpenModalBooking: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingForm = ({
  chooseRestaurant,
  restaurantsData,
  setIsOpenModalBooking,
}: BookingFormProps) => {
  const { t, ready } = useTranslation(["translation", "restaurant"]);
  const [chooseTimeSlot, setChooseTimeSlot] = useState<string | null>("11:00");
  const [choosePeopleQuantity, setChoosePeopleQuantity] = useState<string>("2");
  const [chooseNotes, setChooseNotes] = useState<string[]>([]);
  const [notesContent, setNotesContent] = useState<string>("");

  const accountInfo = useAppSelector((state) => state.auth.accountInfo)?.data
    .data;
  const today = format(new Date(), "yyyy-MM-dd");

  const onSuccess = () => {
    setIsOpenModalBooking(false);
  };

  const { mutate: bookingRestaurant } = useBookingRestaurant(onSuccess, t);

  const handleChangeText = (value: string) => {
    setNotesContent(value);
  };

  const restaurant = useMemo(() => {
    if (chooseRestaurant)
      return restaurantsData?.data.restaurants.find(
        (item) => item.name === chooseRestaurant
      );
  }, [chooseRestaurant, restaurantsData]);

  const handleTimeSlotChange = useCallback((value: string) => {
    setChooseTimeSlot(value);
  }, []);

  const handlePeopleQuantityChange = useCallback((value: string) => {
    setChoosePeopleQuantity(value);
  }, []);

  const onClickNotes = useCallback((value: string) => {
    setChooseNotes((prev) => [...prev, value]);
    setNotesContent((prev) => (prev ? `${prev} ${value}` : value));
  }, []);

  const initialValues: RestaurantBooking = {
    timeOfBooking: today,
    timeSlot: "11:00",
    fullName: accountInfo?.fullName,
    numberPhone: accountInfo?.numberPhone,
    email: accountInfo?.email,
    peopleQuantity: "2",
    notes: "",
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required(t("restaurant:validate.fieldIsRequired")),
      fullName: Yup.string()
        .trim()
        .required(t("restaurant:validate.fieldIsRequired")),
      numberPhone: Yup.string()
        .trim()
        .required(t("restaurant:validate.fieldIsRequired")),
    });
  }, [t]);

  const handleSubmit = (formData: RestaurantBooking) => {
    const customFormData = {
      ...formData,
      customer: accountInfo?._id,
      restaurant: restaurant?.id,
    };
    bookingRestaurant(customFormData);
  };
  if (!ready) return null;
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form className="w-full h-auto">
            <div className="flex flex-col w-[90%]">
              <h1 className="font-bold text-lg pb-2 ">{restaurant?.name}</h1>
              <div className="flex gap-2 pb-2 items-start justify-start">
                <MapPin className="text-primary flex-shrink-0 w-5 h-5" />
                <p>{restaurant?.address}</p>
              </div>
              <div className="flex gap-2">
                <Phone className="text-primary w-5 h-5" />
                <p>{restaurant?.numberPhone}</p>
              </div>
            </div>
            <hr className="my-4" />

            <FormDetail
              onClickNotes={onClickNotes}
              handlePeopleQuantityChange={handlePeopleQuantityChange}
              handleChangeText={handleChangeText}
              handleTimeSlotChange={handleTimeSlotChange}
              choosePeopleQuantity={choosePeopleQuantity}
              chooseTimeSlot={chooseTimeSlot}
              chooseNotes={chooseNotes}
              notesContent={notesContent}
            />

            <div className="w-full flex mt-6 justify-end">
              <button
                type="button"
                className="flex items-center gap-2 text-primary-text rounded-lg bg-gray-300 px-4 py-[8px] hover:scale-105 transition duration-200"
                onClick={() => {
                  setIsOpenModalBooking(false);
                }}
              >
                <span>{t("button.cancel")}</span>
              </button>
              <ButtonLoading
                type="submit"
                title={t("restaurant:button.booking")}
                isLoading={false}
                sizeButton="small"
                className="!text-base text-white text-center hover:scale-105 transition duration-200 !sm:w-[100px] ml-3"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(BookingForm);
