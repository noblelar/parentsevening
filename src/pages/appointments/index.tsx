import Modal from "@/components/modals/modal";
import DashboardNav from "@/components/ui/dashboardnav";
import React, { useState } from "react";

const Appointments = () => {
 
  return (
    <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
      <DashboardNav />
      {/* <Button onClick={openModal} text="Open Appointment Form" /> */}
    </div>
  );
};

export default Appointments;
