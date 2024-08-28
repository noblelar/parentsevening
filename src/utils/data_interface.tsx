export interface ButtonProps {
  pathname: string;
  onClick: () => void;
  text: string;
}

// Appointment Interface
// export interface Appointment {
//   appointment_id: number;
//   evening_id: number;
//   parent_id: number | null;
//   teacher_id: number;
//   student_id: number | null;
//   venue: string | null;
//   status: string;
//   starting_time: string;
//   ending_time: string;
//   duration: string | null;
// }

// Parent Interface
// export interface Parent {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   contact: string;
//   children: number;
// }

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

export interface TimeSlot {
  slotid: number;
  starting_time: string;
  ending_time: string;
}

export interface Role {
  role_id: number;
  role_type: string;
  role_name: string;
}

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

export interface Teacher {
  staff_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_info: string;
  availability: string;
  subject: string;
  // breaktime: string;
}

export interface Parent {
  parent_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_info?: string | null;
  // UserAccount: UserAccount;
  // ParentChild: ParentChild[];
  Appointment: Appointment[];
}

export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  year_group: number;
  email: string;
  date_of_birth: string;
  // ParentChild: ParentChild[];
  Appointment: Appointment[];
}

export interface Appointment {
  appointment_id: number;
  evening_id: number;
  parent_id: number | null;
  teacher_id: number;
  student_id: number | null;
  slot: number | null;
  venue: string | null;
  status: string | null;
  starting_time: string | null;
  ending_time: string | null;
  duration: number | null;
  availability_status: boolean;
  Evening: Evening;
  Teacher: Teacher;
  Parent: Parent;
  Student: Student;
  Feedback: Feedback[];
}

export interface Feedback {
  feedback_id: number;
  appointment_id: number;
  user_id: number;
  rating: number;
  comments: string;
  created_at: string;
}

// export interface UserAccountT {
//   user_id: number;
//   username: string;
//   password: null;
//   role_id: number;
//   Teacher: Teacher;
//   Role: Role;
// }

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

// ! Abandoneded

// interface Appointment {
//   appointment_id: number;
//   evening_id: number;
//   parent_id: number;
//   teacher_id: number;
//   student_id: number;
//   slot: number;
//   venue: string;
//   status: string;
//   starting_time: string | null;
//   ending_time: string | null;
//   duration: number;
//   availability_status: boolean;
//   Evening: {
//     evening_id: number;
//     yeargroup: number | null;
//     date: string;
//     term: string;
//     schedule_for: string;
//     start_time: string;
//     end_time: string;
//     planned_by: number;
//     time_per_meeting: number;
//     status: string;
//   };
//   Teacher: {
//     staff_id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     contact_info: string;
//     availability: string;
//     subject: string;
//   };
//   Parent: {
//     parent_id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     contact_info: string;
//   };
//   Student: {
//     student_id: number;
//     first_name: string;
//     last_name: string;
//     year_group: number;
//     email: string;
//     date_of_birth: string;
//   };
//   Feedback: {
//     feedback_id: number;
//     appointment_id: number;
//     user_id: number;
//     rating: number;
//     comments: string;
//     created_at: string;
//   }[];
// }
