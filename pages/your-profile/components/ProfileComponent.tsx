import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import FieldInput from "@/share/components/FieldInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { REGEX_VALIDATE_EMAIL } from "@/contants";
import { differenceInYears, parseISO } from "date-fns";
import { UserLogin, UserModel } from "@/@types/models/account";
import useUpdateProfile from "@/hooks/AccountHooks/useUpdateProfile";
import useGetDataUser from "@/hooks/AccountHooks/useGetDataUser";
import Router from "next/router";
import apiService from "@/api/index";
import useNotification from "@/hooks/useNotification";
import ButtonLoading from "@/share/components/ButtonLoading";
import RadioGroupComponent from "@/share/components/RadioGroupComponent";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import ModalNotification from "@/share/components/ModalNotification";
import Skeleton from "./Skeleton";

const GENDER_LIST = [
  { id: "male-radio", name: "gender", value: "male", title: "Male" },
  { id: "female-radio", name: "gender", value: "female", title: "Female" },
];

const ProfileComponent = () => {
  const { showSuccess } = useNotification();

  const { userData, isLoading } = useGetDataUser();
  const {
    mutate: updateAccount,
    isSuccess: isUpdateSuccess,
    isPending: isUpdateLoading,
  } = useUpdateProfile();
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(
    userData?.data.data.avatarUrl || "/assets/images/defaultAvatar.jpg"
  );

  useEffect(() => {
    if (userData?.data.data.avatarUrl)
      setPreviewImage(userData?.data.data.avatarUrl);
  }, [userData?.data.data.avatarUrl]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsOpenModalUpdate(false);
    }
  }, [isUpdateSuccess]);

  const initialValues: UserLogin = {
    email: userData?.data.data.email || "",
    avatarUrl: userData?.data.data.avatarUrl || "",
    firstName: userData?.data.data.fullName?.split(" ")[0] || "",
    lastName: userData?.data.data.fullName?.split(" ").slice(1).join(" ") || "",
    numberPhone: userData?.data.data.numberPhone || "",
    address: userData?.data.data.address || "",
    dateOfBirth: userData?.data.data.dateOfBirth || "",
    gender: userData?.data.data.gender || "male",
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required("Please enter your email!")
        .matches(REGEX_VALIDATE_EMAIL, "Invalid Email!"),
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
      gender: Yup.string().trim().required("Please provide your gender!"),
      numberPhone: Yup.string()
        .trim()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must not exceed 15 digits")
        .required("Vui lòng nhập thông tin này"),
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

  const handleSubmit = useCallback((values: UserLogin) => {
    const data: Partial<UserModel> = {};

    (Object.keys(values) as Array<keyof UserLogin>).forEach((key) => {
      const value = values[key];

      if (typeof value === "string" || typeof value === "number") {
        data[key] = value;
      }
    });

    const firstName = values.firstName || "";
    const lastName = values.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();

    data.avatar = values.avatar;
    data.fullName = fullName;

    updateAccount(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteAccount = async () => {
    try {
      await apiService.account.deleteAccount();
      showSuccess("Account deleted successful!");
      Router.push("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  if (isLoading) return <Skeleton />;

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, isValid }) => {
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFieldValue("avatar", file);
            setPreviewImage(URL.createObjectURL(file));
          }
        };
        return (
          <Form>
            {isOpenModalDelete && (
              <ModalNotification
                title="Delete Account"
                content="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
                icon={
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                }
                open={isOpenModalDelete}
                setOpen={setIsOpenModalDelete}
                labelButton="Delete"
                type="delete"
                action={
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary/80 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 sm:ml-3 sm:w-auto"
                    onClick={handleDeleteAccount}
                  >
                    Delete
                  </button>
                }
              />
            )}
            {isOpenModalUpdate && (
              <ModalNotification
                title="Update Account"
                content="Are you sure update your profile?"
                icon={
                  <ArrowPathIcon
                    aria-hidden="true"
                    className="w-8 h-8 text-green-500 animate-spin"
                    type="update"
                  />
                }
                open={isOpenModalUpdate}
                setOpen={setIsOpenModalUpdate}
                labelButton="Update"
                type="update"
                action={
                  <ButtonLoading
                    type="submit"
                    title="Update"
                    isLoading={isUpdateLoading}
                    onHandleSubmit={handleSubmit}
                    sizeButton="large"
                  />
                }
              />
            )}
            <div
              className="flex flex-col items-start justify-start gap-6 lg:flex-row"
              style={{ fontFamily: "Inter" }}
            >
              <div className="w-[100%] lg:w-[30%] h-[462px] dark:bg-[#1C252E] shadow-[rgba(145,158,171,0.16)_0px_4px_8px_0px] rounded-2xl overflow-hidden bg-white text-primary-text flex flex-col items-center justify-center ">
                <div className="text-center w-[144px] h-[144px] cursor-pointer overflow-hidden p-[8px] border border-dashed border-[rgba(145,158,171,0.2)] rounded-full relative">
                  <label className="cursor-pointer block">
                    <input
                      name="avatar"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <div className="w-full h-full overflow-hidden rounded-full relative">
                      <div className="relative w-full h-full rounded-full cursor-pointer">
                        <Image
                          src={previewImage}
                          alt="Avatar"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover tex"
                        />

                        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-[rgba(22,28,36,0.64)] text-white opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                          <CameraIcon className="w-8 h-8" />
                          <span className="text-xs font-normal">
                            Photo Update
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <span className="mt-6 mx-auto text-xs font-nomal leading-6 text-primary-text block text-center">
                  Allow *.jpeg, *.jpg, *.png, *.gif
                  <br />
                  max size of 3.1MB
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpenModalDelete(true)}
                  className="p-2 border-none rounded-lg font-bold text-sm text-white bg-primary/70 hover:bg-primary mt-[50px]"
                >
                  Delete Account
                </button>
              </div>
              <div
                className="w-[100%] lg:w-[70%] dark:bg-[#1C252E] flex flex-col h-auto p-4 shadow-[rgba(145,158,171,0.16)_0px_4px_8px_0px] rounded-2xl overflow-hidden bg-white text-primary-text font-inter"
                style={{ fontFamily: "Inter" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldInput
                    title="Email"
                    name="email"
                    required
                    type="text"
                    isReadOnly
                  />
                  <FieldInput
                    title="First Name"
                    name="firstName"
                    required
                    type="text"
                  />
                  <FieldInput
                    title="Last Name"
                    name="lastName"
                    required
                    type="text"
                  />

                  <div>
                    <RadioGroupComponent
                      title="Gender"
                      itemList={GENDER_LIST}
                    />
                  </div>
                  <FieldInput
                    title="Address"
                    name="address"
                    required
                    type="text"
                  />
                  <FieldInput
                    title="Number Phone"
                    name="numberPhone"
                    required
                    type="text"
                  />
                  <FieldInput
                    title="Date Of Birth"
                    name="dateOfBirth"
                    required
                    type="date"
                  />
                </div>
                <div className="justify-end text-end">
                  <button
                    type="button"
                    className="cursor-pointer text-white bg-primary/70 hover:bg-primary/80 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center me-2 dark:focus:ring-primary inline-flex items-center"
                    onClick={() => {
                      if (isValid) {
                        setIsOpenModalUpdate(true);
                      }
                    }}
                  >
                    <p className={"!my-2 !mx-2 text-sm  opacity-100"}>
                      Update Account
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileComponent;
