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
        " w-full xl:max-w-[270px]  flex p-5 rounded-[14px] cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col  gap-4  size-12 rounded-[10px]">
       <div className="flex gap-7">
        <Image src={img} alt="add-meeting" width={27} height={27} />
        <h1 className=" font-bold">{title}</h1>
       </div> 
      </div>
    </div>
  );
};

export default HomeCard;
