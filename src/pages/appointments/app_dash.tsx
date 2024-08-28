import React from "react";
import TeachersBlock from "./teachersblock";
import { Appointment, Teacher } from "@/utils/data_interface";

interface TimeSlot {
  slotid: number;
  starting_time: string;
  ending_time: string;
}

// A sample times array, you can remove this if you are always passing `timeslots` prop
const defaultTimes = [
  '{"slotid": 0, "starting_time": "16:00", "ending_time": "16:30"}',
  '{"slotid": 1, "starting_time": "16:30", "ending_time": "17:00"}',
  '{"slotid": 2, "starting_time": "17:00", "ending_time": "17:30"}',
  '{"slotid": 3, "starting_time": "17:30", "ending_time": "18:00"}',
  '{"slotid": 4, "starting_time": "18:00", "ending_time": "18:30"}',
  '{"slotid": 5, "starting_time": "18:30", "ending_time": "19:00"}',
];

const defaultTimeSlots: TimeSlot[] = defaultTimes.map((time) => JSON.parse(time));

// Update the component to destructure the props directly
const AppointmentDashboard: React.FC<{
  timeslots: TimeSlot[]; // Expecting an array of timeslots
  eve_teachers: Teacher[]; // Array of teacher objects
  eve_appointments: Appointment[]; // Array of appointments
}> = ({ timeslots = defaultTimeSlots, eve_teachers = [], eve_appointments = [] }) => {
  // Ensure slots fallback to the defaultTimeSlots if no timeslots are passed
  const slots: TimeSlot[] = timeslots.length > 0 ? timeslots : defaultTimeSlots;

  // Log data to confirm correct props
  console.log("Time Slots:", slots);
  console.log("Teachers:", eve_teachers);
  console.log("Appointments:", eve_appointments);

  return (
    <div className="grid grid-flow-col gap-4 overflow-scroll">
      {/* Time slots on the left */}
      <div className="w-[120px] bg-primary_light/90 sticky left-0 top-0 z-10">
        <div className="text-center font-abel font-bold text-white">Time:</div>
        {slots.map((time_p, tp) => (
          <div
            key={tp}
            className="relative flex items-center justify-center w-[100px] h-12 m-4 mx-auto bg-white shadow-lg rounded italic"
          >
            <p>{time_p.starting_time}</p> - <p>{time_p.ending_time}</p>
          </div>
        ))}
      </div>

      {/* Teachers and their slots */}
      {eve_teachers.map((teacher: Teacher) => (
        <TeachersBlock
          key={teacher.staff_id}
          teacher={teacher}
          appointments={eve_appointments.filter(
            (appointment) => appointment.teacher_id === teacher.staff_id
          )}
          // timeslots={slots}
        />
      ))}
    </div>
  );
};

export default AppointmentDashboard;




// import React from "react";
// import TeachersBlock from "./teachersblock";
// import { teachers } from "@/utils/datasamples";
// import { Appointment, Teacher } from "@/utils/data_interface";

// interface TimeSlot {
//   slotid: number;
//   starting_time: string;
//   ending_time: string;
// }
// const times = [
//   '{"slotid": 0, "starting_time": "16:00", "ending_time": "16:30"}',
//   '{"slotid": 1, "starting_time": "16:30", "ending_time": "17:00"}',
//   '{"slotid": 2, "starting_time": "17:00", "ending_time": "17:30"}',
//   '{"slotid": 3, "starting_time": "17:30", "ending_time": "18:00"}',
//   '{"slotid": 4, "starting_time": "18:00", "ending_time": "18:30"}',
//   '{"slotid": 5, "starting_time": "18:30", "ending_time": "19:00"}',
// ];

// const timeSlots: TimeSlot[] = times.map((time) => JSON.parse(time));

// //  console.log(timeSlots);

// const AppointmentDashboard = (
//   timeslots: any,
//   eve_teachers: any,
//   eve_appointments: any
// ) => {
//   const slots: TimeSlot[] = timeslots.length > 0 ? timeslots.timeslots : timeSlots;
//   const eve_teach: Teacher[] = eve_teachers;
//   const eve_appoint: Appointment[] = eve_appointments;

//   console.log(timeslots);
//   console.log(slots);
//   console.log(eve_teach);
//   console.log(eve_appoint);
//   return (
//     <div className=" grid grid-flow-col gap-4 overflow-scroll ">
//       <div className=" w-[120px] bg-primary_light/90 sticky left-0 top-0 z-10 ">
//         <div className=" text-center font-abel font-bold text-white ">
//           Name:
//         </div>
//         {slots.map((time_p, tp) => {
//           return (
//             <div
//               key={tp}
//               className=" relative flex items-center justify-center w-[100px] h-12 m-4 mx-auto bg-white shadow-lg rounded italic "
//             >
//               <p>{time_p.starting_time}</p>-<p>{time_p.ending_time}</p>
//             </div>
//           );
//         })}
//       </div>

//       {teachers.map((teacher: any) => {
//         return <TeachersBlock key={teacher.id} teacher={teacher} />;
//       })}
//     </div>
//   );
// };

// export default AppointmentDashboard;
