import React, { useMemo, useState } from "react";
import NotificationMain from "../components/NotificationMain";
import { useRouter } from "next/router";
import useGetNotificationItem from "@/features/hooks/NotificationBooking/useGetNotificationItem";
import { useAppSelector } from "@/libs/redux/hooks";
import Spinner from "@/libs/shared/components/Spinner";
import { PhoneIcon, MapPinHouseIcon } from "lucide-react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import ModalComponent from "@/libs/shared/components/ModalComponent";
import Review from "@/pages/restaurant-concept/components/Review";
import { ConceptModel } from "@/@types/models";

const Index = () => {
  const router = useRouter();

  const { id } = router.query;

  const { t } = useTranslation(["translation", "notification"]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const accountInfo = useAppSelector((state) => state.auth.accountInfo)?.data
    .data;

  const { notificationData, isLoading } = useGetNotificationItem(id as string);

  const dataNotification = notificationData?.data.data;

  const concept = useMemo(() => {
    return dataNotification?.restaurant.concept || [];
  }, [dataNotification]);

  const contentNotificaiton = useMemo(() => {
    if (dataNotification?.type === "bookingCreated") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("notification:content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("notification:content.bookingCreated.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            {t("notification:content.bookingCreated.detail.content_2")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("notification:content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            {t("notification:content.bookingCreated.detail.content_4")}
          </p>
          <p>{t("notification:content.bookingCreated.detail.content_5")}</p>
          <p>{t("notification:content.bookingCreated.detail.content_6")}</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingConfirmed") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("notification:content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("notification:content.bookingConfirmed.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            {t("notification:content.bookingConfirmed.detail.content_2")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("notification:content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            {t("notification:content.bookingCreated.detail.content_4")}
          </p>
          <p>{t("notification:content.bookingConfirmed.detail.content_3")}</p>
          <p>{t("notification:content.bookingConfirmed.detail.content_4")}</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingCanceled") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("notification:content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("notification:content.bookingCanceled.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            {t("notification:content.bookingCanceled.detail.content_2")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
          </p>
          <p>{t("notification:content.bookingCanceled.detail.content_3")}</p>
          <p>{t("notification:content.bookingCanceled.detail.content_4")}</p>
          <p>{t("notification:content.bookingCanceled.detail.content_5")}</p>
        </div>
      );
    }
    if (dataNotification?.type === "bookingReminder") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("notification:content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("notification:content.bookingReminder.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            {t("notification:content.bookingCreated.detail.content_2")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("notification:content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            {t("notification:content.bookingCreated.detail.content_4")}
          </p>
          <p>{t("notification:content.bookingReminder.detail.content_2")}</p>
          <p>{t("notification:content.bookingReminder.detail.content_3")}</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingInProgress") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("notification:content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("notification:content.bookingInProgress.detail.content_1")}{" "}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}.
            </span>
          </p>
          <p>
            <span className="pl-1">
              {t("notification:content.bookingCompleted.detail.content_2")}
            </span>
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("notification:content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            <span className="pr-1">
              {t("notification:content.bookingCompleted.detail.content_7")}
            </span>
            {t("notification:content.bookingInProgress.detail.content_2")}
          </p>
          <p>{t("notification:content.bookingInProgress.detail.content_3")}</p>

          <p>{t("notification:content.bookingInProgress.detail.content_4")}</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingCompleted") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            {t("notification:content.bookingCreated.detail.hi")}
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            {t("notification:content.bookingCompleted.detail.content_1")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            .
            <span className="pl-1">
              {t("notification:content.bookingCompleted.detail.content_2")}
            </span>
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            {t("notification:content.bookingCreated.detail.content_3")}
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            <span className="pr-1">
              {t("notification:content.bookingCompleted.detail.content_7")}
            </span>
            {t("notification:content.bookingCompleted.detail.content_3")}
          </p>
          <p>{t("notification:content.bookingCompleted.detail.content_4")}</p>
          <p
            className="text-primary hover:underline cursor-pointer"
            onClick={() => setIsOpenModal(true)}
          >
            👉 {t("notification:content.bookingCompleted.detail.content_6")}
          </p>
          <p>{t("notification:content.bookingCompleted.detail.content_5")}</p>
        </div>
      );
    }
  }, [dataNotification, accountInfo, t]);

  return (
    <>
      <Head>
        <title>{t("headTitle.notifications")}</title>
      </Head>
      <div className="mt-[50px] lg:mt-[100px]">
        <ModalComponent open={isOpenModal} setOpen={setIsOpenModal}>
          <Review
            concept={concept as ConceptModel}
            setIsOpenModal={setIsOpenModal}
            isOpenModal={isOpenModal}
          />
        </ModalComponent>
        <NotificationMain>
          {!isLoading ? (
            <div className="lg:mt-[50px] p-4 flex flex-col gap-6 text-primary-text">
              {contentNotificaiton}

              <hr className="text-gray-500" />

              <div>
                <p className="text-base font-bold">
                  {t("notification:infoRestaurant")}
                </p>
                <p className="text-sm pt-3">
                  {dataNotification?.restaurant.name}
                </p>
                <p className="flex text-sm pt-3 gap-2 items-center">
                  <MapPinHouseIcon className="text-primary w-5 h-5 flex-shrink-0" />
                  {dataNotification?.restaurant.address}
                </p>
                <p className="flex text-sm pt-3 gap-2 items-center">
                  <PhoneIcon className="text-primary w-5 h-5 flex-shrink-0" />
                  {dataNotification?.restaurant.numberPhone}
                </p>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </NotificationMain>
      </div>
    </>
  );
};

export default Index;
