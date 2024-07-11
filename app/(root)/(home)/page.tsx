

import DateTime from "@/components/DateTime";
import MeetingTypeList from "@/components/MeetingTypeList";
import Navbar from "@/components/Navbar";
import { useGetCalls } from "@/hooks/useGetCalls";
import React from "react";

const Home =  () => {
  
  return (
    <section className="flex size-full flex-col gap-3   text-white">
      <Navbar/>
      <DateTime/>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
