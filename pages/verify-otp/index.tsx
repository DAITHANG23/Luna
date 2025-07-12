import { ForgotPasswordType } from "@/@types/models";
import { useAppContext } from "@/components/contexts/AppContext";
import { ROUTES } from "@/contants";
import useVerifyOtp from "@/features/hooks/AccountHooks/useVerifyOtp";
import { IllustrationDashboardImage } from "@/libs/assets";
import {
  ButtonLoading,
  FieldInput,
  FormLayout,
  OTPInput,
  ResendButton,
} from "@/libs/shared/components";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const VerifyOTP = () => {
  const router = useRouter();
  const { registerData } = useAppContext();
  const [userOtp, setUserOtp] = useState("");

  useEffect(() => {
    localStorage.setItem("resendOtp", "true");
  }, []);

  const emailResetPassword =
    typeof window !== "undefined" && localStorage.getItem("emailResetPassword");

  const { t, ready } = useTranslation("translation");

  const { mutate: verifyOtp, isPending: isLoadingVerifyOtp } = useVerifyOtp();

  const initialValues = {
    email: emailResetPassword || "",
    firstName: registerData?.firstName || "",
    lastName: registerData?.lastName || "",
    password: registerData?.password || "",
    fullName: registerData?.fullName || "",
    numberPhone: registerData?.numberPhone || "",
    passwordConfirm: registerData?.passwordConfirm || "",
    address: registerData?.address || "",
    dateOfBirth: registerData?.dateOfBirth || "",
  };

  const handleOTPComplete = useCallback(
    (otp: string) => {
      setUserOtp(otp);
    },
    [setUserOtp]
  );

  const handleSubmit = (formData: ForgotPasswordType) => {
    const newFormData = { ...formData, otp: userOtp };

    verifyOtp(newFormData);
  };

  if (!ready) return null;
  return (
    <>
      <Head>
        <title>{t("headTitle.verifyOtp")}</title>
        <meta name="description" content="Trang xác nhận OTP." />
      </Head>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {() => {
          return (
            <FormLayout>
              <Form>
                <div className="flex flex-col items-center gap-4 w-full">
                  <IllustrationDashboardImage />
                  <h3> {t("resetPassword.title")}</h3>
                  <p className="text-center">{t("resetPassword.content")}</p>
                  <div className="w-full">
                    <FieldInput
                      title="Email"
                      name="email"
                      required
                      type="text"
                      isReadOnly
                    />
                  </div>
                  <OTPInput
                    name="otp"
                    length={6}
                    onComplete={handleOTPComplete}
                  />

                  <ButtonLoading
                    type="submit"
                    title={t("resetPassword.verify")}
                    isLoading={isLoadingVerifyOtp}
                    sizeButton="large"
                    className="!w-full !ml-0 !font-bold !text-base text-white text-center py-1 px-4 mt-4"
                  />
                </div>
              </Form>
              <div className="flex flex-col mt-6 text-center items-center gap-4">
                <ResendButton />

                <button
                  type="button"
                  className="flex items-center gap-2 hover:underline"
                  onClick={() => router.push(`${ROUTES.LOGIN.INDEX}`)}
                >
                  <ChevronLeftIcon width={16} height={16} />
                  <span>{t("resetPassword.return")}</span>
                </button>
              </div>
            </FormLayout>
          );
        }}
      </Formik>
    </>
  );
};

export default VerifyOTP;
