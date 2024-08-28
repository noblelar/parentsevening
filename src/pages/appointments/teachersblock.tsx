import React from "react";
import AppointmentBox from "./appointmentbox";
import { Appointment } from "@/utils/data_interface";
// import { appointments, teachers } from "@/utils/datasamples";

const TeachersBlock = ({
  teacher,
  appointments,
}: {
  teacher: any;
  appointments: any;
}) => {
  //   const teacher = teachers[0];
  //   const appointment = appointments

  return (
    <div className=" m-4 w-[150px] ">
      <div className=" text-center font-abel font-bold ">
        {teacher.first_name[0] + ". " + teacher.last_name}
      </div>
      {appointments.map((app: Appointment) => {
        if (app.teacher_id == teacher.staff_id) {
          return (
            <AppointmentBox
              key={teacher.id + "_" + app.appointment_id}
              appointmenta={app}
            />
          );
        }
      })}
    </div>
  );
};

export default TeachersBlock;
