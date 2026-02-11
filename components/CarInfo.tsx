"use client";

import Image from "next/image";
import CountUp from "react-countup";
import UpdateKilometrage from "./UpdateKilometrage";
import { useState } from "react";
export default function CarInfo({ car }: { car: car }) {
  const [isOpen, setIsOpen] = useState(false);
  const isDefaultImage =
    car?.carImage ===
    "https://rrdowjxummyrbbamenzq.supabase.co/storage/v1/object/public/car-images//DefaultCarImage.png";
  if (!car) return;
  return (
    <div className="flex gap-4 md:gap-8 mt-1">
      <div className="relative w-28 h-28 md:w-36 md:h-36  ">
        <Image
          src={car?.carImage}
          alt="car image"
          fill
          className={`rounded-full lg:rounded-lg invert-[0.15] ${
            isDefaultImage && "dark:invert-[0.5]"
          }`}
        />
      </div>
      <div className="flex flex-1 gap-4 ">
        <div className="flex flex-col gap-1 md:gap-3 p-2">
          <h2 className="text-lg font-semibold md:text-2xl">{car?.brand}</h2>
          <p className="text-sm text-gray-500 space-x-2 capitalize md:text-lg">
            <span className="dark:text-[#b4b2b2]">{car?.model}</span>
            <span className="dark:text-[#b4b2b2]">{car?.year}</span>
          </p>
          <p className="text-sm text-gray-500 capitalize dark:text-[#b4b2b2] md:text-lg">
            {car?.color}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center font-semibold text-gray-700 dark:text-[#b4b2b2] text-2xl md:text-3xl tracking-wider flex-auto gap-2 ">
          <CountUp
            end={car?.currentKilometrage}
            duration={2.75}
            delay={0}
            suffix="Km"
          />
          <UpdateKilometrage
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            carKilometrage={car?.currentKilometrage}
          />
        </div>
      </div>
    </div>
  );
}
