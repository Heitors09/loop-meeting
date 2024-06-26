import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HomeCardProps {
  className: string;
  img: string;
  title: string;
  handleClick: () => void;
}

const HomeCard = ({
  className,
  handleClick,
  img,
  title,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        " w-full xl:max-w-[270px]  text-[#acacac] flex p-5 rounded-[14px] cursor-pointer hover:scale-105 duration-200 ",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col  gap-4  rounded-[10px]">
       <div className="flex items-center gap-2 ">
        <Image src={img} alt="add-meeting" width={20} height={20} className="bg-gradient-to-r from-[#6058e8] to-[#e6497d] px-2 size-8 p-2 rounded-md"/>
        <p className=" font-bold ">{title}</p>
       </div> 
      </div>
    </div>
  );
};

export default HomeCard;
