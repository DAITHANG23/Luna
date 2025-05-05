import Image from "next/image";
import React from "react";

const LinkedinIcon = () => {
  return (
    <div className="w-4 h-4 relative">
      <Image src={"/icons/linkedin.svg"} alt="linkedin" fill />
    </div>
  );
};

export default LinkedinIcon;
