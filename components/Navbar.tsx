'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { UserButton } from "@clerk/nextjs/app-beta";
import { SignedIn } from "@clerk/nextjs/app-beta/client";
import { Raleway } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Headphones, Notebook } from "lucide-react";
import { useGetCalls } from "@/hooks/useGetCalls";


const raleway = Raleway({subsets: ['latin']})

const Navbar = () => {
  const{upcomingCalls} =  useGetCalls()
  const lastUpcoming = upcomingCalls.map(upcoming => upcoming.state.startsAt?.toLocaleString())
  const upcomingQuantity = lastUpcoming.length



  return (
    <nav className="flex-between fixed z-50 w-full  px-6 py-4 lg:px-10 ">
      <Link href="/" className="flex items-center gap-2 text-[26px]  font-extrabold text-black max-sm:hidden">
        <Headphones size={26}/>
        <p className={raleway.className}>
          Loop
        </p>
      </Link>

      <div className="flex-between gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <div className="p-1 rounded-full w-[75px] h-[32px] flex items-center justify-center relative">
            <div className="w-4 h-4 bg-green-500 rounded-full absolute -top-1 -right-0.5">
              <p className="text-[12px] font-bold text-white flex items-start justify-center">{upcomingQuantity}</p>
            </div>
            <Bell size={26} className="text-white hover:cursor-pointer"/>
          </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] border-none bg-[#324154]">
            <DropdownMenuLabel className="font-extrabold text-white text-[16px] flex items-center gap-2">
              <Notebook size={20}/>
              <p>Upcoming</p>
            </DropdownMenuLabel>
            {lastUpcoming.map((calls, index) => 
              <DropdownMenuItem key={index}>
                <div className="px-2 py-1 w-full h-12  text-white rounded-md ">
                  <p className="font-bold text-medium">Upcoming meeting at: </p><label className="text-green-500 font-bold">{calls}</label>
                </div>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
