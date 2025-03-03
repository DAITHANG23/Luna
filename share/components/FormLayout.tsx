import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface FormLayoutProps {
  children: React.ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  return (
    <div className="grid p-4 sm:p-0 sm:grid-cols-3 mb-12">
      <div className="flex col-span-1 justify-center items-center text-center flex-col p-4 hidden sm:inline-flex">
        <h2 className="text-primary">Hi, Welcome Domique Fusion</h2>
        <p className="text-primary-text">
          Here, we serve you the best food and quality service.
        </p>
        <Image
          src={"/assets/images/restaurantLogin.png"}
          alt="restaurant"
          width={432}
          height={324}
          className="rounded-lg shadow-xl"
        />
      </div>

      <div className="flex-1 col-span-2 flex flex-col justify-start items-center">
        <h4 className="mt-20 text-primary-text">
          {isLoginPage
            ? "Sign in to your account"
            : "Get started absolutely free"}
        </h4>
        <p className="text-primary-text">
          {isLoginPage ? "Don’t have an account?" : "Already have an account?"}
          <span className="ml-1">
            <Link
              href={isLoginPage ? "/register" : "/login"}
              className="no-underline text-success hover:underline"
            >
              Get started
            </Link>
          </span>
        </p>
        <div className="w-full max-w-md mt-2">{children}</div>
      </div>
    </div>
  );
};

export default FormLayout;
