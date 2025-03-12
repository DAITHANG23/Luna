import { REGEX_VALIDTATE_PASSWORD } from "@/contants";
import ButtonLoading from "@/share/components/ButtonLoading";
import FieldInput from "@/share/components/FieldInput";
import { Form, Formik } from "formik";
import React, { useMemo } from "react";
import * as Yup from "yup";
import useUpdatePassword from "@/hooks/AccountHooks/useUpdatePassword";
import { UpdatePasswordType } from "@/@types/models/account";
import Popover from "./PopoverComponent";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
const SecurityComponent = () => {
  const mutation = useUpdatePassword();

  const initialValues = {
    passwordCurrent: "",
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
      passwordCurrent: Yup.string()
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
        .required("Please enter your password!")
        .oneOf([Yup.ref("password")], "Password must match"),
    });
  }, []);

  const handleSubmit = (formData: UpdatePasswordType) => {
    mutation.mutate(formData);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form className="w-full ">
            <div className="p-6 dark:bg-[#1C252E] shadow-[rgba(145,158,171,0.16)_0px_4px_8px_0px] rounded-2xl overflow-hidden bg-white text-primary-text flex flex-col">
              <div className="grid grid-cols-1 gap-4 w-full">
                <FieldInput
                  title="Current Password"
                  name="passwordCurrent"
                  required
                  isPasswordFied
                />
                <div className="relative">
                  <FieldInput
                    title="New Password"
                    name="password"
                    required
                    isPasswordFied
                  />
                  <div className="absolute top-0 right-0">
                    <Popover
                      iconButton={
                        <InformationCircleIcon
                          onMouseDown={(e) => e.preventDefault()}
                          width={20}
                          height={20}
                        />
                      }
                      content={
                        <p>
                          Password must have at least 8 characters, one
                          uppercase, one lowercase, one number, and one special
                          character.
                        </p>
                      }
                    />
                  </div>
                </div>

                <FieldInput
                  title="Confirm Password"
                  name="passwordConfirm"
                  required
                  isPasswordFied
                />
              </div>
              <div className="justify-end text-end mt-4">
                <ButtonLoading
                  isLoading={mutation.isPending}
                  title="Save changes"
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SecurityComponent;
