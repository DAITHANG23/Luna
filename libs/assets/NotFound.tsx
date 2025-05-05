import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-[90%]">
      <Image
        src={"/assets/images/not-found.png"}
        alt="not-found"
        width={500}
        height={300}
        className="rounded-lg shadow-lg max-w-[100%] h-auto"
      />
    </div>
  );
};

export default NotFound;
