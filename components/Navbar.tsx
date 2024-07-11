'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { UserButton } from "@clerk/nextjs/app-beta";
import { SignedIn } from "@clerk/nextjs/app-beta/client";
import { Raleway } from "next/font/google";
import { useGetCalls } from "@/hooks/useGetCalls";


const raleway = Raleway({subsets: ['latin']})

const Navbar = () => {
  const{upcomingCalls} =  useGetCalls()
  const lastUpcoming = upcomingCalls.map(upcoming => upcoming.state.startsAt?.toLocaleString())
  const upcomingQuantity = lastUpcoming.length



  return (
    <nav className="flex-between bg-white rounded-[10px] px-4 w-full py-3 shadow-sm">
     <div className="flex flex-col">
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#6058e8] to-[#e6497d] font-bold text-xl">Good to see you !</h1>
      <footer className="text-[#acacac] font-medium  text-sm">explore our features to enhance your video call experience.</footer>
     </div> 

      <div className="flex-between gap-1">
        
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
