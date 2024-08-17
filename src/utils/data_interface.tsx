// export interface Evening {
//    id: number;
//    yearGroup: string;
//    date: string;
//    term: string;
//    scheduledFor: string;
//    startTime: string;
//    endTime: string;
//    plannedBy: string;
// }

export interface ButtonProps {
  pathname: string;
  onClick: () => void;
  text: string;
}

// Teacher Interface
// export interface Teacher {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   subject: string;
//   breaktime: string;
//   contact: string;
// }

// Appointment Interface
export interface Appointment {
  appointment_id: number;
  evening_id: number;
  parent_id: number | null;
  teacher_id: number;
  student_id: number | null;
  venue: string | null;
  status: string;
  starting_time: string;
  ending_time: string;
  duration: string | null;
}

// Parent Interface
export interface Parent {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  children: number;
}

// Student Interface
export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
}

export interface IBaseLayout {
  child: React.ReactNode | null;
  title: string;
}

// ! Upgrades

export interface Evening {
  evening_id: number;
  yeargroup?: number;
  date: string;
  term?: string;
  schedule_for?: string;
  start_time?: string;
  end_time?: string;
  planned_by?: number;
  time_per_meeting: number;
  status: string;
  Teacher?: Teacher | null;
  // Appointment: Appointment[];
  // TeacherEvening: TeacherEvening[];
  // EveningManager: EveningManager[];
}

 interface Teacher {
   staff_id: number;         // Unique ID for the teacher
   first_name: string;       // Teacher's first name
   last_name: string;        // Teacher's last name
   email: string;            // Teacher's email address
   // Add other teacher-specific properties if needed
 }

//  interface Appointment {
//    appointment_id: number;   // Unique ID for the appointment
//    evening_id: number;       // ID of the evening this appointment is associated with
//    // Add other appointment-specific properties if needed
//  }

//  interface TeacherEvening {
//    teacher_id: number;       // ID of the teacher attending the evening
//    evening_id: number;       // ID of the evening
//    // Add other properties if needed
//  }

//  interface EveningManager {
//    user_id: number;          // ID of the user managing the evening
//    evening_id: number;       // ID of the evening
//    // Add other properties if needed
//  }
