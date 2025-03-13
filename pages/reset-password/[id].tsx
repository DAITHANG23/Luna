import { ForgotPasswordType } from "@/@types/models/account";
import { REGEX_VALIDTATE_PASSWORD } from "@/contants";
import useResetPassword from "@/hooks/AccountHooks/useResetPassword";
import ButtonLoading from "@/share/components/ButtonLoading";
import FieldInput from "@/share/components/FieldInput";
import FormLayout from "@/share/components/FormLayout";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import * as Yup from "yup";

const CreateNewPassword = () => {
  const router = useRouter();
  const { id } = router.query;

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
        .required("Please enter your password!")
        .min(8, "Password must be at least 8 characters!")
        .max(20, "Password must be max 20 characters!")
        .matches(
          REGEX_VALIDTATE_PASSWORD,
          "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character."
        ),
      passwordConfirm: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], "Password must match")
        .required("Please enter confirm password!"),
    });
  }, []);

  const handleSubmit = (formData: ForgotPasswordType) => {
    const newFormData = { ...formData, token: id as string };
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
                <h3>Request sent successfully</h3>
                <p className="text-center">
                  Please enter new password in below box.
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
                <div className="w-full">
                  <FieldInput
                    title="Password"
                    name="password"
                    required
                    type="password"
                    isPasswordFied
                  />
                </div>

                <div className="w-full">
                  <FieldInput
                    title="Confirm Password"
                    name="passwordConfirm"
                    required
                    type="password"
                    isPasswordFied
                  />
                </div>

                <ButtonLoading
                  type="submit"
                  title="Update password"
                  isLoading={isLoadingCreateNewPassword}
                  sizeButton="large"
                  className="!w-full !ml-0 !font-bold !text-base text-white text-center py-1 px-4"
                />

                <button
                  type="button"
                  className="flex items-center gap-2 hover:underline"
                  onClick={() => router.push("/login")}
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

export default CreateNewPassword;
