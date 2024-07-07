import { ButtonProps, Evening } from "./data_interface";

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
    onClick: ()=>{},
    text: "Start Evening",
  },
  {
    pathname: "/appointments",
    onClick: ()=>{},
    text: "Start Evening",
  },
  {
    pathname: "/appointments",
    onClick: ()=>{},
    text: "Start Evening",
  },
]
