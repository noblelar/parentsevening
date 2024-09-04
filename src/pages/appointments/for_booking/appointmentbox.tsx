import React, { useState } from "react";
import { FaCheck, FaClock } from "react-icons/fa";
import { Appointment, ApptTeach } from "@/utils/data_interface";

interface AppointmentBoxProps {
  appointmenta: Appointment;
  handleSelectAppt: (a: ApptTeach) => void;
  verifySelected: (a: number) => boolean;
}

const AppointmentBox: React.FC<AppointmentBoxProps> = ({
  appointmenta,
  handleSelectAppt,
  verifySelected,
}) => {
  const appointment = appointmenta;
  // const parent = appointment?.parent_id
  //   ? parents.find((p) => p.parent_id === appointment.parent_id)
  //   : null;
  // const student = appointment?.student_id
  //   ? students.find((s) => s.id === appointment.student_id)
  //   : null;

  const [isHovered, setIsHovered] = useState(false);

  if (!appointment) {
    return null;
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const br = <br />;

  return (
    <button
      onClick={() =>
        handleSelectAppt({
          appoitment_id: appointment.appointment_id,
          teacher_id: appointment.teacher_id,
          start_time: appointment.starting_time!
        })
      }
      className="relative flex items-center justify-center w-[100px] h-12 m-4 mx-auto bg-white shadow-lg rounded cursor-pointer "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={appointment.parent_id! > 0 && appointment.student_id! >0}
    >
      {appointment.parent_id && appointment.student_id ? (
        <FaCheck className="text-green-500" />
      ) : verifySelected(appointment.appointment_id) ? (
        <FaCheck className="text-yellow-500" />
      ) : (
        <FaClock className="text-gray-500" />
      )}
      {isHovered && (
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 p-2 bg-black text-white text-xs rounded z-40 text-center min-w-[100px] ">
          {appointment.parent_id && appointment.student_id
            ? `By: ${appointment.Parent?.first_name} & For: ${appointment.Student?.first_name}`
            : `Free slot `}
        </div>
      )}
    </button>
  );
};

export default AppointmentBox;
