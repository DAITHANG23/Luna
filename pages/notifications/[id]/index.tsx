import React, { useMemo } from "react";
import NotificationMain from "../components/NotificationMain";
import { useRouter } from "next/router";
import useGetNotificationItem from "@/features/hooks/NotificationBooking/useGetNotificationItem";
import { useAppSelector } from "@/libs/redux/hooks";
import Spinner from "@/libs/shared/components/Spinner";
import { PhoneIcon, MapPinHouseIcon } from "lucide-react";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const Index = () => {
  const router = useRouter();

  const { id } = router.query;

  const { t } = useTranslation("translation");

  const accountInfo = useAppSelector((state) => state.auth.accountInfo)?.data
    .data;

  const { notificationData, isLoading } = useGetNotificationItem(id as string);

  const dataNotification = notificationData?.data.data;

  const contentNotificaiton = useMemo(() => {
    if (dataNotification?.type === "bookingCreated") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            Hi
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            Bạn đã đặt bàn thành công tại nhà hàng
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            vào lúc
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            cho
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            người.
          </p>
          <p>
            Vui lòng chờ nhà hàng xác nhận. Bạn sẽ nhận được thông báo khi có
            phản hồi từ nhà hàng.
          </p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingConfirmed") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            Hi
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            Nhà hàng
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            đã xác nhận đặt bàn của bạn vào lúc
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            cho
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            người.
          </p>
          <p>
            Vui lòng đến đúng giờ và xuất trình mã xác nhận (nếu có) khi đến nhà
            hàng.
          </p>
          <p>Chúc bạn có một bữa ăn ngon miệng!</p>
        </div>
      );
    }

    if (dataNotification?.type === "bookingCanceled") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            Hi
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            Rất tiếc, nhà hàng
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            đã từ chối đặt bàn của bạn vào lúc
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
          </p>
          <p>
            Lý do có thể là nhà hàng đã kín chỗ hoặc không thể phục vụ vào thời
            điểm đó.
          </p>
          <p>
            Bạn có thể thử đặt lại với thời gian khác hoặc chọn nhà hàng khác.
          </p>
          <p>Chúng tôi xin lỗi vì sự bất tiện này.</p>
        </div>
      );
    }
    if (dataNotification?.type === "bookingReminder") {
      return (
        <div className="flex flex-col gap-6">
          <p>
            Hi
            <span className="font-bold text-primary pl-1">
              {accountInfo?.firstName}
            </span>
            ,
          </p>
          <p>
            Bạn có một lịch đặt bàn tại
            <span className="font-bold px-1 text-primary">
              {dataNotification?.restaurant.name}
            </span>
            vào lúc
            <span className="font-bold px-1 text-primary">
              {dataNotification?.bookingDate}
            </span>
            cho
            <span className="font-bold px-1 text-primary">
              {dataNotification?.numberOfGuests}
            </span>
            người.
          </p>
          <p>
            Vui lòng đến đúng giờ để được phục vụ tốt nhất. Nếu bạn không thể
            đến, hãy hủy đặt bàn sớm để tránh gây ảnh hưởng cho nhà hàng.
          </p>
          <p>Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi!</p>
        </div>
      );
    }
  }, [dataNotification, accountInfo]);

  return (
    <>
      <Head>
        <title>{t("headTitle.notifications")}</title>
      </Head>
      <div className="mt-[50px] lg:mt-[100px]">
        <NotificationMain>
          {!isLoading ? (
            <div className="lg:mt-[50px] p-4 flex flex-col gap-6">
              {contentNotificaiton}

              <hr className="text-gray-500" />

              <div>
                <p className="text-base font-bold">Thông tin nhà hàng:</p>
                <p className="text-sm pt-3">
                  {dataNotification?.restaurant.name}
                </p>
                <p className="flex text-sm pt-3 gap-2 items-center">
                  <MapPinHouseIcon className="text-primary w-5 h-5" />
                  {dataNotification?.restaurant.address}
                </p>
                <p className="flex text-sm pt-3 gap-2 items-center">
                  <PhoneIcon className="text-primary w-5 h-5" />
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
