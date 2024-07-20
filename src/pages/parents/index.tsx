import DashboardNav from "@/components/ui/dashboardnav";
import React from "react";
import ParentTable from "./parenttable";
import { parents } from "@/utils/datasamples";

const Parents = () => {
  return (
    <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
      <DashboardNav />
      <ParentTable parents={parents} />
    </div>
  );
};

export default Parents;
