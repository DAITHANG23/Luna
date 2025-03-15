import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-white grid grid-cols-1 text-center sm:grid-cols-3 w-full p-[50px] gap-[50px] bg-[#1C252E]">
      <div className="w-full sm:w-[200px] lg:w-[400px]">
        <h4 className="text-white">Domique Fusion Corporation</h4>
        <p className="text-secondary-text">
          Address: Thong Nhat Street, Go Vap Distric, Ho Chi Minh City
        </p>
        <p className="text-secondary-text">
          Responsible for content: Mr.Dom Nguyen
        </p>
      </div>

      <div>
        <h4 className="text-white">Cusomer Support</h4>
        <p className="text-secondary-text">Terms of Use</p>
        <p className="text-secondary-text">Membership policy</p>
        <p className="text-secondary-text">Privacy policy</p>
      </div>

      <div>
        <h4 className="text-white">{`© ${currentYear} Domique Fushion.,JSC. All rights reserved`}</h4>
      </div>
    </div>
  );
};

export default Footer;
