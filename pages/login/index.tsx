import FormLayout from "@/share/components/FormLayout";
import React, { useMemo } from "react";
import Link from "next/link";
import FieldInput from "@/share/components/FieldInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { REGEX_VALIDATE_EMAIL } from "../../contants";
import useLogin from "@/hooks/AccountHooks/useLoginUser";
import { UserLogin } from "@/@types/models/account";
const Login = () => {
  const initialValues = { email: "", password: "" };

  const { mutate: loginAccount } = useLogin();

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

              <button
                type="submit"
                className="w-full bg-primary/80 hover:bg-primary text-white rounded-md text-center py-2 px-4 mt-3"
              >
                Login
              </button>
            </Form>
          </FormLayout>
        );
      }}
    </Formik>
  );
};

export default Login;
