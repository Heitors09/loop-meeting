"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createInstantMeeting = async () => {
    if (!client || !user) return;

    try{
      //creating call paramters
      const id = crypto.randomUUID()
      //setting the type and id of corresponding call
      const call = client.call('default', id)
      //dealing with .call errors
      if (!call) throw new Error("Failed to create call");
      //setting state
      setCallDetails(call)
      //create call
      await call.getOrCreate()

      //pushing to the meeting Setup call
      router.push(`/meeting/${call.id}`)
    }catch(error){
      toast({
        title: "Failed to create meeting",
      });
      console.log(error);
    }


  }

  const createUpcomingMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "please select a date and a time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");
      

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";
      //creating the call
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      toast({
        title: "Failed to create meeting",
      });
      console.log(error);
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1  gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-[#324154]"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-[#324154]"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-[#324154]"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-[#324154]"
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="create meeting"
          handleClick={createUpcomingMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none ring-green-500 bg-transparent ring-1 focus-visible:ring-1 focus-visible:ring-green-500"
              onChange={(e) => {
                setValues({
                  ...values,
                  description: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) =>
                setValues({
                  ...values,
                  dateTime: date!,
                })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="meeting created"
          className="text-center"
          buttonText="Copy meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="start an instant meeting"
        className="text-center"
        buttonText="Start meeting"
        handleClick={createInstantMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here "
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="meeting Link"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
