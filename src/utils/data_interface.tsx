

export interface Evening {
   id: number;
   yearGroup: string;
   date: string;
   term: string;
   scheduledFor: string;
   startTime: string;
   endTime: string;
   plannedBy: string;
}

export interface ButtonProps {
   pathname: string;
   onClick: () => void;
   text: string;
 }

// Teacher Interface
export interface Teacher {
   id: number;
   firstname: string;
   lastname: string;
   email: string;
   subject: string;
   breaktime: string;
   contact: string;
}

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



