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
const ResetPassword = () => {
  const router = useRouter();

  const { mutate: forgotPassword, isPending: isLoadingSendEmail } =
    useForgotPassword();
  const initialValues = { email: "" };

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required("Please enter your email!")
        .matches(REGEX_VALIDATE_EMAIL, "Invalid Email!"),
    });
  }, []);

  const handleSubmit = (formData: ForgotPasswordType) => {
    if (formData?.email) {
      localStorage.setItem("emailResetPassword", formData.email);
    }
    forgotPassword(formData);
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
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={"/assets/images/illustration-dashboard.png"}
                  alt="reset-password"
                  width={120}
                  height={120}
                />
                <h3 className="text-primary-text">Forgot your password?</h3>
                <p className="text-center text-secondary-text">
                  Please enter the email address associated with your account
                  and we&apos;ll email you a link to reset your password.
                </p>
                <div className="w-full">
                  <FieldInput title="Email" name="email" required type="text" />
                </div>

                <div className="w-full">
                  <ButtonLoading
                    type="submit"
                    title="Send request"
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
                  <span>Return to sign in</span>
                </button>
              </div>
            </Form>
          </FormLayout>
        );
      }}
    </Formik>
  );
};

export default ResetPassword;
