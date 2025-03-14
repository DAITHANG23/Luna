import FormLayout from "@/share/components/FormLayout";
import React, { useMemo } from "react";
import Link from "next/link";
import FieldInput from "@/share/components/FieldInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { REGEX_VALIDATE_EMAIL } from "../../contants";
import useLogin from "@/hooks/AccountHooks/useLoginUser";
import { UserLogin } from "@/@types/models/account";
import ButtonLoading from "@/share/components/ButtonLoading";
const Login = () => {
  const initialValues = { email: "", password: "" };

  const { mutate: loginAccount, isPending: isLoadingLogin } = useLogin();

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required("Please enter your email!")
        .matches(REGEX_VALIDATE_EMAIL, "Invalid Email!"),
      password: Yup.string().trim().required("Please enter your password!"),
    });
  }, []);
  const handleSubmit = (formData: UserLogin) => {
    loginAccount(formData);
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
              <FieldInput title="Email" name="email" required type="text" />

              <h5 className="text-right mt-5">
                <Link
                  href={"/reset-password"}
                  className="no-underline hover:underline text-primary-text"
                >
                  Forgot password?
                </Link>
              </h5>
              <FieldInput
                title="Password"
                name="password"
                required
                type="password"
                isPasswordFied
              />

              <ButtonLoading
                type="submit"
                title="Login"
                isLoading={isLoadingLogin}
                sizeButton="large"
                className="!w-full !ml-0 !font-bold !text-base text-white text-center py-1 px-4"
              />
            </Form>
          </FormLayout>
        );
      }}
    </Formik>
  );
};

export default Login;
