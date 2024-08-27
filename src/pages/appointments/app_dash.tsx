import React from "react";
import TeachersBlock from "./teachersblock";
import { teachers } from "@/utils/datasamples";

interface TimeSlot {
  slotid: number;
  starting_time: string;
  ending_time: string;
}
const times = [
  '{"slotid": 0, "starting_time": "16:00", "ending_time": "16:30"}',
  '{"slotid": 1, "starting_time": "16:30", "ending_time": "17:00"}',
  '{"slotid": 2, "starting_time": "17:00", "ending_time": "17:30"}',
  '{"slotid": 3, "starting_time": "17:30", "ending_time": "18:00"}',
  '{"slotid": 4, "starting_time": "18:00", "ending_time": "18:30"}',
  '{"slotid": 5, "starting_time": "18:30", "ending_time": "19:00"}',
];

const timeSlots: TimeSlot[] = times.map((time) => JSON.parse(time));

//  console.log(timeSlots);

const AppointmentDashboard = () => {
  return (
    <div className=" grid grid-flow-col gap-4 overflow-scroll ">
      <div className=" w-[120px] bg-primary_light/90 sticky left-0 top-0 z-10 ">
        <div className=" text-center font-abel font-bold text-white ">
          Name:
        </div>
        {timeSlots.map((time_p, tp) => {
          return (
            <div
              key={tp}
              className=" relative flex items-center justify-center w-[100px] h-12 m-4 mx-auto bg-white shadow-lg rounded italic "
            >
              <p>{time_p.starting_time}</p>-<p>{time_p.ending_time}</p>
            </div>
          );
        })}
      </div>

      {teachers.map((teacher) => {
        return <TeachersBlock key={teacher.id} teacher={teacher} />;
      })}
      {teachers.map((teacher) => {
        return <TeachersBlock key={teacher.id} teacher={teacher} />;
      })}
    </div>
  );
};

export default AppointmentDashboard;
