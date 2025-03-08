import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import FieldInput from "@/share/components/FieldInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { REGEX_VALIDATE_EMAIL } from "@/pages/contants";
import { differenceInYears, parseISO } from "date-fns";
import { UserLogin, UserModel } from "@/@types/models/account";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useGetDataUser from "@/pages/login/hooks/useGetDataUser";
import Router from "next/router";
import apiService from "@/pages/api";
import useNotification from "@/hooks/useNotification";
import ButtonLoading from "@/share/components/ButtonLoading";
import RadioGroupComponent from "@/share/components/RadioGroupComponent";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const GENDER_LIST = [
  { id: "male-radio", name: "gender", value: "male" },
  { id: "female-radio", name: "gender", value: "female" },
];

const ProfileComponent = () => {
  const { showSuccess } = useNotification();

  const { userData, isLoading } = useGetDataUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(
    userData?.data.data.avatarUrl || "/assets/images/defaultAvatar.jpg"
  );
  useEffect(() => {
    if (userData?.data.data.avatarUrl)
      setPreviewImage(userData?.data.data.avatarUrl);
  }, [userData?.data.data.avatarUrl]);

  const initialValues: UserLogin = {
    email: userData?.data.data.email || "",
    avatarUrl: userData?.data.data.avatarUrl || "",
    firstName: userData?.data.data.fullName?.split(" ")[0] || "",
    lastName: userData?.data.data.fullName?.split(" ")[1] || "",
    numberPhone: userData?.data.data.numberPhone || "",
    address: userData?.data.data.address || "",
    dateOfBirth: userData?.data.data.dateOfBirth || "",
    gender: userData?.data.data.gender || "male",
  };
  const { mutate: updateAccount, isPending: isLoadingUpdateProfile } =
    useUpdateProfile();

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

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    },
    []
  );

  const handleSubmit = (values: UserLogin) => {
    const formData = new FormData();
    const data: Partial<UserModel> = {};

    (Object.keys(values) as Array<keyof UserLogin>).forEach((key) => {
      const value = values[key];

      // Kiểm tra nếu giá trị là string hoặc number
      if (typeof value === "string" || typeof value === "number") {
        formData.append(key, value.toString());
        data[key] = value;
      }
    });

    const firstName = values.firstName || "";
    const lastName = values.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();

    formData.append("fullName", fullName);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
      data.avatar = selectedFile;
    }
    data.fullName = fullName;

    updateAccount(data);
  };

  const handleDeleteAccount = async () => {
    try {
      await apiService.account.deleteAccount();
      showSuccess("Account deleted successful!");
      Router.push("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
              />

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                  >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                          <ExclamationTriangleIcon
                            aria-hidden="true"
                            className="size-6 text-red-600"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <DialogTitle
                            as="h3"
                            className="text-base font-semibold text-gray-900"
                          >
                            Deactivate account
                          </DialogTitle>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to deactivate your account?
                              All of your data will be permanently removed. This
                              action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Deactivate
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setOpen(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
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
                  onClick={() => setOpen(true)}
                  className="p-2 border-none rounded-lg font-bold text-sm text-white bg-primary/70 hover:bg-primary mt-[50px]"
                >
                  Delete Account
                </button>
              </div>
              <div
                className="w-[100%] lg:w-[70%] dark:bg-[#1C252E] flex flex-col h-auto p-4 shadow-[rgba(145,158,171,0.16)_0px_4px_8px_0px] rounded-2xl overflow-hidden bg-white text-primary-text font-inter"
                style={{ fontFamily: "Inter" }}
              >
                <div className="grid grid-cols-2 gap-4">
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
                  <ButtonLoading
                    title="Upload Account"
                    type="submit"
                    isLoading={isLoadingUpdateProfile}
                  />
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
