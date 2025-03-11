import React from "react";
import Image from "next/image";
import Link from "next/link";

const ConceptsList = () => {
  return (
    <div
      className="not-prose sm:w-[80%] lg:w-[60%] pt-[100px] pb-[50px] m-auto"
      style={{ fontFamily: "Inter" }}
    >
      <div className="flex">
        <div className="border-r border-dashed border-gray-300 sm:min-w-[150px] h-[60px] ">
          <h3 className="text-[18px] font-bold">HOTPOT</h3>
          <p className="text-xs">CONCEPT</p>
        </div>
        <ul className="grid grid-cols-3 gap-4 w-[50%] h-auto px-4 border-b border-dashed border-gray-300">
          <li className="relative">
            <Link href="/kichi-kichi">
              <Image
                src="/assets/images/kichi-01.png"
                alt="default"
                width={128}
                height={55}
                className="absolute inset-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/kichi-02.png"
                alt="hover"
                width={128}
                height={55}
                className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>

          <li className="relative">
            <Link href="/hutong">
              <Image
                src="/assets/images/hutong-01.png"
                alt="default"
                width={128}
                height={55}
                className="absolute top-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/hutong-02.png"
                alt="hover"
                width={128}
                height={128}
                className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>

          <li className="relative">
            <Link href="/manwah">
              <Image
                src="/assets/images/manwah-01.png"
                alt="default"
                width={128}
                height={128}
                className="absolute w-[55px] h-[55px] top-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/manwah-02.png"
                alt="hover"
                width={128}
                height={128}
                className="absolute w-[55px] h-[55px] objective-fit inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex pt-[20px]">
        <div className="border-r border-dashed border-gray-300 sm:min-w-[150px] h-[60px]">
          <h3 className="text-[18px] font-bold">BBQ</h3>
          <p className="text-xs">CONCEPT</p>
        </div>
        <ul className="grid grid-cols-3 gap-4 w-[50%] h-auto px-4 border-b border-dashed border-gray-300">
          <li className="relative">
            <Link href="/kpub">
              <Image
                src="/assets/images/kpub-01.jpg"
                alt="default"
                width={128}
                height={55}
                className="absolute w-[55px] h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/kpub-02.jpg"
                alt="hover"
                width={128}
                height={55}
                className="absolute w-[55px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>

          <li className="relative">
            <Link href="/gogi">
              <Image
                src="/assets/images/gogi2.png"
                alt="default"
                width={128}
                height={55}
                className="absolute w-[55px] h-[55px] top-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/gogi1.png"
                alt="hover"
                width={128}
                height={128}
                className="absolute w-[55px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>

          <li className="relative">
            <Link href="/sumo-yakiniku">
              <Image
                src="/assets/images/sumo2.png"
                alt="default"
                width={128}
                height={128}
                className="absolute w-[55px] h-[55px] top-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/sumo1.png"
                alt="hover"
                width={128}
                height={128}
                className="absolute w-[55px] h-[55px] objective-fit inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex pt-[20px]">
        <div className="border-r border-dashed border-gray-300 sm:min-w-[150px] h-[60px]">
          <h3 className="text-[18px] font-bold">JAPANESE</h3>
          <p className="text-xs">CONCEPT</p>
        </div>
        <ul className="grid grid-cols-3 gap-4 w-[50%] h-auto px-4 border-b border-dashed border-gray-300">
          <li className="relative">
            <Link href="/isushi">
              <Image
                src="/assets/images/isushi-1.png"
                alt="default"
                width={128}
                height={55}
                className="absolute w-[65px] h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/isushi-2.png"
                alt="hover"
                width={128}
                height={55}
                className="absolute w-[65px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>

          <li className="relative">
            <Link href="/daruma">
              <Image
                src="/assets/images/daruma-1.png"
                alt="default"
                width={128}
                height={55}
                className="absolute w-[55px] h-[55px] top-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/daruma-2.png"
                alt="hover"
                width={128}
                height={128}
                className="absolute w-[55px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>

          <li className="relative">
            <Link href="/shogun">
              <Image
                src="/assets/images/shogun-1.png"
                alt="default"
                width={128}
                height={128}
                className="absolute w-[65px] h-[55px] top-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/shogun-2.png"
                alt="hover"
                width={128}
                height={128}
                className="absolute w-[65px] h-[55px] objective-fit inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex pt-[20px]">
        <div className="border-r border-dashed border-gray-300 sm:min-w-[150px] h-[60px]">
          <h3 className="text-[18px] font-bold">STEAK HOUSE</h3>
          <p className="text-xs">CONCEPT</p>
        </div>
        <ul className="grid grid-cols-3 gap-4 min-w-[250px] h-auto px-4 border-b border-dashed border-gray-300">
          <li className="relative">
            <Link href="/woomaster">
              <Image
                src="/assets/images/woomaster2.png"
                alt="default"
                width={55}
                height={55}
                className="absolute w-[72px] h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/woomaster1.png"
                alt="hover"
                width={128}
                height={55}
                className="absolute w-[72px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex pt-[20px]">
        <div className="border-r border-dashed border-gray-300 sm:min-w-[150px] h-[60px]">
          <h3 className="text-[18px] font-bold">OTHER</h3>
          <p className="text-xs">CONCEPT</p>
        </div>
        <ul className="grid grid-cols-4 gap-4 w-[60%] h-auto px-4 border-b border-dashed border-gray-300">
          <li className="relative">
            <Link href="/phongon37">
              <Image
                src="/assets/images/phongon_37_1.png"
                alt="default"
                width={55}
                height={55}
                className="absolute w-[55px] h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/phongon_37_2.png"
                alt="hover"
                width={128}
                height={55}
                className="absolute w-[55px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>
          <li className="relative">
            <Link href="/cloudpot">
              <Image
                src="/assets/images/cloudpot-2.png"
                alt="default"
                width={55}
                height={55}
                className="absolute w-[80px] h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/cloudpot-1.png"
                alt="hover"
                width={128}
                height={55}
                className="absolute w-[80px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>
          <li className="relative">
            <Link href="/crystal-jade">
              <Image
                src="/assets/images/crystal-1.png"
                alt="default"
                width={55}
                height={55}
                className="absolute w-[80px] h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/crystal-2.png"
                alt="hover"
                width={128}
                height={55}
                className="absolute w-[80px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>

          <li className="relative">
            <Link href="/hangcuon">
              <Image
                src="/assets/images/hangcuon2.png"
                alt="default"
                width={155}
                height={55}
                className="absolute w-[145px] h-[55px] inset-0 transition-opacity duration-300 hover:opacity-0"
              />
              <Image
                src="/assets/images/hangcuon1.png"
                alt="hover"
                width={128}
                height={55}
                className="absolute w-[145px] h-[55px] inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConceptsList;
