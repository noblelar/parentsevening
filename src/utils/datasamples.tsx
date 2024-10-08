import {
  Appointment,
  ButtonProps,
  Evening,
  Parent,
  Student,
  Teacher,
} from "./data_interface";

let eveningIdCounter = 0;

function createEvening(
  yearGroup: string,
  date: string,
  term: string,
  scheduledFor: string,
  startTime: string,
  endTime: string,
  plannedBy: string
): Evening {
  return {
    id: eveningIdCounter++,
    yearGroup,
    date,
    term,
    scheduledFor,
    startTime,
    endTime,
    plannedBy,
  };
}

// Creating five instances
const evening1 = createEvening(
  "Year 7",
  "2024-06-01",
  "Summer",
  "2024-07-15",
  "17:00",
  "19:00",
  "Mr. Adams"
);
const evening2 = createEvening(
  "Year 8",
  "2024-06-02",
  "Summer",
  "2024-07-16",
  "18:00",
  "20:00",
  "Ms. Baker"
);
const evening3 = createEvening(
  "Year 9",
  "2024-06-03",
  "Summer",
  "2024-07-17",
  "17:30",
  "19:30",
  "Dr. Clark"
);
const evening4 = createEvening(
  "Year 10",
  "2024-06-04",
  "Summer",
  "2024-07-18",
  "18:30",
  "20:30",
  "Mrs. Davis"
);
const evening5 = createEvening(
  "Year 11",
  "2024-06-05",
  "Summer",
  "2024-07-19",
  "19:00",
  "21:00",
  "Mr. Evans"
);

export const evenings: Evening[] = [
  evening1,
  evening2,
  evening3,
  evening4,
  evening5,
];

// ! Embeded List. Must not be touched

export const dashboardNavList: ButtonProps[] = [
  {
    pathname: "/dashboard",
    onClick: () => {},
    text: "Start New Evening",
  },
  {
    pathname: "/",
    onClick: () => {},
    text: "Start New Evening",
  },
  {
    pathname: "/appointments",
    onClick: () => {},
    text: "Something",
  },
  {
    pathname: "/teachers",
    onClick: () => {},
    text: "Add Teacher",
  },
  {
    pathname: "/students",
    onClick: () => {},
    text: "Add Student",
  },
  {
    pathname: "/parents",
    onClick: () => {},
    text: "Remind Parent",
  },
  {
    pathname: "/evenings",
    onClick: () => {},
    text: "Manage",
  },
  {
    pathname: "/settings",
    onClick: () => {},
    text: "Save Settings",
  },
  {
    pathname: "/accounts",
    onClick: () => {},
    text: "Manage Accounts",
  },
  {
    pathname: "/help",
    onClick: () => {},
    text: "Get help",
  },
];

// Example Data

export const teachers: Teacher[] = [
  {
    id: 0,
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice.johnson@example.com",
    subject: "Math",
    breaktime: "10:00 - 10:30",
    contact: "555-1234",
  },
  {
    id: 1,
    firstname: "Bob",
    lastname: "Smith",
    email: "bob.smith@example.com",
    subject: "Science",
    breaktime: "11:00 - 11:30",
    contact: "555-5678",
  },
  {
    id: 2,
    firstname: "Carol",
    lastname: "Williams",
    email: "carol.williams@example.com",
    subject: "History",
    breaktime: "12:00 - 12:30",
    contact: "555-8765",
  },
];

