import { ForgotPasswordType } from "@/@types/models/account";
import { REGEX_VALIDTATE_PASSWORD } from "@/contants";
import useResetPassword from "@/hooks/AccountHooks/useResetPassword";
import ButtonLoading from "@/share/components/ButtonLoading";
import FieldInput from "@/share/components/FieldInput";
import FormLayout from "@/share/components/FormLayout";
import OTPInput from "@/share/components/OTPInput";
import ResendButton from "@/share/components/ResendButton";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const CreateNewPassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation("translation");
  const [userOtp, setUserOtp] = useState("");

  const emailResetPassword =
    typeof window !== "undefined" && localStorage.getItem("emailResetPassword");

  const { mutate: createNewPassword, isPending: isLoadingCreateNewPassword } =
    useResetPassword();

  const initialValues = {
    email: emailResetPassword || "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      password: Yup.string()
        .trim()
        .required(t("resetPassword.validate.password"))
        .min(8, t("resetPassword.validate.minPassword"))
        .max(20, t("resetPassword.validate.maxPassword"))
        .matches(
          REGEX_VALIDTATE_PASSWORD,
          t("resetPassword.validate.formatPassword")
        ),
      passwordConfirm: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], t("resetPassword.validate.matchPassword"))
        .required(t("resetPassword.validate.confirmPassword")),
    });
  }, [t]);

  const handleOTPComplete = useCallback(
    (otp: string) => {
      setUserOtp(otp);
    },
    [setUserOtp]
  );

  const handleSubmit = (formData: ForgotPasswordType) => {
    const newFormData = { ...formData, token: id as string, otp: userOtp };
    createNewPassword(newFormData);
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
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
                <h3 className="text-primary-text">
                  {t("resetPassword.title")}
                </h3>
                <p className="text-center text-secondary-text">
                  {t("resetPassword.content")}
                </p>
                <div className="w-full">
                  <FieldInput
                    title="Email"
                    name="email"
                    required
                    type="text"
                    isReadOnly
                  />
                </div>
                <OTPInput length={6} onComplete={handleOTPComplete} />
                <div className="w-full">
                  <FieldInput
                    title={t("resetPassword.password")}
                    name="password"
                    required
                    type="password"
                    isPasswordFied
                  />
                </div>

                <div className="w-full">
                  <FieldInput
                    title={t("resetPassword.confirmPassword")}
                    name="passwordConfirm"
                    required
                    type="password"
                    isPasswordFied
                  />
                </div>

                <ButtonLoading
                  type="submit"
                  title={t("resetPassword.updatePassword")}
                  isLoading={isLoadingCreateNewPassword}
                  sizeButton="large"
                  className="!w-full !ml-0 !font-bold !text-base text-white text-center py-1 px-4"
                />
              </div>
            </Form>
            <div className="flex flex-col mt-6 text-center items-center gap-4">
              <ResendButton />
              <button
                type="button"
                className="flex items-center gap-1 hover:underline mr-2"
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
  );
};

export default CreateNewPassword;
