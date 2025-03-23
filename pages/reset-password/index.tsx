import { REGEX_VALIDATE_EMAIL } from "@/contants";
import FieldInput from "@/share/components/FieldInput";
import FormLayout from "@/share/components/FormLayout";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useMemo } from "react";
import * as Yup from "yup";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import useForgotPassword from "@/hooks/AccountHooks/useForgotPassword";
import { ForgotPasswordType } from "@/@types/models/account";
import ButtonLoading from "@/share/components/ButtonLoading";
import Head from "next/head";
import { useTranslation } from "react-i18next";
const ResetPassword = () => {
  const router = useRouter();
  const { t } = useTranslation("translation");
  const { mutate: forgotPassword, isPending: isLoadingSendEmail } =
    useForgotPassword();
  const initialValues = { email: "" };

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required(t("resetPassword.validate.password"))
        .matches(REGEX_VALIDATE_EMAIL, t("register.validate.invalidEmail")),
    });
  }, [t]);

  const handleSubmit = (formData: ForgotPasswordType) => {
    if (formData?.email) {
      localStorage.setItem("emailResetPassword", formData.email);
    }
    forgotPassword(formData);
  };
  return (
    <>
      <Head>
        <title>{t("headTitle.resetPassword")}</title>
      </Head>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <FormLayout>
              <Form>
                <div className="flex flex-col items-center gap-4">
                  <Image
                    src={"/assets/images/illustration-dashboard.png"}
                    alt="reset-password"
                    width={120}
                    height={120}
                  />
                  <h3 className="text-primary-text">
                    {t("forgotPassword.title")}
                  </h3>
                  <p className="text-center text-secondary-text">
                    {t("forgotPassword.content")}
                  </p>
                  <div className="w-full">
                    <FieldInput
                      title="Email"
                      name="email"
                      required
                      type="text"
                    />
                  </div>

                  <div className="w-full">
                    <ButtonLoading
                      type="submit"
                      title={t("forgotPassword.button")}
                      isLoading={isLoadingSendEmail}
                      sizeButton="large"
                      className="!w-full !ml-0 !font-bold !text-base text-white text-center py-1 px-4"
                    />
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-2 hover:underline text-primary-text"
                    onClick={() => router.back()}
                  >
                    <ChevronLeftIcon width={16} height={16} />{" "}
                    <span>{t("forgotPassword.return")}</span>
                  </button>
                </div>
              </Form>
            </FormLayout>
          );
        }}
      </Formik>
    </>
  );
};

export default ResetPassword;
