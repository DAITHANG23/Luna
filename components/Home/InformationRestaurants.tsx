import Image from "next/image";
import React from "react";
import Router from "next/router";

const InformationRestaurants = () => {
  return (
    <div className="relative w-full h-auto sm:h-[552px] bg-primary dark:bg-[#1C252E]">
      <div className="w-[80%] m-auto flex sm:flex-row flex-col justify-center gap-10">
        <div className="relative w-[100%] sm:w-[40%] h-[552px] px-[16px]">
          <Image
            src={"/assets/images/img-map-vn.png"}
            alt="map-vn"
            fill
            className=" objectFit-cover"
             loading="lazy"
          />
        </div>
        <div className="relative sm:w-[40%] h-[300px] px-[16px]">
          <Image src={"/assets/images/img-curture.png"} alt="curture" fill  loading="lazy"/>
        </div>
      </div>
      <div className="flex justify-center py-10 sm:absolute sm:bottom-[50px] sm:right-[25%] lg:right-[30%]">
        <button
          className="boder-none rounded-lg px-6 py-1 text-primary-text bg-warning/80 hover:bg-warning/90"
          onClick={() => {
            Router.push("/about");
          }}
        >
          DETAIL
        </button>
      </div>
    </div>
  );
};

export default InformationRestaurants;
