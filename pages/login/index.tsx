import React, { useMemo } from "react";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { REGEX_VALIDATE_EMAIL, ROUTERS } from "../../contants";
import useLogin from "@/features/hooks/AccountHooks/useLoginUser";
import { UserLogin } from "@/@types/models";
import SocialLogin from "./components/SocialLogin";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import {
  ButtonLoading,
  FieldInput,
  FormLayout,
} from "@/libs/shared/components";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const { t } = useTranslation("translation");
  const { mutate: loginAccount, isPending: isLoadingLogin } = useLogin();

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required(t(`login.validate.email`))
        .matches(REGEX_VALIDATE_EMAIL, t(`login.validate.invalidEmail`)),
      password: Yup.string().trim().required(t(`login.validate.password`)),
    });
  }, [t]);
  const handleSubmit = (formData: UserLogin) => {
    loginAccount(formData);
  };

  return (
    <>
      <Head>
        <title>{t("headTitle.login")}</title>
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
                <FieldInput title="Email" name="email" required type="text" />

                <h5 className="text-right mt-5">
                  <Link
                    href={`${ROUTERS.RESET_PASSWORD.INDEX}`}
                    className="no-underline hover:underline text-primary-text"
                  >
                    {t(`login.forgotPassword`)}
                  </Link>
                </h5>
                <FieldInput
                  title={t("login.password")}
                  name="password"
                  required
                  type="password"
                  isPasswordFied
                />

                <ButtonLoading
                  type="submit"
                  title={t("button.signIn")}
                  isLoading={isLoadingLogin}
                  sizeButton="large"
                  className="!w-full !ml-0 !font-bold !text-base text-white text-center py-1 px-4"
                />
              </Form>
              <SocialLogin />
            </FormLayout>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
