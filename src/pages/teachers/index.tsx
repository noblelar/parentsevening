import DashboardNav from "@/components/ui/dashboardnav";
import React from "react";
import TeacherTable from "./teachertable";
import { teachers } from "@/utils/datasamples";

const Teachers = () => {
  return (
    <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
      <DashboardNav />
      <TeacherTable teachers={teachers}/>
    </div>
  );
};

export default Teachers;
