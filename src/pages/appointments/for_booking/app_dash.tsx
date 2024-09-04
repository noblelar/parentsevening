import React, { useEffect, useState } from "react";
import TeachersBlock from "./teachersblock";
import { Appointment, ApptTeach, Teacher, TimeSlot } from "@/utils/data_interface";
import { useGlobalContext } from "@/context/GlobalContext";

// A sample times array, you can remove this if you are always passing `timeslots` prop
const defaultTimes = [
  '{"slotid": 0, "starting_time": "16:00", "ending_time": "16:30"}',
  '{"slotid": 1, "starting_time": "16:30", "ending_time": "17:00"}',
  '{"slotid": 2, "starting_time": "17:00", "ending_time": "17:30"}',
  '{"slotid": 3, "starting_time": "17:30", "ending_time": "18:00"}',
  '{"slotid": 4, "starting_time": "18:00", "ending_time": "18:30"}',
  '{"slotid": 5, "starting_time": "18:30", "ending_time": "19:00"}',
];

const defaultTimeSlots: TimeSlot[] = defaultTimes.map((time) =>
  JSON.parse(time)
);

// Update the component to destructure the props directly
const AppointmentDashboard: React.FC<{
  timeslots: TimeSlot[];
  eve_teachers: Teacher[];
  eve_appointments: Appointment[];
  handleSelectAppt: ((a:ApptTeach)=> void);
  verifySelected: ((a:number)=> boolean)
}> = ({
  timeslots = defaultTimeSlots,
  eve_teachers = [],
  eve_appointments = [],
  handleSelectAppt,
  verifySelected
}) => {
  // Ensure slots fallback to the defaultTimeSlots if no timeslots are passed
  const slots: TimeSlot[] = timeslots.length > 0 ? timeslots : defaultTimeSlots;

  const { userType, globalEvening } = useGlobalContext();
  const [theAppointments, setTheAppointment] = useState(eve_appointments);

  useEffect(() => {
    const appointments = async () => {
      if (globalEvening && globalEvening !== "all") {
        try {
          // Fetch evening data by ID from the API
          const response = await fetch(
            `api/fetch/appointment/route?eveningId=${globalEvening}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();

          setTheAppointment(data.appointment);
        } catch (err) {
          console.log(err);
        }
      }
    };

    appointments();
  }, [globalEvening]);



  return (
    <div className="grid grid-flow-col gap-4 overflow-scroll">
      {/* Time slots on the left */}
      <div className="w-[120px] bg-primary_light/90 sticky left-0 top-0 z-10">
        <div className="text-center font-abel font-bold text-white mt-4">
          Time:
        </div>
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
          appointments={theAppointments.filter(
            (appointment) => appointment.teacher_id === teacher.staff_id
          )} handleSelectAppt={handleSelectAppt } verifySelected={verifySelected}          // timeslots={slots}
        />
      ))}
    </div>
  );
};

export default AppointmentDashboard;
