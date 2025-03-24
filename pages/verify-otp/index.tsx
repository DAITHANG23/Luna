import { ForgotPasswordType } from "@/@types/models/account";
import { useAppContext } from "@/components/contexts/AppContext";
import useVerifyOtp from "@/hooks/AccountHooks/useVerifyOtp";
import ButtonLoading from "@/share/components/ButtonLoading";
import FieldInput from "@/share/components/FieldInput";
import FormLayout from "@/share/components/FormLayout";
import OTPInput from "@/share/components/OTPInput";
import ResendButton from "@/share/components/ResendButton";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
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
      </Head>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {() => {
          return (
            <FormLayout>
              <Form>
                <div className="flex flex-col items-center gap-4 w-full">
                  <Image
                    src={"/assets/images/illustration-dashboard.png"}
                    alt="reset-password"
                    width={120}
                    height={120}
                  />
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
                  onClick={() => router.push("/login")}
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
