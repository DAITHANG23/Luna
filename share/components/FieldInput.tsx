import clsx from "clsx";
import { useField } from "formik";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
interface FromTextFieldProps {
  title?: string;
  className?: string;
  name: string;
  type?: string;
  required?: boolean;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isPasswordFied?: boolean;
}

const FieldInput = ({
  title,
  className,
  name,
  type = "text",
  required = false,
  isPasswordFied = false,
  ...props
}: FromTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name);

  const isError = meta.touched && !!meta.error;
  const errorMessage = meta.error;

  return (
    <div className={clsx("mb-4 relative", className)}>
      <label
        className={clsx(
          isError
            ? "text-error dark:text-error"
            : "text-primay-text dark:text-primay-text",
          "text-sm font-medium text-primary-text"
        )}
      >
        {title}
        {required && <span className="ml-1 text-error">*</span>}
      </label>
      <div>
        <input
          className={clsx(
            "block w-full rounded-md py-[16.5px] px-[14px] text-sm dark:bg-white",
            isError
              ? "border border-red-500 dark:border border-red-500"
              : "border border-gray-300 dark:border-none",
            className,
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25 dark:data-[focus]:outline-white/25"
          )}
          type={
            !isPasswordFied
              ? type
              : isPasswordFied && showPassword
                ? "text"
                : "password"
          }
          {...field}
          {...props}
        />
        {isPasswordFied && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute min-w-0 right-3 top-[45px] cursor-pointer w-6 h-6"
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {isError && <h5 className="text-error my-2">{errorMessage}</h5>}
    </div>
  );
};

export default FieldInput;
