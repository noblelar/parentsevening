import React from "react";
import AppointmentBox from "./appointmentbox";
import { appointments, teachers } from "@/utils/datasamples";

const TeachersBlock = ({teacher}: {teacher: any}) => {
//   const teacher = teachers[0];
  //   const appointment = appointments

  return (
    <div className=" m-4 w-[150px] ">
      <div className=" text-center font-abel font-bold ">
        {teacher.firstname[0] + ". " + teacher.lastname}
      </div>
      {appointments.map((app) => {
        if (app.teacher_id == teacher.id) {
          return (
            <AppointmentBox
              key={app.appointment_id}
              appointment_id={app.appointment_id}
            />
          );
        }
      })}

    </div>
  );
};

export default TeachersBlock;
