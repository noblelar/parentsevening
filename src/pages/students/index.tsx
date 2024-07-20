import DashboardNav from "@/components/ui/dashboardnav";
import React from "react";
import StudentTable from "./studenttable";
import { students } from "@/utils/datasamples";

const Students = () => {
  return (
    <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
      <DashboardNav />
      <StudentTable students={students} />
    </div>
  );
};

export default Students;
