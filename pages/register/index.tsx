import FormLayout from "@/share/components/FormLayout";
import React, { useMemo } from "react";
import * as Yup from "yup";
import { REGEX_VALIDATE_EMAIL, REGEX_VALIDTATE_PASSWORD } from "../contants";
import { Form, Formik } from "formik";
import FieldInput from "@/share/components/FieldInput";
import { UserLogin } from "@/@types/models/account";
import useRegister from "./hooks/useRegisterAccount";
import { differenceInYears, parseISO } from "date-fns";
const Register = () => {
  const { mutate } = useRegister();
  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required("Please enter your email!")
        .matches(REGEX_VALIDATE_EMAIL, "Invalid Email!"),
      password: Yup.string()
        .trim()
        .required("Please enter your password!")
        .min(8, "Password must be at least 8 characters!")
        .max(20, "Password must be max 20 characters!")
        .matches(
          REGEX_VALIDTATE_PASSWORD,
          "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character."
        ),
      firstName: Yup.string()
        .trim()
        .min(3, "First name must be at least 3 characters")
        .max(50, "First name must not exceed 50 characters")
        .required("Please enter your first name!"),
      lastName: Yup.string()
        .trim()
        .min(3, "Last name must be at least 3 characters")
        .max(50, "Last name must not exceed 50 characters")
        .required("Please enter your last name!"),
      numberPhone: Yup.string()
        .trim()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must not exceed 15 digits")
        .required("Vui lòng nhập thông tin này"),
      confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], "Password must match")
        .required("Please enter confirm password!"),
      address: Yup.string()
        .trim()
        .min(5, "Address must be at least 5 characters")
        .max(100, "Address must not exceed 100 characters")
        .required("Please enter your address!"),
      dateOfBirth: Yup.string()
        .trim()
        .required("Please enter your birth of date!")
        .test(
          "is-old-enough",
          "You must be at least 13 years old!",
          (value) => {
            if (!value) return false;
            const birthDate = parseISO(value);
            const today = new Date();
            return differenceInYears(today, birthDate) >= 13;
          }
        ),
    });
  }, []);
  const handleSubmit = (formData: UserLogin) => {
    const { firstName, lastName } = formData;

    const fullName = `${firstName} ${lastName}`;
    const newFormData = { ...formData, fullName };
    mutate(newFormData);
  };
  const initialValues: UserLogin = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    numberPhone: "",
    confirmPassword: "",
    address: "",
    dateOfBirth: "",
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
              <div className="flex gap-4 justify-between">
                <FieldInput
                  title="First Name"
                  name="firstName"
                  required
                  type="text"
                  className="w-full"
                />
                <FieldInput
                  title="Last Name"
                  name="lastName"
                  required
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="flex justify-between gap-4">
                <FieldInput
                  title="Date Of Birth"
                  name="dateOfBirth"
                  required
                  type="date"
                  className="w-full"
                />
                <FieldInput
                  title="Number Phone"
                  name="numberPhone"
                  required
                  type="text"
                  className="w-full"
                />
              </div>
              <FieldInput title="Email" name="email" required type="text" />
              <FieldInput title="Address" name="address" required type="text" />
              <FieldInput
                title="Password"
                name="password"
                required
                type="password"
                isPasswordFied
              />

              <FieldInput
                title="Confirm Password"
                name="confirmPassword"
                required
                type="password"
                isPasswordFied
              />

              <button
                type="submit"
                className="w-full bg-primary/80 hover:bg-primary text-white rounded-md text-center py-2 px-4 mt-3"
              >
                Create account
              </button>
            </Form>
          </FormLayout>
        );
      }}
    </Formik>
  );
};

export default Register;
