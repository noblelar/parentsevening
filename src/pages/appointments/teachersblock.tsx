import React from "react";
import AppointmentBox from "./appointmentbox";
import { Appointment, Teacher } from "@/utils/data_interface";
// import { appointments, teachers } from "@/utils/datasamples";

const TeachersBlock = ({
  teacher,
  appointments,
}: {
  teacher: Teacher;
  appointments: Appointment[];
}) => {
  return (
    <div className=" m-4 w-[150px] ">
      <div className=" text-center font-abel font-bold ">
        {teacher.first_name[0] + ". " + teacher.last_name}
      </div>
      {appointments.map((app: Appointment, a) => {
        if (app.teacher_id == teacher.staff_id) {
          // console.log(app.appointment_id)
          return (
            <AppointmentBox
              key={teacher.staff_id + "_" + a}
              appointmenta={app}
            />
          );
        }
      })}
    </div>
  );
};

export default TeachersBlock;
