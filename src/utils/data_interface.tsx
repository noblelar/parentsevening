

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