export const appointments: Appointment[] = [
  {
    appointment_id: 0,
    evening_id: 1,
    parent_id: 6,
    teacher_id: 0,
    student_id: 3,
    venue: null,
    status: "available",
    starting_time: "16:00",
    ending_time: "16:30",
    duration: null,
  },
  {
    appointment_id: 1,
    evening_id: 1,
    parent_id: null,
    teacher_id: 0,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "16:30",
    ending_time: "17:00",
    duration: null,
  },
  {
    appointment_id: 2,
    evening_id: 1,
    parent_id: null,
    teacher_id: 0,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "17:00",
    ending_time: "17:30",
    duration: null,
  },
  {
    appointment_id: 3,
    evening_id: 1,
    parent_id: null,
    teacher_id: 0,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "17:30",
    ending_time: "18:00",
    duration: null,
  },
  {
    appointment_id: 4,
    evening_id: 1,
    parent_id: null,
    teacher_id: 0,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "18:00",
    ending_time: "18:30",
    duration: null,
  },
  {
    appointment_id: 5,
    evening_id: 1,
    parent_id: null,
    teacher_id: 0,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "18:30",
    ending_time: "19:00",
    duration: null,
  },
  {
    appointment_id: 6,
    evening_id: 1,
    parent_id: null,
    teacher_id: 1,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "16:00",
    ending_time: "16:30",
    duration: null,
  },
  {
    appointment_id: 7,
    evening_id: 1,
    parent_id: null,
    teacher_id: 1,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "16:30",
    ending_time: "17:00",
    duration: null,
  },
  {
    appointment_id: 8,
    evening_id: 1,
    parent_id: null,
    teacher_id: 1,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "17:00",
    ending_time: "17:30",
    duration: null,
  },
  {
    appointment_id: 9,
    evening_id: 1,
    parent_id: null,
    teacher_id: 1,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "17:30",
    ending_time: "18:00",
    duration: null,
  },
  {
    appointment_id: 10,
    evening_id: 1,
    parent_id: null,
    teacher_id: 1,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "18:00",
    ending_time: "18:30",
    duration: null,
  },
  {
    appointment_id: 11,
    evening_id: 1,
    parent_id: null,
    teacher_id: 1,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "18:30",
    ending_time: "19:00",
    duration: null,
  },
  {
    appointment_id: 12,
    evening_id: 1,
    parent_id: null,
    teacher_id: 2,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "16:00",
    ending_time: "16:30",
    duration: null,
  },
  {
    appointment_id: 13,
    evening_id: 1,
    parent_id: null,
    teacher_id: 2,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "16:30",
    ending_time: "17:00",
    duration: null,
  },
  {
    appointment_id: 14,
    evening_id: 1,
    parent_id: null,
    teacher_id: 2,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "17:00",
    ending_time: "17:30",
    duration: null,
  },
  {
    appointment_id: 15,
    evening_id: 1,
    parent_id: null,
    teacher_id: 2,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "17:30",
    ending_time: "18:00",
    duration: null,
  },
  {
    appointment_id: 16,
    evening_id: 1,
    parent_id: null,
    teacher_id: 2,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "18:00",
    ending_time: "18:30",
    duration: null,
  },
  {
    appointment_id: 17,
    evening_id: 1,
    parent_id: null,
    teacher_id: 2,
    student_id: null,
    venue: null,
    status: "available",
    starting_time: "18:30",
    ending_time: "19:00",
    duration: null,
  },
];

export const parents: Parent[] = [
  {
    id: 6,
    firstname: "George",
    lastname: "Brown",
    email: "george.brown@example.com",
    contact: "555-4321",
    children: 3,
  },
  {
    id: 7,
    firstname: "Helen",
    lastname: "Davis",
    email: "helen.davis@example.com",
    contact: "555-8765",
    children: 4,
  },
  {
    id: 8,
    firstname: "Ian",
    lastname: "Miller",
    email: "ian.miller@example.com",
    contact: "555-1234",
    children: 5,
  },
];

export const students: Student[] = [
  { id: 3, firstname: "David", lastname: "Brown", dateOfBirth: "2005-04-23" },
  { id: 4, firstname: "Eva", lastname: "Davis", dateOfBirth: "2006-08-15" },
  { id: 5, firstname: "Frank", lastname: "Miller", dateOfBirth: "2007-12-09" },
];
