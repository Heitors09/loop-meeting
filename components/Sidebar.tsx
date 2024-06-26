"use client";

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky rounded-[10px] left-3  mb-3 flex  h-screen w-fit flex-col justify-between pt-10 bg-white shadow-md px-8  text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#6058e8] to-[#e6497d] font-bold text-2xl p-4">LoopMeeting</h1>
        {sidebarLinks.map(({route, label, icon: Icon}) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link
              href={route}
              key={label}
              className={cn(
                "flex gap-4 items-center text-[#acacac] p-4 rounded-lg justify-start",
              )}
            >
              <Icon
                width={40}
                height={40}
                className={cn(
                  "bg-none rounded-md  p-2",
                  {"bg-gradient-to-r from-[#6058e8] to-[#e6497d]  duration-150 text-white": isActive}
                )}
              />
              <p className={cn(
                "text-lg font-semibold max-lg:hidden",
                { "bg-clip-text text-transparent bg-gradient-to-r from-[#6058e8] to-[#e6497d]  duration-150": isActive }
                )}>
                {label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
