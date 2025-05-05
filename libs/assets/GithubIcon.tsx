import Image from "next/image";
import React from "react";

const GithubIcon = () => {
  return (
    <div className="w-4 h-4 relative">
      <Image src={"/icons/github.svg"} alt="githubicon" fill />
    </div>
  );
};

export default GithubIcon;
